package com.miGarage.sistema_ventas_vehiculos.controller;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.miGarage.sistema_ventas_vehiculos.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/vehiculos")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    @GetMapping
    public List<Vehiculo> obtenerVehiculos() {
        return null;
    }

    @PostMapping
    public Vehiculo guardarVehiculo(@RequestBody Vehiculo vehiculo) {
        return null;
    }

    @PutMapping
    public Vehiculo actualizarVehiculo(@RequestBody Vehiculo vehiculo) {
        return null;
    }

    @DeleteMapping
    public void eliminarVehiculo(@RequestBody Vehiculo vehiculo) {
        vehiculoService.eliminarVehiculo(vehiculo.getId());
    }
}
