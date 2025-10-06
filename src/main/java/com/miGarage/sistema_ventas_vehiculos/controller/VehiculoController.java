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

    @GetMapping("/tipo/{tipo}")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorTipo(@PathVariable String tipo) { // <-- Tipo de retorno CORREGIDO

        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosPorTipo(tipo);

        if (vehiculos.isEmpty()) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(vehiculos);
    }
}
