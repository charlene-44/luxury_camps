// backend\src\main\java\com\camps\backend\models\Furniture.java

package com.camps.backend.models;

import com.camps.backend.enums.FurnitureStatus;
import com.camps.backend.converters.FurnitureStatusConverter;

import jakarta.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Furniture")
public class Furniture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(columnDefinition = "INT UNSIGNED")
    private Long id;

    @Column(nullable = false, length = 255)
    private String name;

    @Column(nullable = false, length = 255)
    private String description;

    @Column(nullable = false, length = 255)
    private String size;

    @Column(nullable = false, length = 255)
    private String colour;

    @Column(nullable = false)
    private int quantity;

    @Column(nullable = false)
    private double price;

    // La colonne "status" est de type ENUM('Available', 'Out of stock', 'Discontinued')
    @Column(nullable = false, columnDefinition = "ENUM('Available', 'Out of stock', 'Discontinued')")
    @Convert(converter = FurnitureStatusConverter.class)
    private FurnitureStatus status;

    // Chaque meuble a exactement un type (clé étrangère "id_type")
    @ManyToOne
    @JoinColumn(name = "id_type", nullable = false,
                columnDefinition = "INT UNSIGNED",
                foreignKey = @ForeignKey(name = "furniture_id_type_foreign"))
    private FurnitureType type;

    // Relation Many-to-Many avec Material via la table jointe "Furniture_Material"
    @ManyToMany
    @JoinTable(name = "Furniture_Material",
            joinColumns = @JoinColumn(name = "id_furniture", nullable = false,
                                       columnDefinition = "INT UNSIGNED",
                                       foreignKey = @ForeignKey(name = "furniture_material_id_furniture_foreign")),
            inverseJoinColumns = @JoinColumn(name = "id_material", nullable = false,
                                             columnDefinition = "INT UNSIGNED",
                                             foreignKey = @ForeignKey(name = "furniture_material_id_material_foreign")))
    private Set<Material> materials;

    // Un meuble peut avoir plusieurs images
    @OneToMany(mappedBy = "furniture")
    private List<Image> images;

    // Constructeurs, getters et setters...
}
