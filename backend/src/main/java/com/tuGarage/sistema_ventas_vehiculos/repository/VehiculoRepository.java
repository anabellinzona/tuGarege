package com.tuGarage.sistema_ventas_vehiculos.repository;

import com.tuGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface VehiculoRepository extends JpaRepository<Vehiculo, Long>, JpaSpecificationExecutor<Vehiculo> {
    List<Vehiculo> findByTipo(String tipo);

    @Query("SELECT v.modelo as valor, COUNT(v) as cantidad " +
            "FROM Vehiculo v " +
            "GROUP BY v.modelo " +
            "ORDER BY v.modelo")
    List<Object[]> findDistinctModelos();

    @Query("SELECT v.marca as valor, COUNT(v) as cantidad FROM Vehiculo v GROUP BY v.marca ORDER BY v.marca")
    List<Object[]> findDistinctMarcas();

    @Query("SELECT v FROM Vehiculo v WHERE " +
            "(:modelos IS NULL OR v.modelo IN :modelos) AND " +
            "(:marcas IS NULL OR v.marca IN :marcas) ")
//            "(:estados IS NULL OR v.estadoPublicacion IN :estados)")
    List<Vehiculo> findByFiltros(
            @Param("modelos") List<String> modelos,
            @Param("marcas") List<String> marcas
//            @Param("estados") List<String> estados
    );

    @Query("SELECT v FROM Vehiculo v WHERE v.vendedorId = :vendedorId ORDER BY v.fechaPublicacion DESC")
    List<Vehiculo> findByVendedor(Long vendedorId);

    @Query("SELECT v FROM Vehiculo v LEFT JOIN FETCH v.imagenes WHERE v.destacado = true")
    List<Vehiculo> findByDestacadoTrue();

    @Query("SELECT v FROM Vehiculo v ORDER BY v.fechaPublicacion ASC")
    List<Vehiculo> findByFechaPublicacion();

    @Query("SELECT v FROM Vehiculo v ORDER BY v.marca ASC")
    List<Vehiculo> findByMarcas();

    @Query("SELECT v FROM Vehiculo v ORDER BY v.modelo ASC")
    List<Vehiculo> findVehiculoByModelo();

    @Query("SELECT v FROM Vehiculo v ORDER BY v.precio ASC")
    List<Vehiculo> findVehiculoByPrecioAsc();

    @Query("SELECT v FROM Vehiculo v ORDER BY v.precio DESC")
    List<Vehiculo> findVehiculoByPrecioDesc();

    //probar con @Order y OrderBy
}
