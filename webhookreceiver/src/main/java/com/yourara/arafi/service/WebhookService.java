package com.yourara.arafi.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.yourara.arafi.model.WebhookEvent;
import com.yourara.arafi.repository.WebhookRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.util.Base64;
import java.util.Map;
import java.util.UUID;

@Slf4j
@Service
@RequiredArgsConstructor
public class WebhookService {

    private final WebhookRepository webhookRepo;
    private final ObjectMapper objectMapper;

    @Value("${arafi.nomba.signing.key}")
    private String signingKey;

    public void handleWebhook(String rawPayload, String signature) {
        log.info("WebhookService.handleWebhook() — starting ingestion");
        try {
            log.info("Verifying HMAC signature...");
            Boolean isVerified = verifySignature(rawPayload, signature);
            log.info("Signature verification result: {}", isVerified ? "VERIFIED" : "FAILED (signature mismatch or missing key)");

            Map<String, Object> payloadMap = objectMapper.readValue(rawPayload, new TypeReference<>() {});
            log.info("JSON parsed successfully. Top-level keys: {}", payloadMap.keySet());

            String nombaEventId = (String) payloadMap.get("requestId");
            if (nombaEventId == null) {
                Object dataObj = payloadMap.get("data");
                if (dataObj instanceof Map) {
                    Map dataMap = (Map) dataObj;
                    if (dataMap.get("transactionId") != null) {
                        nombaEventId = dataMap.get("transactionId").toString();
                    }
                }
            }
            if (nombaEventId == null) {
                nombaEventId = "nomba_evt_" + UUID.randomUUID().toString();
                log.warn("No requestId or transactionId found in payload — generated fallback ID: {}", nombaEventId);
            } else {
                log.info("Nomba event ID extracted: {}", nombaEventId);
            }

            String eventType = (String) payloadMap.get("event_type");
            if (eventType == null) {
                // also try "event" as some Nomba payloads use this key
                eventType = (String) payloadMap.get("event");
            }
            if (eventType == null) {
                eventType = "unknown";
                log.warn("No event_type or event field found in payload — defaulting to 'unknown'. Full keys: {}", payloadMap.keySet());
            } else {
                log.info("Event type: {}", eventType);
            }

            WebhookEvent webhook = WebhookEvent.builder()
                    .nombaEventId(nombaEventId)
                    .eventType(eventType)
                    .rawPayload(payloadMap)
                    .isSignatureVerified(isVerified)
                    .processingStatus("received")
                    .build();

            webhookRepo.save(webhook);
            log.info("Webhook saved to DB successfully — eventId={}, eventType={}, signatureVerified={}",
                    nombaEventId, eventType, isVerified);

        } catch (JsonProcessingException e) {
            log.error("JSON parsing failed on webhook payload: {}", e.getMessage());
            throw new RuntimeException("JSON parsing failure on webhook", e);
        }
    }

    private Boolean verifySignature(String rawPayload, String signature) {
        if (signature == null || signingKey == null) {
            log.warn("verifySignature: signature={}, signingKey configured={}",
                    signature == null ? "NULL" : "present",
                    signingKey != null && !signingKey.isBlank() ? "YES" : "NO");
            return false;
        }
        try {
            Mac hmacSha256 = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(signingKey.getBytes(StandardCharsets.UTF_8), "HmacSHA256");
            hmacSha256.init(secretKey);

            byte[] rawHash = hmacSha256.doFinal(rawPayload.getBytes(StandardCharsets.UTF_8));
            String computedSignature = Base64.getEncoder().encodeToString(rawHash);

            log.debug("Computed signature (Base64): {}", computedSignature);
            log.debug("Received signature:           {}", signature);

            boolean match = MessageDigest.isEqual(
                    computedSignature.getBytes(StandardCharsets.UTF_8),
                    signature.getBytes(StandardCharsets.UTF_8));

            if (!match) {
                log.warn("Signature MISMATCH — computed={} received={}", computedSignature, signature);
            }
            return match;
        } catch (Exception e) {
            log.error("Signature verification threw exception: {}", e.getMessage(), e);
            return false;
        }
    }
}
