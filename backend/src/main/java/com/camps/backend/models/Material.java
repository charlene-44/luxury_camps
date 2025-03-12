// backend\src\main\java\com\camps\backend\models\Material.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "Material")
public class Material {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    // Constructeurs, getters et setters...
}

