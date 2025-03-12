// backend\src\main\java\com\camps\backend\models\Material.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    // Constructors, getters, and setters

    public Material() {
    }

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
