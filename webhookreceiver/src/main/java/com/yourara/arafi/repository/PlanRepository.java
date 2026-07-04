package com.yourara.arafi.repository;

import com.yourara.arafi.model.Plan;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.UUID;

public interface PlanRepository extends JpaRepository<Plan, UUID> {
}
