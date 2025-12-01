package com.tuGarage.sistema_ventas_vehiculos.config;

import com.tuGarage.sistema_ventas_vehiculos.security.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Lazy;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
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

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final UserDetailsService userDetailsService;

    // Usar @Lazy para romper la dependencia circular
    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                          @Lazy UserDetailsService userDetailsService) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
        this.userDetailsService = userDetailsService;
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOriginPatterns(List.of("*")); // <-- PERMITIR TODO PARA PROBAR
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource())) // ← AGREGAR ESTO
                .csrf(csrf -> csrf.disable())
                .authorizeHttpRequests(auth -> {
                    // Endpoints públicos de USUARIO (agregar estos)
                    auth.requestMatchers(HttpMethod.POST, "/api/usuario/register").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/api/usuario/login").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/usuario/**").permitAll();

                    // Endpoints públicos de VENDEDORES
                    auth.requestMatchers(HttpMethod.POST, "/api/vendedores/register").permitAll();
                    auth.requestMatchers(HttpMethod.POST, "/api/vendedores/login").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/vendedores/**").permitAll();

                    // Otros endpoints públicos
                    auth.requestMatchers(HttpMethod.GET, "/api/vehiculos/**").permitAll();
                    auth.requestMatchers(HttpMethod.GET, "/api/caracteristicas/**").permitAll();

                    // Endpoints protegidos
                    auth.requestMatchers(HttpMethod.PUT, "/api/vendedores/**").authenticated();
                    auth.requestMatchers(HttpMethod.DELETE, "/api/vendedores/**").authenticated();
                    auth.requestMatchers(HttpMethod.PUT, "/api/usuario/**").authenticated();
                    auth.requestMatchers(HttpMethod.DELETE, "/api/usuario/**").authenticated();

                    // Todo lo demás requiere autenticación
                    auth.anyRequest().authenticated();
                })
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                );
        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider() {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}