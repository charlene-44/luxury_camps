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
            case AVAILABLE:     return "Available";
            case OUT_OF_STOCK:  return "Out of stock";
            case DISCONTINUED:  return "Discontinued";
            default: throw new IllegalArgumentException("Unknown FurnitureStatus: " + status);
        }
    }

    @Override
    public FurnitureStatus convertToEntityAttribute(String dbData) {
        if (dbData == null) return null;
        switch (dbData) {
            case "Available":    return FurnitureStatus.AVAILABLE;
            case "Out of stock": return FurnitureStatus.OUT_OF_STOCK;
            case "Discontinued": return FurnitureStatus.DISCONTINUED;
            default: throw new IllegalArgumentException("Unknown db value for FurnitureStatus: " + dbData);
        }
    }
}

