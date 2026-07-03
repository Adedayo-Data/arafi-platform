package com.yourara.arafi.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yourara.arafi.model.WebhookEvent;
import com.yourara.arafi.model.App;
import com.yourara.arafi.model.Plan;
import com.yourara.arafi.model.Subscription;
import com.yourara.arafi.model.LedgerEntry;
import com.yourara.arafi.repository.WebhookRepository;
import com.yourara.arafi.repository.AppRepository;
import com.yourara.arafi.repository.PlanRepository;
import com.yourara.arafi.repository.SubscriptionRepository;
import com.yourara.arafi.repository.LedgerEntryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.support.TransactionTemplate;
import org.springframework.web.client.RestTemplate;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.math.BigDecimal;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class WebhookService {

    private final WebhookRepository webhookRepo;
    private final ObjectMapper objectMapper;
    private final SubscriptionRepository subscriptionRepository;
    private final LedgerEntryRepository ledgerEntryRepository;
    private final AppRepository appRepository;
    private final PlanRepository planRepository;
    private final RestTemplate restTemplate;
    private final PlatformTransactionManager transactionManager;

    @Value("${arafi.nomba.signing.key}")
    private String signingKey;

    // PROCESS RECEIVING A WEBHOOK
    // controller layer would handle the check to find out if this request is from nomba
    @Async
    public void handleWebhook(String rawPayload, String signature){

        try {

            System.out.println("Inside service layer");
            // verify the signature
            Boolean isVerified = verifySignature(rawPayload, signature);

            System.out.println("isVerified Status: " +isVerified);
            Map<String, Object> payloadMap = objectMapper.readValue(rawPayload, new TypeReference<>() {});
            // Map webhook to DB entity
            WebhookEvent webhook = WebhookEvent.builder()
                    .nombaEventId((String) payloadMap.get("requestId"))
                    .eventType((String) payloadMap.get("event_type"))
                    .rawPayload(payloadMap)
                    .isSignatureVerified(isVerified)
                    .processingStatus("received")
                    .build();
            // save the raw payload from Nomba to the db
            webhookRepo.save(webhook);

            if (isVerified) {
                Object dataObj = payloadMap.get("data");
                if (dataObj instanceof Map) {
                    Map<String, Object> data = (Map<String, Object>) dataObj;
                    String bankAccountNumber = (String) data.get("bankAccountNumber");
                    Object amountObj = data.get("amount");
                    
                    BigDecimal amount = null;
                    if (amountObj instanceof Number) {
                        amount = new BigDecimal(amountObj.toString());
                    } else if (amountObj instanceof String) {
                        amount = new BigDecimal((String) amountObj);
                    }

                    if (bankAccountNumber != null && amount != null) {
                        String transactionId = (String) payloadMap.get("requestId");
                        processVirtualAccountPayment(bankAccountNumber, amount, transactionId);
                    }
                }
            }
        } catch (JsonProcessingException e) {
            throw new RuntimeException(e);
        }
    }

    private void processVirtualAccountPayment(String virtualAccountNumber, BigDecimal amount, String transactionId) {
        TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
        transactionTemplate.executeWithoutResult(transactionStatus -> {
            subscriptionRepository.findByVirtualAccountNumberAndStatus(virtualAccountNumber, "PENDING")
                .ifPresent(subscription -> {
                    subscription.setStatus("ACTIVE");

                    Instant periodEnd = Instant.now().plus(30, ChronoUnit.DAYS); // fallback monthly renewal
                    Plan plan = planRepository.findById(subscription.getPlanId()).orElse(null);
                    if (plan != null) {
                        if ("yearly".equalsIgnoreCase(plan.getBillingInterval())) {
                            periodEnd = Instant.now().plus(365, ChronoUnit.DAYS);
                        } else if ("one_time".equalsIgnoreCase(plan.getBillingInterval())) {
                            periodEnd = Instant.now().plus(1, ChronoUnit.DAYS);
                        }
                    }
                    subscription.setCurrentPeriodEnd(periodEnd);
                    subscription.setNombaReference(transactionId);
                    subscriptionRepository.save(subscription);

                    LedgerEntry entry = LedgerEntry.builder()
                            .appId(subscription.getAppId())
                            .bankAccountNumber(virtualAccountNumber)
                            .amount(amount)
                            .entryType("CREDIT")
                            .webhookEventId(transactionId)
                            .build();
                    ledgerEntryRepository.save(entry);

                    appRepository.findById(subscription.getAppId()).ifPresent(app -> {
                        if (app.getWebhookUrl() != null && !app.getWebhookUrl().isBlank()) {
                            triggerMerchantCallback(app.getWebhookUrl(), subscription.getId(), subscription.getAppId(), subscription.getCustomerId(), subscription.getPlanId(), amount);
                        }
                    });
                });
        });
    }

    private void triggerMerchantCallback(String webhookUrl, UUID subscriptionId, UUID appId, UUID customerId, UUID planId, BigDecimal amount) {
        try {
            Map<String, Object> payload = Map.of(
                "event", "subscription.active",
                "data", Map.of(
                    "subscriptionId", subscriptionId.toString(),
                    "appId", appId.toString(),
                    "customerId", customerId.toString(),
                    "planId", planId.toString(),
                    "status", "ACTIVE",
                    "amount", amount.toString()
                )
            );
            restTemplate.postForEntity(webhookUrl, payload, String.class);
            System.out.println("Successfully triggered merchant callback webhook to: " + webhookUrl);
        } catch (Exception e) {
            System.err.println("Failed to dispatch merchant callback webhook to " + webhookUrl + ": " + e.getMessage());
        }
    }

    private Boolean verifySignature(String rawPayload, String signature){
        if(signature == null || signingKey == null){
            return false;
        }
        try {
            Mac hmacSha256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(signingKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            hmacSha256.init(secretKey);

            byte[] rawHash = hmacSha256.doFinal(rawPayload.getBytes(StandardCharsets.UTF_8));
            String computedSignature = Base64.getEncoder().encodeToString(rawHash);

            // Use constant-time comparison to prevent timing-attack exploits
            return MessageDigest.isEqual(computedSignature.getBytes(StandardCharsets.UTF_8),
                    signature.getBytes(StandardCharsets.UTF_8));
        } catch (Exception e) {
            return false;
        }
    }

}
