package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long> {
}
