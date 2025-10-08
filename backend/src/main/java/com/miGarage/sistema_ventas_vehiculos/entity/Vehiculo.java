package com.miGarage.sistema_ventas_vehiculos.entity;

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

//    @NotBlank(message = "El modelo no puede estar vacío")
//    @Size(max = 150, message = "El modelo no puede tener más de 150 caracteres")
    private String modelo;

//    @NotNull(message = "El precio es obligatorio")
//    @DecimalMin(value = "0.0", inclusive = false, message = "El precio debe ser mayor que 0")
    private double precio;

//    @NotBlank(message = "La moneda es obligatoria")
//    @Pattern(regexp = "USD|ARS|EUR", message = "La moneda debe ser USD, ARS o EUR")
    private String moneda;

//    @Size(max = 1000, message = "La descripción no puede tener más de 1000 caracteres")
    private String descripcion;

    @Column(name = "tipo")
//    @NotBlank(message = "El tipo es obligatorio")
    private String tipo;

    @Column(name = "fecha_publicacion")
//    @NotNull    (message = "La fecha es obligatoria")
    private Date fechaPublicacion;

    private boolean destacado;

    private String marca;

    @Column(name = "estado_publicacion")
//    @Pattern(regexp = "activo|inactivo|pausado", message = "El estado de publicación debe ser activo, inactivo o pausado")
    private String estado;

    public Vehiculo() {}


    public Vehiculo(String modelo, String marca, double precio, String moneda, String descripcion, String tipo, Date fechaPublicacion, boolean destacado, String estado) {
        this.modelo = modelo;
        this.precio = precio;
        this.moneda = moneda;
        this.descripcion = descripcion;
        this.tipo = tipo;
        this.fechaPublicacion = fechaPublicacion;
        this.destacado = destacado;
        this.marca = marca;
        this.estado = estado;
    }
}
