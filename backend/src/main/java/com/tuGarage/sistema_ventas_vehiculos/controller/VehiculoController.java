package com.tuGarage.sistema_ventas_vehiculos.controller;

import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroVehiculoDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.tuGarage.sistema_ventas_vehiculos.service.VehiculoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/vehiculos")
@CrossOrigin(origins = "http://localhost:3000")
public class VehiculoController {
    @Autowired
    private VehiculoService vehiculoService;

    public VehiculoController(VehiculoService vehiculoService) {
        this.vehiculoService = vehiculoService;
    }

    @DeleteMapping("/eliminar/{id}")
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

    @GetMapping("/{id}")
    public ResponseEntity<Vehiculo> obtenerVehiculo(@PathVariable Long id) {
        Optional<Vehiculo> vehiculo = vehiculoService.obtenerVehiculo(id);

        return vehiculo
                .map(v -> new ResponseEntity<>(v, HttpStatus.OK))
                .orElse(new ResponseEntity<>(HttpStatus.NOT_FOUND));
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

    @GetMapping("/filtros")
    public ResponseEntity<Map<String, FiltroDTO>> obtenerFiltros() {
        return ResponseEntity.ok(vehiculoService.obtenerFiltrosDisponibles());
    }

    @GetMapping("/buscar")
    public ResponseEntity<List<Vehiculo>> buscarConFiltros(
            FiltroVehiculoDTO filtros,
            @RequestParam(required = false) List<String> modelos,
            @RequestParam(required = false) List<String> marcas
    ) {
        System.out.println(filtros + " " + modelos + " " + marcas);
        if (modelos != null && !modelos.isEmpty()) {
            filtros.setModelos(modelos);
        }
        if (marcas != null && !marcas.isEmpty()) {
            filtros.setMarcas(marcas);
        }
        return ResponseEntity.ok(vehiculoService.obtenerVehiculosDisponibles(filtros));
    }

    @PostMapping
    public ResponseEntity<Vehiculo> crearVehiculo(@RequestBody Vehiculo vehiculo) {
        Vehiculo nuevo = vehiculoService.crearVehiculo(vehiculo, vehiculo.getVendedorId());

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

    @GetMapping("/recientes")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorFecha() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosPorFecha();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/marca")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorMarca() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosOrdenadosPorMarca();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/modelo")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorModelo() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosOrdenadosPorModelo();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/precioAsc")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorPrecioAsc() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosOrdenadosPorPrecioAsc();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/precioDesc")
    public ResponseEntity<List<Vehiculo>> obtenerVehiculosPorPrecioDesc() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerVehiculosOrdenadosPorPrecioDesc();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/sinRepetidos")
    public ResponseEntity<List<Vehiculo>> obtenerMarcasSinRepetidos() {
        List<Vehiculo> vehiculos = vehiculoService.obtenerMarcasSinRepetidos();
        if(vehiculos.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(vehiculos);
    }

    @GetMapping("/sugerencias/{id}")
    public ResponseEntity<List<Vehiculo>> getSugerencias(@PathVariable Long id) {
        List<Vehiculo> sugerencias = vehiculoService.sugerirVehiculos(id);

        if (sugerencias.isEmpty()) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(sugerencias);
    }

//    @GetMapping("/buscar")
//    public ResponseEntity<List<Vehiculo>> buscarConFiltros(@RequestParam(required = false) List<String> modelos, @RequestParam(required = false) List<String> marcas) {
//        FiltroVehiculoDTO filtros = new FiltroVehiculoDTO();
//        filtros.setModelos(modelos);
//        filtros.setMarcas(marcas);
//
//        return ResponseEntity.ok(vehiculoService.obtenerVehiculosDisponibles(filtros));
//    }
}