package com.tuGarage.sistema_ventas_vehiculos.service;

import com.tuGarage.sistema_ventas_vehiculos.entity.Caracteristica;
import com.tuGarage.sistema_ventas_vehiculos.repository.CaracteristicaRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CaracteristicaService {

    @Autowired
    private CaracteristicaRepository caracteristicaRepository;

    public List<Caracteristica> getCaracteristicasByVehiculo(Long vehiculoId) {
        return this.caracteristicaRepository.getCaracteristicaByIdVehiculo(vehiculoId);
    }
}
