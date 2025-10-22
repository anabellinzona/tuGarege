package com.tuGarage.sistema_ventas_vehiculos.service;

import com.tuGarage.sistema_ventas_vehiculos.dto.JWTResponseDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.VendedorLoginDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.tuGarage.sistema_ventas_vehiculos.repository.VendedorRepository;
import com.tuGarage.sistema_ventas_vehiculos.security.JWTUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JWTUtils jwtUtils;

    @Autowired
    private VendedorRepository vendedorRepository;

    public JWTResponseDTO authenticateUser(VendedorLoginDTO loginRequest) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            loginRequest.getEmail(),
                            loginRequest.getContrasenia()
                    )
            );

            SecurityContextHolder.getContext().setAuthentication(authentication);

            String jwt = jwtUtils.generateJwtToken(authentication);

            Vendedor vendedor = vendedorRepository.findByEmail(loginRequest.getEmail())
                    .orElseThrow(() -> new RuntimeException("Vendedor no encontrado"));

            return JWTResponseDTO.builder()
                    .token(jwt)
                    .type("Bearer")
                    .email(vendedor.getEmail())
                    .build();

        } catch (BadCredentialsException e) {
            throw new BadCredentialsException("Email o contraseña incorrectos");
        }
    }
}