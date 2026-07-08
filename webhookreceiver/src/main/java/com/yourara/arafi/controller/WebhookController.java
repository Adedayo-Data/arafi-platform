package com.yourara.arafi.controller;

import com.yourara.arafi.service.WebhookService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/v1/webhook")
public class WebhookController {

    private final WebhookService webhookService;

    @PostMapping("/nomba")
    public ResponseEntity<Void> handleWebhook(
            @RequestHeader(value = "nomba-signature", required = false) String signature,
            @RequestBody String rawPayload
    ) {
        log.info("=== NOMBA WEBHOOK RECEIVED ===");
        log.info("Signature header present: {}", signature != null ? "YES (length=" + signature.length() + ")" : "NO — MISSING");
        log.info("Payload size: {} bytes", rawPayload != null ? rawPayload.length() : 0);
        log.info("Payload preview: {}", rawPayload != null && rawPayload.length() > 300
                ? rawPayload.substring(0, 300) + "..."
                : rawPayload);

        try {
            webhookService.handleWebhook(rawPayload, signature);
            log.info("Webhook ingestion succeeded — returning 200");
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error("Webhook ingestion FAILED — returning 500 so Nomba retries. Reason: {}", e.getMessage(), e);
            return ResponseEntity.status(500).build();
        }
    }
}
