package com.miGarage.sistema_ventas_vehiculos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.config.http.SessionCreationPolicy; // Importación necesaria

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                // 1. Deshabilitar CSRF (esencial para APIs REST)
                .csrf(csrf -> csrf.disable())

                // 2. Desactivar la gestión de sesiones (CLAVE para evitar el HTML de login)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )

                // 3. REGLAS DE ACCESO: Permitir todos los GET a vehículos y vendedores
                .authorizeHttpRequests(auth -> auth
                        // Permite GET a /api/vehiculos, /api/vehiculos/123, /api/vehiculos/buscar?...
                                .requestMatchers("/api/vehiculos/buscar/**").permitAll()
                                .requestMatchers(HttpMethod.GET, "/api/vehiculos/**").permitAll()
//                        .requestMatchers(HttpMethod.POST, "/api/vehiculos/**").permitAll()

                        // Permite GET a /api/vendedores y sub-rutas
                        .requestMatchers(HttpMethod.GET, "/api/vendedores/**").permitAll()

                        // Cualquier otra petición (POST, PUT, DELETE, y rutas no GET) requiere autenticación
                        .anyRequest().authenticated()
                )

                .logout(logout -> logout.permitAll()); // Puedes dejar el logout, es inofensivo

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}