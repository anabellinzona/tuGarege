package com.miGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
import java.util.List;

@Getter
@Setter


@Entity
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    List<VehiculoCaracteristica> vehiculoCaracteristicas;

    private String modelo;
    private double precio;
    private String moneda;
    private String descripcion;

    @Column(name = "fecha_publicacion")
    private Date fechaPubliacion;

    private boolean destacado;

    @Column(name = "estado_publicacion")
    private String estado;

    public Vehiculo() {}


    public Vehiculo(String modelo, double precio, String moneda, String descripcion, Date fechaPublicacion, boolean destacado, String estado) {
        this.modelo = modelo;
        this.precio = precio;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.fechaPubliacion = fechaPublicacion;
        this.destacado = destacado;
        this.estado = estado;
    }
}
