package com.miGarage.sistema_ventas_vehiculos.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

@Entity
public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "caracteristica", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VehiculoCaracteristica> vehiculoCaracteristicas;

    private String nombre;
    private String categoria;

    public Caracteristica() {}

    public Caracteristica(String nombre, String categoria) {
        this.nombre = nombre;
        this.categoria = categoria;
    }
}
