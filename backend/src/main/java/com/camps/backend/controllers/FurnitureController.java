// backend\src\main\java\com\camps\backend\controllers\FurnitureController.java

package com.camps.backend.controllers;

import com.camps.backend.models.Furniture;
import com.camps.backend.services.FurnitureService;
import com.camps.backend.dtos.FurnitureDTO;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/furnitures")
public class FurnitureController {
    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping
    public List<FurnitureDTO> getAllFurniture() {
        return furnitureService.getAllFurniture().stream()
                .map(furniture -> {
                    String imageUrl = null;
                    if (furniture.getImages() != null && !furniture.getImages().isEmpty()) {
                        imageUrl = furniture.getImages().get(0).getUrl();
                    }
                    return new FurnitureDTO(
                        furniture.getName(), 
                        furniture.getPrice(), 
                        imageUrl
                    );
                })
                .collect(Collectors.toList());
    }
}