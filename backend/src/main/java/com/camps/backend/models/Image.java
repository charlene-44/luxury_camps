// backend\src\main\java\com\camps\backend\models\Image.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Store image data as a byte array. Adjust type if needed.
    @Lob
    private byte[] image;

    @ManyToOne
    @JoinColumn(name = "id_furniture")
    private Furniture furniture;

    // Constructors, getters, and setters

    public Image() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public byte[] getImage() {
        return image;
    }

    public void setImage(byte[] image) {
        this.image = image;
    }

    public Furniture getFurniture() {
        return furniture;
    }

    public void setFurniture(Furniture furniture) {
        this.furniture = furniture;
    }
}
