// backend\src\main\java\com\camps\backend\converters\FurnitureStatusConverter.java

package com.camps.backend.converters;

import com.camps.backend.enums.FurnitureStatus;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true)
public class FurnitureStatusConverter implements AttributeConverter<FurnitureStatus, String> {
    @Override
    public String convertToDatabaseColumn(FurnitureStatus status) {
        if (status == null) return null;
        switch (status) {
            case AVAILABLE:     return "Disponible";
            case OUT_OF_STOCK:  return "Rupture de stock";
            case DISCONTINUED:  return "Discontinué";
            default: throw new IllegalArgumentException("Statut de meuble inconnu: " + status);
        }
    }

    @Override
    public FurnitureStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        switch (dbData) {
            case "Disponible":    return FurnitureStatus.AVAILABLE;
            case "Rupture de stock": return FurnitureStatus.OUT_OF_STOCK;
            case "Discontinué": return FurnitureStatus.DISCONTINUED;
            default: throw new IllegalArgumentException("Valeur inconnue pour le statut de meuble: " + dbData);
        }
    }
}

