package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
}
