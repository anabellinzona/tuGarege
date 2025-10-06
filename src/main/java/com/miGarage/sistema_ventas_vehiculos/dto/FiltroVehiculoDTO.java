package com.miGarage.sistema_ventas_vehiculos.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.List;
@Getter
@Setter

public class FiltroVehiculoDTO {
    private String campo;
    private String nombre;
    private TipoFiltro tipo;
    private List<String> opciones;

    public FiltroVehiculoDTO(String campo, String nombre, TipoFiltro tipo, List<String> opciones) {
        this.campo = campo;
        this.nombre = nombre;
        this.tipo = tipo;
        this.opciones = opciones;
    }

    public FiltroVehiculoDTO() {}
}

