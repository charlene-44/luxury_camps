// backend/src/main/java/com/camps/backend/services/FurnitureService.java
package com.camps.backend.services;

import com.camps.backend.models.Furniture;
import com.camps.backend.models.FurnitureType;
import com.camps.backend.models.Material;
import com.camps.backend.models.Image;
import com.camps.backend.enums.FurnitureStatus;
import com.camps.backend.repositories.FurnitureRepository;
import com.camps.backend.repositories.FurnitureTypeRepository;
import com.camps.backend.repositories.MaterialRepository;
import com.camps.backend.dtos.FurnitureCreateDTO;
import com.camps.backend.errors.ResourceNotFoundException;

import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class FurnitureService {

    private final FurnitureRepository furnitureRepository;
    private final FurnitureTypeRepository furnitureTypeRepository;
    private final MaterialRepository materialRepository;

    public FurnitureService(FurnitureRepository furnitureRepository,
                            FurnitureTypeRepository furnitureTypeRepository,
                            MaterialRepository materialRepository) {
        this.furnitureRepository = furnitureRepository;
        this.furnitureTypeRepository = furnitureTypeRepository;
        this.materialRepository = materialRepository;
    }

    public List<Furniture> getAllFurniture() {
        return furnitureRepository.findAll();
    }

    public Optional<Furniture> getFurnitureById(Long id) {
        return furnitureRepository.findById(id);
    }

    public Furniture createFurniture(FurnitureCreateDTO dto) {
        Furniture furniture = new Furniture();
        furniture.setName(dto.getName());
        furniture.setDescription(dto.getDescription());
        furniture.setSize(dto.getSize());
        furniture.setColour(dto.getColour());
        furniture.setQuantity(dto.getQuantity());
        furniture.setPrice(dto.getPrice());
        
        // Conversion du statut (en adaptant par exemple "Out of stock" en OUT_OF_STOCK)
        try {
            furniture.setStatus(FurnitureStatus.valueOf(dto.getStatus().toUpperCase().replace(" ", "_")));
        } catch (IllegalArgumentException ex) {
            throw new IllegalArgumentException("Statut invalide: " + dto.getStatus());
        }
        
        // Récupération et affectation du FurnitureType
        FurnitureType type = furnitureTypeRepository.findById(dto.getTypeId())
            .orElseThrow(() -> new ResourceNotFoundException("Type de meuble non trouvé avec l'id: " + dto.getTypeId()));
        furniture.setType(type);
        
        // Chargement des matériaux
        if (dto.getMaterialIds() != null && !dto.getMaterialIds().isEmpty()) {
            Set<Material> materials = dto.getMaterialIds().stream()
                .map(materialId -> materialRepository.findById(materialId)
                    .orElseThrow(() -> new ResourceNotFoundException("Matériau non trouvé avec l'id: " + materialId)))
                .collect(Collectors.toSet());
            furniture.setMaterials(materials);
        }
        
        // Création des images à partir des URLs
        if (dto.getImageUrls() != null && !dto.getImageUrls().isEmpty()) {
            List<Image> images = dto.getImageUrls().stream().map(url -> {
                Image img = new Image();
                img.setUrl(url);
                img.setFurniture(furniture); // association bidirectionnelle
                return img;
            }).collect(Collectors.toList());
            furniture.setImages(images);
        }
        
        return furnitureRepository.save(furniture);
    }
}