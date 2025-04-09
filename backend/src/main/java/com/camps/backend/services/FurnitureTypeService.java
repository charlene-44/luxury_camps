// backend\src\main\java\com\camps\backend\services\FurnitureTypeService.java

package com.camps.backend.services;

import com.camps.backend.models.FurnitureType;
import com.camps.backend.repositories.FurnitureTypeRepository;
import com.camps.backend.errors.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FurnitureTypeService {

    private final FurnitureTypeRepository furnitureTypeRepository;

    public FurnitureTypeService(FurnitureTypeRepository furnitureTypeRepository) {
        this.furnitureTypeRepository = furnitureTypeRepository;
    }

    public List<FurnitureType> getAllFurnitureTypes() {
        return furnitureTypeRepository.findAll();
    }

    public FurnitureType getFurnitureTypeById(Long id) {
        return furnitureTypeRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Type de meuble non trouvé avec l'id: " + id));
    }

    public FurnitureType createFurnitureType(FurnitureType furnitureType) {
        return furnitureTypeRepository.save(furnitureType);
    }

    public FurnitureType updateFurnitureType(Long id, FurnitureType updatedFurnitureType) {
        FurnitureType existing = getFurnitureTypeById(id);
        existing.setName(updatedFurnitureType.getName());
        return furnitureTypeRepository.save(existing);
    }

    public void deleteFurnitureType(Long id) {
        if (!furnitureTypeRepository.existsById(id)) {
            throw new ResourceNotFoundException("Type de meuble non trouvé avec l'id: " + id);
        }
        furnitureTypeRepository.deleteById(id);
    }
}
