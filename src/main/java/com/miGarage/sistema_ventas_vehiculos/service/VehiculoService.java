package com.miGarage.sistema_ventas_vehiculos.service;

import com.miGarage.sistema_ventas_vehiculos.dto.FiltroDTO;
import com.miGarage.sistema_ventas_vehiculos.dto.FiltroVehiculoDTO;
import com.miGarage.sistema_ventas_vehiculos.dto.OpcionFiltroDTO;
import com.miGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.miGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public List<Vehiculo> obtenerVehiculosPorVendedor(Long vendedorId) {
        return vehiculoRepository.findByVendedor(vendedorId);
    }

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

    public List<Vehiculo> obtenerDestacados() {
         return vehiculoRepository.findByDestacadoTrue();
    }

    public Map<String, FiltroDTO> obtenerFiltrosDisponibles() {
        Map<String, FiltroDTO> filtros = new HashMap<>();

        FiltroDTO filtroModelo = new FiltroDTO();
        filtroModelo.setNombre("Modelo");
        filtroModelo.setOpciones(convertirA_Opciones(vehiculoRepository.findDistinctModelos()));
        filtros.put("Modelo", filtroModelo);

        FiltroDTO filtroMarcas = new FiltroDTO();
        filtroMarcas.setNombre("Marca");
        filtroMarcas.setOpciones(convertirA_Opciones(vehiculoRepository.findDistinctMarcas()));
        filtros.put("Marca", filtroMarcas);

        return filtros;
    }

    private List<OpcionFiltroDTO> convertirA_Opciones(List<Object[]> resultados) {
        return resultados.stream()
                .map(obj -> {
                    OpcionFiltroDTO opcion = new OpcionFiltroDTO();
                    opcion.setValor((String) obj[0]);
                    opcion.setCantidad(((Number) obj[1]).longValue());
                    return opcion;
                })
                .collect(Collectors.toList());
    }

    public List<Vehiculo> obtenerVehiculosDisponibles(FiltroVehiculoDTO filtrosVehiculo) {
        List<String> modelos = (filtrosVehiculo.getModelos() != null && !filtrosVehiculo.getModelos().isEmpty()) ? filtrosVehiculo.getModelos() : null;
        List<String> marcas = (filtrosVehiculo.getMarcas() != null && !filtrosVehiculo.getMarcas().isEmpty()) ? filtrosVehiculo.getMarcas() : null;

        return vehiculoRepository.findByFiltros(modelos, marcas);
    }

    public Optional<Vehiculo> obtenerVehiculo(Long id) {
        return vehiculoRepository.findById(id);
    }

    //    public Vehiculo guardarVehiculo(Vehiculo vehiculo) {
//        //lógica de negocio (NO OLVIDAR)
//        return vehiculoRepository.save(vehiculo);
//    }

    //    public Optional<Vehiculo> obtenerPorId(Long id) {
//        return vehiculoRepository.findById(id);
//    }
}