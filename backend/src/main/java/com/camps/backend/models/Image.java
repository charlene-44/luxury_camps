// backend\src\main\java\com\camps\backend\models\Image.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    // La colonne "image" est de type BLOB
    @Lob
    @Column(nullable = false)
    private byte[] image;

    // Chaque image appartient à un seul meuble, avec contrainte FOREIGN KEY "image_id_furniture_foreign"
    @ManyToOne
    @JoinColumn(name = "id_furniture", nullable = false,
                columnDefinition = "INT UNSIGNED",
                foreignKey = @ForeignKey(name = "image_id_furniture_foreign"))
    private Furniture furniture;

    // Constructeurs, getters et setters...
    // Constructeur par défaut
    public Image() {
        // empty
    }

    // Getters et setters
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
