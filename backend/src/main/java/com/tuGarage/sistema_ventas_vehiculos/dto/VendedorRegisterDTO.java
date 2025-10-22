package com.tuGarage.sistema_ventas_vehiculos.dto;

import jakarta.validation.constraints.*;
import lombok.Data;

@Data
public class VendedorRegisterDTO {

    @NotBlank(message = "El nombre es obligatorio")
    private String nombre;

    @NotBlank(message = "El email es obligatorio")
    @Email(message = "Email inválido")
    private String email;

    @NotBlank(message = "La contraseña es obligatoria")
    @Size(min = 6, message = "La contraseña debe tener al menos 6 caracteres")
    private String contrasenia;

    @NotBlank(message = "Debe repetir la contraseña")
    private String confirmarContrasenia;

    // Opcionales
    private String direccion;
    private String telefono;
    private String instagram;
    private String descripcion;
    private String fotoPerfil;
    private String ciudad;
}
