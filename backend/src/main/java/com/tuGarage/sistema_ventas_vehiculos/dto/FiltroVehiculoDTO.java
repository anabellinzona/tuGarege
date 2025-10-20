package com.tuGarage.sistema_ventas_vehiculos.dto;

import java.util.List;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor

@Data
public class FiltroVehiculoDTO {
    private List<String> modelos;
    private List<String> marcas;
//    private List<String> estados;
}

