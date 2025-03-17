// backend\src\main\java\com\camps\backend\controllers\FurnitureController.java

package com.camps.backend.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camps.backend.models.Furniture;
import com.camps.backend.services.FurnitureService;
import com.camps.backend.dtos.FurnitureDTO;
import com.camps.backend.dtos.FurnitureDetailDTO;
import com.camps.backend.errors.ResourceNotFoundException;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:4200")
public class FurnitureController {
    private final FurnitureService furnitureService;

    public FurnitureController(FurnitureService furnitureService) {
        this.furnitureService = furnitureService;
    }

    @RequestMapping("/furnitures")
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

    @GetMapping("/furniture/{id}")
    public ResponseEntity<FurnitureDetailDTO> getFurnitureById(@PathVariable Long id) {
        Furniture furniture = furnitureService.getFurnitureById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Meuble non trouvé avec l'id: " + id));
        FurnitureDetailDTO detailDTO = convertToDetailDTO(furniture);
        return ResponseEntity.ok(detailDTO);
    }

    private FurnitureDetailDTO convertToDetailDTO(Furniture furniture) {
        String typeName = (furniture.getType() != null) ? furniture.getType().getName() : null;
        // Récupérer les noms des matériaux
        java.util.List<String> materialNames = (furniture.getMaterials() != null)
                ? furniture.getMaterials().stream()
                    .map(material -> material.getName())
                    .collect(Collectors.toList())
                : java.util.Collections.emptyList();
        // Récupérer les URLs des images
        java.util.List<String> imageUrls = (furniture.getImages() != null)
                ? furniture.getImages().stream()
                    .map(image -> image.getUrl())
                    .collect(Collectors.toList())
                : java.util.Collections.emptyList();

        return new FurnitureDetailDTO(
                furniture.getId(),
                furniture.getName(),
                furniture.getDescription(),
                furniture.getSize(),
                furniture.getColour(),
                furniture.getQuantity(),
                furniture.getPrice(),
                furniture.getStatus().toString(),
                typeName,
                materialNames,
                imageUrls
        );
    }
}