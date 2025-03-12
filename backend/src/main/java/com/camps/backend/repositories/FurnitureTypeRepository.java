package com.camps.backend.repositories;

import com.camps.backend.models.FurnitureType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FurnitureTypeRepository extends JpaRepository<FurnitureType, Long> {
}
