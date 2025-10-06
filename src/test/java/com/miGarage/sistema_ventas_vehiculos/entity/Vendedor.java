package com.miGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

@Entity
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

    public Vendedor(String nombre, String direccion, String telefono, String email, String contrasena, String instragram, String descripcion, String fotoPerfil) {
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
