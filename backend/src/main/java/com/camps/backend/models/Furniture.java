// backend\src\main\java\com\camps\backend\models\Furniture.java

package com.camps.backend.models;

import com.camps.backend.enums.FurnitureStatus;
import com.camps.backend.converters.FurnitureStatusConverter;

import jakarta.persistence.*;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "furniture")
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
    // Constructeur par défaut
    public Furniture() {
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getSize() {
        return size;
    }

    public void setSize(String size) {
        this.size = size;
    }

    public String getColour() {
        return colour;
    }

    public void setColour(String colour) {
        this.colour = colour;
    }

    public FurnitureStatus getStatus() {
        return status;
    }

    public void setStatus(FurnitureStatus status) {
        this.status = status;
    }

    public FurnitureType getType() {
        return type;
    }

    public void setType(FurnitureType type) {
        this.type = type;
    }

    public List<Image> getImages() {
        return images;
    }

}
