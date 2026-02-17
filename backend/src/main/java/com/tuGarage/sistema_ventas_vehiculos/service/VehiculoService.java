package com.tuGarage.sistema_ventas_vehiculos.service;

import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.FiltroVehiculoDTO;
import com.tuGarage.sistema_ventas_vehiculos.dto.OpcionFiltroDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Imagen;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vehiculo;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.tuGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import com.tuGarage.sistema_ventas_vehiculos.repository.VendedorRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class VehiculoService {

    @Autowired
    private VehiculoRepository vehiculoRepository;
    @Autowired
    private VendedorRepository vendedorRepository;

    public List<Vehiculo> obtenerTodos() {
        return vehiculoRepository.findAll();
    }

    public Vehiculo crearVehiculo(Vehiculo datos, Long vendedorId) {

        Vehiculo v = new Vehiculo();

        v.setMarca(datos.getMarca());
        v.setModelo(datos.getModelo());
        v.setKm(datos.getKm());
        v.setAnio(datos.getAnio());
        v.setTipo(datos.getTipo());
        v.setPrecio(datos.getPrecio());
        v.setDescripcion(datos.getDescripcion());
        v.setEstado(datos.getEstado());

        if (datos.getImagenes() != null) {
            for (Imagen img : datos.getImagenes()) {
                img.setVehiculo(v);
                v.getImagenes().add(img);
            }
        }

        v.setFechaPublicacion(LocalDateTime.now());
        v.setDestacado(false);

        Vendedor vendedor = vendedorRepository.findById(vendedorId)
                .orElseThrow(() -> new RuntimeException("Vendedor no encontrado"));
        v.setVendedorId(vendedor.getId());

        return vehiculoRepository.save(v);
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

    public Vehiculo actualizarVehiculo(Long id, Vehiculo datos) {

        return vehiculoRepository.findById(id).map(vehiculo -> {

            if (datos.getMarca() != null)
                vehiculo.setMarca(datos.getMarca());

            if (datos.getModelo() != null)
                vehiculo.setModelo(datos.getModelo());

            if (datos.getKm() != 0)
                vehiculo.setKm(datos.getKm());

            if (datos.getAnio() != 0)
                vehiculo.setAnio(datos.getAnio());

            if (datos.getDescripcion() != null)
                vehiculo.setDescripcion(datos.getDescripcion());

            if (datos.getTipo() != null)
                vehiculo.setTipo(datos.getTipo());

            if (datos.getEstado() != null)
                vehiculo.setEstado(datos.getEstado());

            if (datos.getFechaPublicacion() != null)
                vehiculo.setFechaPublicacion(datos.getFechaPublicacion());

            if (datos.getPrecio() != 0)
                vehiculo.setPrecio(datos.getPrecio());

            if (datos.getVendedorId() != null)
                vehiculo.setVendedorId(datos.getVendedorId());

            if (datos.getImagenes() != null) {

                vehiculo.getImagenes().clear();

                for (Imagen img : datos.getImagenes()) {
                    img.setId(null);
                    img.setVehiculo(vehiculo);
                    vehiculo.getImagenes().add(img);
                }
            }


            return vehiculoRepository.save(vehiculo);

        }).orElseThrow(() -> new RuntimeException("Vehículo no encontrado"));
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

    public List<Vehiculo> sugerirVehiculos(Long id) {
        Vehiculo base = vehiculoRepository.findById(id).orElse(null);
        if (base == null) return List.of();

        return vehiculoRepository.findDifferentVehicule(
                base.getId(),
                base.getMarca(),
                base.getModelo(),
                base.getEstado()
        );
    }
}