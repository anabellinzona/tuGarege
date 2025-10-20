package com.tuGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Getter
@Setter

@Entity
public class Vehiculo {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vendedor_id")
    private Long vendedorId;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Caracteristica> caracteristicas = new ArrayList<>();

    private String modelo;
    private double precio;
    private String moneda;
    private String descripcion;

    @Column(name = "tipo")
    private String tipo;

    @Column(name = "fecha_publicacion")
    private Date fechaPublicacion;

    private boolean destacado;

    @OneToMany(mappedBy = "vehiculo", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Imagen> imagenes = new ArrayList<>();

    private String marca;
    private int km;

    public Vehiculo() {}

    public Vehiculo(String modelo, int km, String marca, double precio, String moneda, String descripcion, String tipo, Date fechaPublicacion, boolean destacado) {
        this.modelo = modelo;
        this.precio = precio;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.destacado = destacado;
        this.marca = marca;
        this.km = km;
    }
}