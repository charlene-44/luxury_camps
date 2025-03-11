// backend\src\main\java\com\camps\backend\controllers\FurnitureController.java

package com.camps.backend.controllers;

import com.camps.backend.models.Furniture;
import com.camps.backend.services.FurnitureService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furnitures")
public class FurnitureController {
    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @GetMapping
    public List<Furniture> getAllFurniture() {
        return furnitureService.getAllFurniture();
    }
}
