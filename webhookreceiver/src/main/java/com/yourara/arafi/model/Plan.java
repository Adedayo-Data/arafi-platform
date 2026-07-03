package com.yourara.arafi.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "plans", schema = "arafi")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class Plan {
    @Id
    private UUID id;

    @Column(name = "billing_interval", nullable = false)
    private String billingInterval; // "monthly", "yearly", "one_time"
}
