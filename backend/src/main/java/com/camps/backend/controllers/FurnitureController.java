// backend/src/main/java/com/camps/backend/controllers/FurnitureController.java
package com.camps.backend.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.camps.backend.models.Furniture;
import com.camps.backend.services.FurnitureService;
import com.camps.backend.dtos.FurnitureDTO;
import com.camps.backend.dtos.FurnitureDetailDTO;
import com.camps.backend.dtos.FurnitureCreateDTO;
import com.camps.backend.errors.ResourceNotFoundException;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@CrossOrigin(
    origins = "http://localhost:4200",
    allowedHeaders = "*",
    methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH, RequestMethod.DELETE, RequestMethod.OPTIONS}
)
@RequestMapping("/api")
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
                        furniture.getId(),
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
    
    // Nouveau endpoint pour créer un meuble
    @PostMapping("/furniture")
    public ResponseEntity<FurnitureDetailDTO> createFurniture(@RequestBody FurnitureCreateDTO dto) {
        Furniture created = furnitureService.createFurniture(dto);
        FurnitureDetailDTO detailDTO = convertToDetailDTO(created);
        return ResponseEntity.status(HttpStatus.CREATED).body(detailDTO);
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

    @DeleteMapping("/furniture/{id}")
        public ResponseEntity<Void> deleteFurniture(@PathVariable Long id) {
        furnitureService.deleteFurniture(id);
        return ResponseEntity.noContent().build();
    }

    // Ajoutez cette méthode à votre FurnitureController.java
    @PatchMapping("/furniture/{id}")
    public ResponseEntity<FurnitureDTO> partialUpdateFurniture(@PathVariable Long id, @RequestBody Map<String, Object> updates) {
        // Appel au service pour mettre à jour le meuble
        Furniture updated = furnitureService.partialUpdateFurniture(id, updates);
        
        // Extraction de l'URL de la première image si disponible
        String imageUrl = null;
        if (updated.getImages() != null && !updated.getImages().isEmpty()) {
            imageUrl = updated.getImages().get(0).getUrl();
        }
        
        // Conversion en DTO pour la réponse
        FurnitureDTO dto = new FurnitureDTO(
            updated.getId(),
            updated.getName(),
            updated.getPrice(),
            imageUrl
        );
        
        return ResponseEntity.ok(dto);
    }
}