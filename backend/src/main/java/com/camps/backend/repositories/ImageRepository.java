// backend/src/main/java/com/camps/backend/repositories/ImageRepository.java
package com.camps.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.camps.backend.models.Image;

public interface ImageRepository extends JpaRepository<Image, Long> {
}