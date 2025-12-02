package com.tuGarage.sistema_ventas_vehiculos.security;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JWTUtils jwtUtil;
    private final UserDetailsService userDetailsService;

    private static final List<String> PUBLIC_ENDPOINTS = Arrays.asList(
            "/api/vendedores/register",
            "/api/vendedores/login",
            "/vendedores/register",
            "/vendedores/login"
    );

    public JwtAuthenticationFilter(JWTUtils jwtUtil, UserDetailsService userDetailsService) {
        this.jwtUtil = jwtUtil;
        this.userDetailsService = userDetailsService;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain) throws ServletException, IOException {

        String requestPath = request.getRequestURI();
        String method = request.getMethod();

        // ===== LOGS DE DEBUG =====
        System.out.println("🔵 ========================================");
        System.out.println("🔵 Petición recibida:");
        System.out.println("🔵 Path: " + requestPath);
        System.out.println("🔵 Method: " + method);
        System.out.println("🔵 Origin: " + request.getHeader("Origin"));
        System.out.println("🔵 ========================================");
        // =========================

        // 1. OPTIONS (CORS preflight)
        if ("OPTIONS".equals(method)) {
            System.out.println("✅ Permitiendo OPTIONS (preflight CORS)");
            filterChain.doFilter(request, response);
            return;
        }

        // 2. Endpoints públicos
        if (isPublicEndpoint(requestPath)) {
            System.out.println("✅ Endpoint público - permitiendo sin JWT");
            filterChain.doFilter(request, response);
            return;
        }

        // 3. GETs públicos
        if ("GET".equals(method) && isPublicGetEndpoint(requestPath)) {
            System.out.println("✅ GET público - permitiendo sin JWT");
            filterChain.doFilter(request, response);
            return;
        }

        System.out.println("🔒 Endpoint protegido - validando JWT...");

        // 4. Validar JWT
        try {
            String authHeader = request.getHeader("Authorization");

            if (authHeader != null && authHeader.startsWith("Bearer ")) {
                String jwt = authHeader.substring(7);
                String email = jwtUtil.getUserNameFromJwtToken(jwt);

                if (email != null && SecurityContextHolder.getContext().getAuthentication() == null) {
                    UserDetails userDetails = userDetailsService.loadUserByUsername(email);

                    if (jwtUtil.validateJwtToken(jwt)) {
                        UsernamePasswordAuthenticationToken authToken =
                                new UsernamePasswordAuthenticationToken(
                                        userDetails,
                                        null,
                                        userDetails.getAuthorities()
                                );
                        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                        SecurityContextHolder.getContext().setAuthentication(authToken);
                        System.out.println("✅ JWT válido - usuario autenticado");
                    }
                }
            } else {
                System.out.println("⚠️ No se encontró token JWT en el header Authorization");
            }
        } catch (Exception e) {
            System.err.println("❌ Error procesando JWT: " + e.getMessage());
            e.printStackTrace();
        }

        filterChain.doFilter(request, response);
    }

    private boolean isPublicEndpoint(String path) {
        boolean isPublic = PUBLIC_ENDPOINTS.stream().anyMatch(path::equals);
        System.out.println("🔍 ¿Es endpoint público? " + isPublic + " (path: " + path + ")");
        return isPublic;
    }

    private boolean isPublicGetEndpoint(String path) {
        return path.startsWith("/api/vehiculos") ||
                path.startsWith("/api/caracteristicas") ||
                path.startsWith("/api/vendedores") ||
                path.startsWith("/api/usuario");
    }
}