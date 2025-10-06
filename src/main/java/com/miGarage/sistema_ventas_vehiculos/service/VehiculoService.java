package com.miGarage.sistema_ventas_vehiculos.service;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.miGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo guardarVehiculo(Vehiculo vehiculo) {
        //lógica de negocio (NO OLVIDAR)
        return vehiculoRepository.save(vehiculo);
    }

    public Optional<Vehiculo> obtenerPorId(Long id) {
        return vehiculoRepository.findById(id);
    }

    public void eliminarVehiculo(Long id) {
        // if (vehiculoRepository.existsById(id)) {
        //     vehiculoRepository.deleteById(id);
        // }
        vehiculoRepository.deleteById(id);
    }

    public List<Vehiculo> obtenerDestacados() {
        // List<Vehiculo> findByDestacadoTrue();
        // Por ahora, solo usamos el findAll()
        return vehiculoRepository.findAll();
    }

}