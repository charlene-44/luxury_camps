// backend\src\main\java\com\camps\backend\models\Image.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "image")
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false)
    private String url;  // URL de l'image au lieu du BLOB

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

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Furniture getFurniture() {
        return furniture;
    }

    public void setFurniture(Furniture furniture) {
        this.furniture = furniture;
    }
}
