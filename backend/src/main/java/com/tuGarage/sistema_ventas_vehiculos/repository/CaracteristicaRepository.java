package com.tuGarage.sistema_ventas_vehiculos.repository;

import com.tuGarage.sistema_ventas_vehiculos.entity.Caracteristica;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CaracteristicaRepository extends JpaRepository<Caracteristica, Long> {
    @Query("SELECT c FROM Caracteristica c WHERE c.vehiculo.id = :vehiculoId")
    List<Caracteristica> getCaracteristicaByIdVehiculo(@Param("vehiculoId") Long vehiculoId);
}
