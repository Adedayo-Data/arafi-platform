package com.yourara.arafi.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.UUID;

@Entity
@Table(name = "apps", schema = "arafi")
@Getter @Setter @Builder
@NoArgsConstructor @AllArgsConstructor
public class App {
    @Id
    private UUID id;

    @Column(name = "webhook_url")
    private String webhookUrl;
}
