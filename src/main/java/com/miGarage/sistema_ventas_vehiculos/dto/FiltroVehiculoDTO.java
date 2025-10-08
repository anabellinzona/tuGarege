package com.miGarage.sistema_ventas_vehiculos.dto;

import java.util.List;
import java.util.Map;

import lombok.Data;

@Data
public class FiltroVehiculoDTO {
    private List<String> modelos;
    private List<String> marcas;
    private List<String> estados;
}

