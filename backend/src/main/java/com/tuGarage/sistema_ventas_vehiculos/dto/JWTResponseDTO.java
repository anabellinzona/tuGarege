package com.tuGarage.sistema_ventas_vehiculos.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JWTResponseDTO {
    private String token;
    private String type;
    private Long id;
    private String email;
    private String nombre;
}
