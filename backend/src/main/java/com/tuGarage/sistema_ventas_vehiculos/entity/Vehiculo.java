package com.tuGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Entity
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vendedor_id")
    private Long vendedorId;

    private String modelo;
    private double precio;
    private String descripcion;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "fecha_publicacion")
    private LocalDateTime fechaPublicacion;

    private boolean destacado;

    private String estado;

    private int anio;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagen> imagenes = new ArrayList<>();

    private String marca;
    private int km;
}