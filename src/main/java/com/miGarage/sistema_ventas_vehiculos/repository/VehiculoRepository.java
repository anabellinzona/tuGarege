package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>, JpaSpecificationExecutor<Vehiculo> {
    List<Vehiculo> findByTipo(String tipo);

    @Query("SELECT DISTINCT c.nombre FROM Vehiculo v JOIN VehiculoCaracteristica vc ON v.id = vc.vehiculo.id JOIN Caracteristica c ON vc.caracteristica.id = c.id WHERE c.nombre IS NOT NULL ORDER BY c.nombre")
    List<String> findByMarca();

    @Query("SELECT DISTINCT v.modelo FROM Vehiculo v WHERE v.modelo IS NOT NULL ORDER BY v.modelo")
    List<String> findByModelo();

//    @Query("SELECT DISTINCT v.anio FROM Vehiculo v WHERE v.anio IS NOT NULL ORDER BY v.anio DESC")
//    List<Integer> findDistinctAnios();
}
