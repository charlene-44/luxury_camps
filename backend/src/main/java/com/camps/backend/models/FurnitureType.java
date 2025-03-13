// backend\src\main\java\com\camps\backend\models\FurnitureType.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "furnituretype")
public class FurnitureType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    // Constructeurs, getters et setters...
    // Constructeur par défaut
    public FurnitureType() {
        // empty
    }

    // Getters et setters
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
}