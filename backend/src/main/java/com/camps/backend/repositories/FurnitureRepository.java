// backend\src\main\java\com\camps\backend\models\Furniture.java

package com.camps.backend.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import com.camps.backend.models.Furniture;

public interface FurnitureRepository extends JpaRepository<Furniture, Long> {
    // Additional query methods can be declared here if needed
}
