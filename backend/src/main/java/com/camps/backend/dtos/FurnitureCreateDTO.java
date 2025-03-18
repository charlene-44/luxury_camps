// backend/src/main/java/com/camps/backend/dtos/FurnitureCreateDTO.java
package com.camps.backend.dtos;

import java.util.List;

public class FurnitureCreateDTO {
    private String name;
    private String description;
    private String size;
    private String colour;
    private int quantity;
    private double price;
    private String status; // "Available", "Out of stock", "Discontinued"
    private Long typeId;
    private List<Long> materialIds;
    private List<String> imageUrls;

    // Constructeurs
    public FurnitureCreateDTO() {
        // vide
    }

    public FurnitureCreateDTO(String name, String description, String size, String colour, int quantity,
                                double price, String status, Long typeId, List<Long> materialIds, List<String> imageUrls) {
        this.name = name;
        this.description = description;
        this.size = size;
        this.colour = colour;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.typeId = typeId;
        this.materialIds = materialIds;
        this.imageUrls = imageUrls;
    }

    // Getters et setters
    // (générez-les via votre IDE ou manuellement)
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }

    public String getSize() { return size; }
    public void setSize(String size) { this.size = size; }

    public String getColour() { return colour; }
    public void setColour(String colour) { this.colour = colour; }

    public int getQuantity() { return quantity; }
    public void setQuantity(int quantity) { this.quantity = quantity; }

    public double getPrice() { return price; }
    public void setPrice(double price) { this.price = price; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Long getTypeId() { return typeId; }
    public void setTypeId(Long typeId) { this.typeId = typeId; }

    public List<Long> getMaterialIds() { return materialIds; }
    public void setMaterialIds(List<Long> materialIds) { this.materialIds = materialIds; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
}