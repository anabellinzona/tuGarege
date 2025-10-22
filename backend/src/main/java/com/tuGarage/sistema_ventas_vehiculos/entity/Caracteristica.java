package com.tuGarage.sistema_ventas_vehiculos.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "caracteristica")
public class Caracteristica {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String nombre;
    private String categoria;

    // Confirma que el nombre es "valorNumerico" (con N mayúscula)
    @Column(name = "valor_numerico")
    private Double valorNumerico;

    // Confirma que el nombre es "valorTexto" (con T mayúscula)
    @Column(name = "valor_texto")
    private String valorTexto;

    // Relación Many-to-One con Vehiculo
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "id_vehiculo", nullable = false)
    private Vehiculo vehiculo;
}