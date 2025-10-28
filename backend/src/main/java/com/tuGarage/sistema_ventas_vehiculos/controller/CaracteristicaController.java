package com.tuGarage.sistema_ventas_vehiculos.controller;

import com.tuGarage.sistema_ventas_vehiculos.entity.Caracteristica;
import com.tuGarage.sistema_ventas_vehiculos.service.CaracteristicaService;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/caracteristicas")
@CrossOrigin(origins = "http://localhost:3000")
public class CaracteristicaController {

    @Autowired
    private CaracteristicaService caracteristicaService;

    @GetMapping("/vehiculo/{id}")
    public ResponseEntity<List<Caracteristica>> getCaracteristicas(@PathVariable Long id) {
        List<Caracteristica> caracteristicas = caracteristicaService.getCaracteristicasByVehiculo(id);
        if(caracteristicas.isEmpty()){
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(caracteristicas);
    }
}
