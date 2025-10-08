package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>, JpaSpecificationExecutor<Vehiculo> {
    List<Vehiculo> findByTipo(String tipo);

    // Obtener todos los modelos distintos con su cantidad
    @Query("SELECT v.modelo as valor, COUNT(v) as cantidad " +
            "FROM Vehiculo v " +
            "GROUP BY v.modelo " +
            "ORDER BY v.modelo")
    List<Object[]> findDistinctModelos();

    @Query("SELECT v.marca as valor, COUNT(v) as cantidad FROM Vehiculo v GROUP BY v.marca ORDER BY v.marca")
    List<Object[]> findDistinctMarcas();

    @Query("SELECT v FROM Vehiculo v WHERE " +
            "(:modelos IS NULL OR v.modelo IN :modelos) AND " +
            "(:marcas IS NULL OR v.marca IN :marcas) " )
//            "(:estados IS NULL OR v.estadoPublicacion IN :estados)")
    List<Vehiculo> findByFiltros(
            @Param("modelos") List<String> modelos,
            @Param("marcas") List<String> marcas
//            @Param("estados") List<String> estados
    );

    @Query("SELECT v FROM Vehiculo v WHERE v.vendedorId = :vendedorId ORDER BY v.fechaPublicacion DESC")
    List<Vehiculo> findByVendedor(Long vendedorId);

    @Query("SELECT v FROM Vehiculo v WHERE v.destacado = true")
    List<Vehiculo> findByDestacadoTrue();
}
