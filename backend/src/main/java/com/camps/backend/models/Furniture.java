// backend\src\main\java\com\camps\backend\models\Furniture.java

package com.camps.backend.models;

import jakarta.persistence.*;
import com.camps.backend.enums.FurnitureStatus;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Furniture")
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private String size;
    private String colour;
    private int quantity;
    private double price;

    @Enumerated(EnumType.STRING)
    private FurnitureStatus status;

    @ManyToOne
    @JoinColumn(name = "id_type", referencedColumnName = "id")
    private FurnitureType type;

    @ManyToMany
    @JoinTable(name = "Furniture_Material", joinColumns = @JoinColumn(name = "id_furniture"), inverseJoinColumns = @JoinColumn(name = "id_material"))
    private Set<Material> materials;

    @OneToMany(mappedBy = "furniture")
    private List<Image> images;

    // Constructors, getters, and setters...
}
