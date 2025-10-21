package com.tuGarage.sistema_ventas_vehiculos.controller;

import com.tuGarage.sistema_ventas_vehiculos.dto.VendedorRegisterDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.tuGarage.sistema_ventas_vehiculos.service.VendedorService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/vendedores")
public class VendedorController {
    private final VendedorService vendedorService;

    public VendedorController(VendedorService vendedorService) {
        this.vendedorService = vendedorService;
    }

    @GetMapping
    public ResponseEntity<List<Vendedor>> obtenerTodos() {
        List<Vendedor> vendedores = vendedorService.obtenerVendedores();

        return new ResponseEntity<>(vendedores, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Vendedor>> obtenerVendedorPorId(@PathVariable Long id) {
        Optional<Vendedor> vendedor = vendedorService.obtenerVendedor(id);

        return new ResponseEntity<>(vendedor, HttpStatus.OK);
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@Valid @RequestBody VendedorRegisterDTO dto) {
        try {
            String mensaje = vendedorService.registrarVendedor(dto);
            return ResponseEntity.ok(mensaje);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

//    @GetMapping("/login")
//    public ResponseEntity<String> login(@RequestParam String email, @RequestParam String password) {
//        try {
//
//        }
//    }
}
