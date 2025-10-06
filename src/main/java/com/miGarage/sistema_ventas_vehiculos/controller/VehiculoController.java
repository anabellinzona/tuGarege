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
    public List<Vehiculo> obtenerOFiltrarVehiculos(
            @RequestParam(required = false) String marca,
            @RequestParam(required = false) String modelo,
            @RequestParam(required = false) Integer anio, // Nota: Int/Long para años
            @RequestParam(required = false) String estado
            // Aquí agregarías los demás filtros como carroceria, precioMin, etc.
    )
    {
        // El Controller sólo recolecta y delega los parámetros
        return vehiculoService.buscarVehiculosConFiltros(marca, modelo, anio, estado);
    }

    @GetMapping("/vendedor/{id}")
    public List<Vehiculo> obtenerPorVendedor(@PathVariable Long id) {
        return vehiculoService.obtenerVehiculoPorVendedor(id);
    }

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
