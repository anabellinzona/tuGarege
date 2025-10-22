package com.tuGarage.sistema_ventas_vehiculos.service;

import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroVehiculoDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.OpcionFiltroDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.tuGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo crearVehiculo(Vehiculo vehiculo) {
        return vehiculoRepository.save(vehiculo);
    }

    public List<Vehiculo> obtenerVehiculosPorVendedor(Long vendedorId) {
        return vehiculoRepository.findByVendedor(vendedorId);
    }

    public List<Vehiculo> obtenerVehiculosPorFecha() {
        return vehiculoRepository.findByFechaPublicacion();
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

    @Transactional(readOnly = true)
    public List<Vehiculo> obtenerDestacados() {
         return vehiculoRepository.findByDestacadoTrue();
    }

    public Vehiculo actualizarVehiculo(Long id, Vehiculo datosVehiculo) {
        return vehiculoRepository.findById(id).map(vehiculo -> {
            vehiculo.setModelo(datosVehiculo.getModelo());
            vehiculo.setPrecio(datosVehiculo.getPrecio());
            vehiculo.setMoneda(datosVehiculo.getMoneda());
            vehiculo.setDescripcion(datosVehiculo.getDescripcion());
            vehiculo.setFechaPublicacion(datosVehiculo.getFechaPublicacion());
//            vehiculo.setEstado(datosVehiculo.getEstado());
//            vehiculo.setVendedor(datosVehiculo.getVendedor());
            return vehiculoRepository.save(vehiculo);
        }).orElse(null);
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

    public List<Vehiculo> obtenerVehiculosOrdenadosPorMarca() {
        return vehiculoRepository.findByMarcas();
    }

    public List<Vehiculo> obtenerVehiculosOrdenadosPorModelo() {
        return vehiculoRepository.findVehiculoByModelo();
    }

    public List<Vehiculo> obtenerVehiculosOrdenadosPorPrecioAsc() {
        return vehiculoRepository.findVehiculoByPrecioAsc();
    }

    public List<Vehiculo> obtenerVehiculosOrdenadosPorPrecioDesc() {
        return vehiculoRepository.findVehiculoByPrecioDesc();
    }

    public List<Vehiculo> obtenerMarcasSinRepetidos(){
        return vehiculoRepository.findBrandWithoutRepeated();
    }
}