package com.tuGarage.sistema_ventas_vehiculos.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class VendedorLoginDTO {
    @NotBlank(message = "El email es obligatorio para ingresar")
    @Email(message = "Email invalido")
    private String email;

    @NotBlank(message = "La contraseña en obligatoria para ingresar")
    @Size(min = 6, message = "La contraseña debe contener al menos 6 caracteres")
    private String contrasenia;
}
