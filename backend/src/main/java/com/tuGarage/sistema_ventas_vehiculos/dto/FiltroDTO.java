package com.tuGarage.sistema_ventas_vehiculos.dto;

import java.util.List;

import lombok.Data;

@Data
public class FiltroDTO {
    private String nombre;
    private List<OpcionFiltroDTO> opciones;
}
