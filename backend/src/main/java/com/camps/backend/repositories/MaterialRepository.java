// backend/src/main/java/com/camps/backend/repositories/MaterialRepository.java
package com.camps.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.camps.backend.models.Material;

public interface MaterialRepository extends JpaRepository<Material, Long> {
}