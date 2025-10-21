package com.tuGarage.sistema_ventas_vehiculos.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.List;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    // 1. BEAN DE CONFIGURACIÓN DE CORS (Forma recomendada por Spring Security)
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();

        // Origen del Frontend
        configuration.setAllowedOrigins(List.of("http://localhost:3000"));

        // Métodos permitidos (OPTIONS es crucial para el preflight)
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "OPTIONS"));

        // Headers y Credenciales
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/api/**", configuration);

        return source;
    }

    // 2. BEAN PRINCIPAL DE CONFIGURACIÓN DE SEGURIDAD
    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(Customizer.withDefaults()) // Utiliza el bean CorsConfigurationSource
                .csrf(csrf -> csrf.disable()) // Deshabilitar CSRF para API REST

                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS) // API sin estado
                )
                .authorizeHttpRequests(auth -> {
                    // *** Permisos Públicos ***

                    // Permitir el registro (POST) sin autenticación
                    auth.requestMatchers(HttpMethod.POST, "/api/vendedores/register").permitAll();

                    // Permitir la consulta de datos de vehículos y vendedores (GET) sin autenticación
                    auth.requestMatchers(HttpMethod.GET, "/api/vehiculos/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/vendedores/**").permitAll();

                    // *** Restricción ***
                    // Cualquier otra petición debe estar autenticada
                    auth.anyRequest().authenticated();
                })

                .logout(logout -> logout.permitAll());

        return http.build();
    }

    // 3. BEAN PARA EL CODIFICADOR DE CONTRASEÑAS
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}