package com.miGarage.sistema_ventas_vehiculos.controller;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.miGarage.sistema_ventas_vehiculos.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    public VehiculoController(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminarVehiculo(@PathVariable Long id) {
        vehiculoService.eliminarVehiculo(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping
    public ResponseEntity<List<Vehiculo>> obtenerTodos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerTodos();

        if (vehiculos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorTipo(@PathVariable String tipo) { // <-- Tipo de retorno CORREGIDO

        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosPorTipo(tipo);

        if (vehiculos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/destacados")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosDestacados() {
        List<Vehiculo> destacados = vehiculoService.obtenerDestacados();

        if (destacados.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(destacados);
    }

    @GetMapping("/vendedor/{vendedorId}")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorVendedor(@PathVariable Long vendedorId) {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosPorVendedor(vendedorId);

        if (vehiculos.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @PostMapping
    public ResponseEntity<Vehiculo> crearVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo nuevo = vehiculoService.crearVehiculo(vehiculo);

        return ResponseEntity.ok(nuevo);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Vehiculo> actualizarVehiculo(@PathVariable Long id, @RequestBody Vehiculo actualizado) {

        Vehiculo vehiculo = vehiculoService.actualizarVehiculo(id, actualizado);
        if (vehiculo == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehiculo);
    }
}
