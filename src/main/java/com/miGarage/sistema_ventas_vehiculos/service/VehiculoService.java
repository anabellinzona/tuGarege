package com.miGarage.sistema_ventas_vehiculos.service;

import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.miGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import jakarta.persistence.criteria.Predicate;
import org.springframework.data.jpa.domain.Specification;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;
//
//    public List<Vehiculo> obtenerTodos() {
//        return vehiculoRepository.findAll();
//    }
//
//    public Vehiculo guardarVehiculo(Vehiculo vehiculo) {
//        //lógica de negocio (NO OLVIDAR)
//        return vehiculoRepository.save(vehiculo);
//    }
//
////    public List<Vehiculo> obtenerVehiculoPorVendedor(Long id) {
////        return vehiculoRepository.obtenerVehiculoPorVendedor(id);
////    }
//
//    public Optional<Vehiculo> obtenerPorId(Long id) {
//        return vehiculoRepository.findById(id);
//    }
//
//    public List<Vehiculo> buscarVehiculosConFiltros(String marca, String modelo, Integer anio, String estado) {
//
//        // Creamos la especificación
//        Specification<Vehiculo> spec = (root, query, criteriaBuilder) -> {
//
//            List<Predicate> predicates = new ArrayList<>();
//
////            // 1. Filtro por Modelo
////            if (modelo != null && !modelo.isEmpty()) {
////                predicates.add(criteriaBuilder.like(
////                        criteriaBuilder.lower(root.get("modelo")),
////                        "%" + modelo.toLowerCase() + "%"
////                ));
////            }
////
////            // 2. Filtro por Año
////            if (anio != null) {
////                // Aquí usamos 'equal' ya que el usuario probablemente quiere un año exacto
////                predicates.add(criteriaBuilder.equal(
////                        root.get("anio"), anio
////                ));
////            }
////
////            // 3. Filtro por Estado (Nuevo/Usado)
////            if (estado != null && !estado.isEmpty()) {
////                predicates.add(criteriaBuilder.equal(
////                        root.get("estado"), estado
////                ));
////            }
//
//            // Si no se pasó ningún filtro, el array 'predicates' estará vacío.
//            // Si hay filtros, se combinan con un operador AND (Y)
//            return criteriaBuilder.and(predicates.toArray(new Predicate[0]));
//        };
//
//        // El findAll(spec) ejecuta la consulta dinámica
//        return vehiculoRepository.findAll(spec);
//    }
//
    public void eliminarVehiculo(Long id) {
        if (vehiculoRepository.existsById(id)) {
            vehiculoRepository.deleteById(id);
            System.out.println("Vehiculo eliminado");
        } else {
            throw new EntityNotFoundException("Vehículo no encontrado con ID: " + id);
        }
    }

    public List<Vehiculo> obtenerVehiculosPorTipo(String tipo) {
        return vehiculoRepository.findByTipo(tipo);
    }
//
//    public List<Vehiculo> obtenerDestacados() {
//        // List<Vehiculo> findByDestacadoTrue();
//        // Por ahora, solo usamos el findAll()
//        return vehiculoRepository.findAll();
//    }

}