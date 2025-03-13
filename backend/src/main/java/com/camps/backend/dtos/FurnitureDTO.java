// backend/src/main/java/com/camps/backend/dtos/FurnitureDTO.java

package com.camps.backend.dtos;

public class FurnitureDTO {
    private String name;
    private double price;
    private String imageUrl;  // URL au lieu du byte[]

    public FurnitureDTO(String name, double price, String imageUrl) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
    }

    // Getters & Setters
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
}
