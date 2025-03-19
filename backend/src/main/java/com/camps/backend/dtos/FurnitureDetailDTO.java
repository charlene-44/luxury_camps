// backend/src/main/java/com/camps/backend/dtos/FurnitureDetailDTO.java
package com.camps.backend.dtos;

import java.util.List;

public class FurnitureDetailDTO {
    private Long id;
    private String name;
    private String description;
    private String size;
    private String colour;
    private int quantity;
    private double price;
    private String status;
    private String type;
    private List<String> materials;
    private List<String> imageUrls;

    public FurnitureDetailDTO(Long id, String name, String description, String size, String colour,
                              int quantity, double price, String status, String type,
                              List<String> materials, List<String> imageUrls) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.size = size;
        this.colour = colour;
        this.quantity = quantity;
        this.price = price;
        this.status = status;
        this.type = type;
        this.materials = materials;
        this.imageUrls = imageUrls;
    }

    // Getters & Setters

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

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

    public String getType() { return type; }
    public void setType(String type) { this.type = type; }

    public List<String> getMaterials() { return materials; }
    public void setMaterials(List<String> materials) { this.materials = materials; }

    public List<String> getImageUrls() { return imageUrls; }
    public void setImageUrls(List<String> imageUrls) { this.imageUrls = imageUrls; }
}
