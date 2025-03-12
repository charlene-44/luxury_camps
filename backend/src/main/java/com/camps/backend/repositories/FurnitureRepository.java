// backend\src\main\java\com\camps\backend\models\Furniture.java

package com.camps.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.camps.backend.models.Furniture;

public interface FurnitureRepository extends JpaRepository<Furniture, Long> {
}
