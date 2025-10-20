package com.tuGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
@Table(name = "vendedor")
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    private String telefono;
    private String email;
    private String contrasena;
    private String instragram;
    private String descripcion;
    private String fotoPerfil;
    private String ciudad;

    public Vendedor() {}

    public Vendedor(String nombre, String direccion, String telefono, String email, String contrasena, String instragram, String descripcion, String fotoPerfil, String ciudad) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.email = email;
        this.contrasena = contrasena;
        this.instragram = instragram;
        this.descripcion = descripcion;
        this.fotoPerfil = fotoPerfil;
        this.ciudad = ciudad;
    }
}
