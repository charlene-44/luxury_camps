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
import java.util.Map;
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

        // Check if the status is provided
        if (dto.getStatus() == null || dto.getStatus().trim().isEmpty()) {
            throw new IllegalArgumentException("Le statut est requis et ne peut pas être vide.");
        }
        
        // Conversion du statut (en adaptant par exemple "Rupture de stock" en OUT_OF_STOCK)
        if ("Disponible".equalsIgnoreCase(dto.getStatus())) {
            furniture.setStatus(FurnitureStatus.AVAILABLE);
        } else if ("Rupture de stock".equalsIgnoreCase(dto.getStatus())) {
            furniture.setStatus(FurnitureStatus.OUT_OF_STOCK);
        } else if ("Discontinué".equalsIgnoreCase(dto.getStatus())) {
            furniture.setStatus(FurnitureStatus.DISCONTINUED);
        } else {
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
            System.out.println("Nombre d'URLs d'images reçues : " + dto.getImageUrls().size());
            
            dto.getImageUrls().forEach(url -> {
                Image img = new Image();
                img.setUrl(url);
                furniture.addImage(img); // Utiliser la méthode helper
            });
            
            System.out.println("Nombre d'images créées : " + furniture.getImages().size());
        }
        
        return furnitureRepository.save(furniture);
    }

    public void deleteFurniture(Long id) {
        if (!furnitureRepository.existsById(id)) {
            throw new ResourceNotFoundException("Meuble non trouvé avec l'id: " + id);
        }
        furnitureRepository.deleteById(id);
    }

    // Ajoutez cette méthode à votre FurnitureService.java
    public Furniture partialUpdateFurniture(Long id, Map<String, Object> updates) {
        // Récupérer le meuble existant
        Furniture furniture = furnitureRepository.findById(id)
            .orElseThrow(() -> new ResourceNotFoundException("Meuble non trouvé avec l'id: " + id));
        
        // Mettre à jour les champs simples si présents
        if (updates.containsKey("name")) {
            furniture.setName((String) updates.get("name"));
        }
        
        if (updates.containsKey("description")) {
            furniture.setDescription((String) updates.get("description"));
        }
        
        if (updates.containsKey("size")) {
            furniture.setSize((String) updates.get("size"));
        }
        
        if (updates.containsKey("colour")) {
            furniture.setColour((String) updates.get("colour"));
        }
        
        if (updates.containsKey("quantity")) {
            // Gestion de la conversion selon le type reçu
            Object qtyObj = updates.get("quantity");
            if (qtyObj instanceof Integer) {
                furniture.setQuantity((Integer) qtyObj);
            } else if (qtyObj instanceof String) {
                furniture.setQuantity(Integer.parseInt((String) qtyObj));
            }
        }
        
        if (updates.containsKey("price")) {
            // Gestion de la conversion selon le type reçu
            Object priceObj = updates.get("price");
            if (priceObj instanceof Number) {
                furniture.setPrice(((Number) priceObj).doubleValue());
            } else if (priceObj instanceof String) {
                furniture.setPrice(Double.parseDouble((String) priceObj));
            }
        }
        
        if (updates.containsKey("status")) {
            String statusStr = (String) updates.get("status");
            // Conversion du statut en fonction de la chaîne reçue
            if ("Disponible".equalsIgnoreCase(statusStr)) {
                furniture.setStatus(FurnitureStatus.AVAILABLE);
            } else if ("Rupture de stock".equalsIgnoreCase(statusStr)) {
                furniture.setStatus(FurnitureStatus.OUT_OF_STOCK);
            } else if ("Discontinué".equalsIgnoreCase(statusStr)) {
                furniture.setStatus(FurnitureStatus.DISCONTINUED);
            } else {
                throw new IllegalArgumentException("Statut invalide: " + statusStr);
            }
        }

        
        // Mettre à jour le type si présent
        if (updates.containsKey("typeId")) {
            Object typeIdObj = updates.get("typeId");
            Long typeId;
            if (typeIdObj instanceof Number) {
                typeId = ((Number) typeIdObj).longValue();
            } else {
                typeId = Long.parseLong(typeIdObj.toString());
            }
            
            FurnitureType type = furnitureTypeRepository.findById(typeId)
                .orElseThrow(() -> new ResourceNotFoundException("Type de meuble non trouvé avec l'id: " + typeId));
            furniture.setType(type);
        }

        if (updates.containsKey("materialIds")) {
    @SuppressWarnings("unchecked")
    List<?> materialIdsRaw = (List<?>) updates.get("materialIds");
    Set<Material> updatedMaterials = materialIdsRaw.stream()
            .map(idObj -> {
                Long materialId = Long.valueOf(idObj.toString());
                return materialRepository.findById(materialId)
                    .orElseThrow(() -> new ResourceNotFoundException("Matériau non trouvé avec l'id: " + materialId));
            })
            .collect(Collectors.toSet());
    furniture.setMaterials(updatedMaterials);
}


        // *** New code to update images ***
    if (updates.containsKey("imageUrls")) {
        // Expecting "imageUrls" to be a List of Strings
        @SuppressWarnings("unchecked")
        List<String> urls = (List<String>) updates.get("imageUrls");
        // Clear existing images
        furniture.getImages().clear();
        // Add new images from the URLs provided (ignoring empty strings)
        if (urls != null && !urls.isEmpty()) {
            for (String url : urls) {
                if (url != null && !url.trim().isEmpty()) {
                    Image img = new Image();
                    img.setUrl(url);
                    furniture.addImage(img); // This helper method sets the association properly
                }
            }
        }
    }
        
        // Sauvegarder et retourner le meuble mis à jour
        return furnitureRepository.save(furniture);
    }

}