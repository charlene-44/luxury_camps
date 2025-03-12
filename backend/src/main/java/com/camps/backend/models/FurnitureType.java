// backend\src\main\java\com\camps\backend\models\FurnitureType.java

package com.camps.backend.models;

import jakarta.persistence.*;

@Entity
@Table(name = "FurnitureType")
public class FurnitureType {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    // Constructeurs, getters et setters...
}