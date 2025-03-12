package com.camps.backend.services;

import com.camps.backend.models.*;
import com.camps.backend.enums.FurnitureStatus;
import com.camps.backend.repositories.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashSet;
import java.util.Set;

@Service
public class FurnitureInitService {

    @Autowired
    private FurnitureRepository furnitureRepository;
    
    @Autowired
    private FurnitureTypeRepository furnitureTypeRepository;
    
    @Autowired
    private MaterialRepository materialRepository;

    @Transactional
    public void initializeDatabase() {
        // Vérifier si des données existent déjà
        if (furnitureRepository.count() > 0) {
            return; // La base de données contient déjà des données
        }
        
        // Créer et sauvegarder un type de meuble
        FurnitureType sofaType = new FurnitureType();
        sofaType.setName("Sofa");
        furnitureTypeRepository.save(sofaType);
        
        // Créer et sauvegarder des matériaux
        Material bois = new Material();
        bois.setName("Bois");
        materialRepository.save(bois);
        
        Material cuir = new Material();
        cuir.setName("Cuir");
        materialRepository.save(cuir);
        
        // Créer un nouveau meuble
        Furniture canape = new Furniture();
        canape.setName("Canapé Confort");
        canape.setDescription("Un canapé confortable pour votre salon");
        canape.setType(sofaType);
        canape.setSize("200x90x80");
        canape.setColour("Bleu");
        canape.setQuantity(5);
        canape.setPrice(599.99);
        canape.setStatus(FurnitureStatus.AVAILABLE);
        
        // Associer les matériaux au meuble
        Set<Material> materials = new HashSet<>();
        materials.add(bois);
        materials.add(cuir);
        
        // Note: Vous devrez implémenter la méthode setMaterials dans votre classe Furniture
        // canape.setMaterials(materials);
        
        // Sauvegarder le meuble
        furnitureRepository.save(canape);
    }
}