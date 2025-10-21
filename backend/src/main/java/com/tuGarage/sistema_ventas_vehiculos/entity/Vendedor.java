package com.tuGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Entity
@Table(name = "vendedor")
public class Vendedor {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String direccion;
    @Column(name = "numero_telefono")
    private String telefono;
    private String email;
    private String contrasena;
    private String instagram;
    @Column(name = "descripcion_perfil")
    private String descripcion;
    @Column(name = "foto_perfil")
    private String fotoPerfil;
    private String ciudad;
}
