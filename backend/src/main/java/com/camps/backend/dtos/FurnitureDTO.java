// backend/src/main/java/com/camps/backend/dtos/FurnitureDTO.java

package com.camps.backend.dtos;

public class FurnitureDTO {
    private Long id;
    private String name;
    private double price;
    private String imageUrl;  // URL au lieu du byte[]
    // private String description;
    // private String size;
    // private String colour;
    // private String quantity;
    // private String status;
    // private String type;
    // private String materials;
    // private String images;

    public FurnitureDTO(Long id, String name, double price, String imageUrl) {
        this.id = id;
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    // public String getDescription() {
    //     return description;
    // }

    // public void setDescription(String description) {
    //     this.description = description;
    // }

    // public String getSize() {
    //     return size;
    // }

    // public void setSize(String size) {
    //     this.size = size;
    // }

    // public String getColour() {
    //     return colour;
    // }

    // public void setColour(String colour) {
    //     this.colour = colour;
    // }

    // public String getQuantity() {
    //     return quantity;
    // }

    // public void setQuantity(String quantity) {
    //     this.quantity = quantity;
    // }

    // public String getStatus() {
    //     return status;
    // }

    // public void setStatus(String status) {
    //     this.status = status;
    // }

    // public String getType() {
    //     return type;
    // }

    // public void setType(String type) {
    //     this.type = type;
    // }

    // public String getMaterials() {
    //     return materials;
    // }

    // public void setMaterials(String materials) {
    //     this.materials = materials;
    // }

    // public String getImages() {
    //     return images;
    // }

    // public void setImages(String images) {
    //     this.images = images;
    // }
}

