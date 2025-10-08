package com.miGarage.sistema_ventas_vehiculos.entity;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter

@Entity
@Table(name = "vehiculo")
public class Vehiculo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vendedor_id")
    private Long vendedorId;

    private String modelo;
    private BigDecimal precio;
    private String moneda;
    private String descripcion;

    @Column(name = "estado_publicacion")
    private String estadoPublicacion;

    @Column(name = "fecha_publicacion")
    private LocalDateTime fechaPublicacion;

    private Boolean destacado;
    private String tipo;
    private String marca;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Caracteristica> caracteristicas = new ArrayList<>();
}
