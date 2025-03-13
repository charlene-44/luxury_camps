// backend/src/main/java/com/camps/backend/dtos/FurnitureDTO.java

package com.camps.backend.dtos;

public class FurnitureDTO {
    private String name;
    private double price;
    private byte[] image;

    public FurnitureDTO(String name, double price, byte[] image) {
        this.name = name;
        this.price = price;
        this.image = image;
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

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }
}
