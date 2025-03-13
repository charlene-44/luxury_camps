// backend\src\main\java\com\camps\backend\services\FurnitureService.java

package com.camps.backend.services;

import com.camps.backend.models.Furniture;
import com.camps.backend.repositories.FurnitureRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class FurnitureService {

    private final FurnitureRepository furnitureRepository;

    public FurnitureService(FurnitureRepository furnitureRepository) {
        this.furnitureRepository = furnitureRepository;
    }

    public List<Furniture> getAllFurniture() {
        return furnitureRepository.findAll();
    }
}
