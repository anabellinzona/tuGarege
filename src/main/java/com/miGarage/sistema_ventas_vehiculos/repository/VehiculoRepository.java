package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>, JpaSpecificationExecutor<Vehiculo> {
    List<Vehiculo> findByTipo(String tipo);
}
