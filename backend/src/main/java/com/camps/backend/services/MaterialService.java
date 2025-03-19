// backend\src\main\java\com\camps\backend\services\MaterialService.java

package com.camps.backend.services;

import com.camps.backend.models.Material;
import com.camps.backend.repositories.MaterialRepository;
import com.camps.backend.errors.ResourceNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MaterialService {

    private final MaterialRepository materialRepository;

    public MaterialService(MaterialRepository materialRepository) {
        this.materialRepository = materialRepository;
    }

    public List<Material> getAllMaterials() {
        return materialRepository.findAll();
    }

    public Material getMaterialById(Long id) {
        return materialRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Matériau non trouvé avec l'id: " + id));
    }

    public Material createMaterial(Material material) {
        return materialRepository.save(material);
    }

    public Material updateMaterial(Long id, Material updatedMaterial) {
        Material existing = getMaterialById(id);
        existing.setName(updatedMaterial.getName());
        return materialRepository.save(existing);
    }

    public void deleteMaterial(Long id) {
        if (!materialRepository.existsById(id)) {
            throw new ResourceNotFoundException("Matériau non trouvé avec l'id: " + id);
        }
        materialRepository.deleteById(id);
    }
}
