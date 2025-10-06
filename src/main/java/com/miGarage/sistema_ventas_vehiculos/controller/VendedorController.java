package com.miGarage.sistema_ventas_vehiculos.controller;

import com.miGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.miGarage.sistema_ventas_vehiculos.service.VendedorService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
}
