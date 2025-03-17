// backend/src/main/java/com/camps/backend/repositories/FurnitureTypeRepository.java
package com.camps.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.camps.backend.models.FurnitureType;

public interface FurnitureTypeRepository extends JpaRepository<FurnitureType, Long> {
}