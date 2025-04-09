// backend\src\main\java\com\camps\backend\controllers\FurnitureTypeController.java

package com.camps.backend.controllers;

import com.camps.backend.models.FurnitureType;
import com.camps.backend.services.FurnitureTypeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/furniture-types")
@CrossOrigin(origins = "http://localhost:4200", allowedHeaders = "*", methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.DELETE, RequestMethod.PATCH, RequestMethod.OPTIONS})
public class FurnitureTypeController {

    private final FurnitureTypeService furnitureTypeService;

    public FurnitureTypeController(FurnitureTypeService furnitureTypeService) {
        this.furnitureTypeService = furnitureTypeService;
    }

    @GetMapping
    public ResponseEntity<List<FurnitureType>> getAllFurnitureTypes() {
        List<FurnitureType> types = furnitureTypeService.getAllFurnitureTypes();
        return ResponseEntity.ok(types);
    }

    @GetMapping("/{id}")
    public ResponseEntity<FurnitureType> getFurnitureTypeById(@PathVariable Long id) {
        FurnitureType type = furnitureTypeService.getFurnitureTypeById(id);
        return ResponseEntity.ok(type);
    }

    @PostMapping
    public ResponseEntity<FurnitureType> createFurnitureType(@RequestBody FurnitureType furnitureType) {
        FurnitureType created = furnitureTypeService.createFurnitureType(furnitureType);
        return ResponseEntity.status(HttpStatus.CREATED).body(created);
    }

    @PutMapping("/{id}")
    public ResponseEntity<FurnitureType> updateFurnitureType(@PathVariable Long id, @RequestBody FurnitureType furnitureType) {
        FurnitureType updated = furnitureTypeService.updateFurnitureType(id, furnitureType);
        return ResponseEntity.ok(updated);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFurnitureType(@PathVariable Long id) {
        furnitureTypeService.deleteFurnitureType(id);
        return ResponseEntity.noContent().build();
    }
}

