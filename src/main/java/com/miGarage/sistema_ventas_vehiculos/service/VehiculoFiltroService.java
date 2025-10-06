package com.miGarage.sistema_ventas_vehiculos.service;

import com.miGarage.sistema_ventas_vehiculos.dto.FiltroVehiculoDTO;
import com.miGarage.sistema_ventas_vehiculos.dto.TipoFiltro;
import com.miGarage.sistema_ventas_vehiculos.repository.VehiculoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class VehiculoFiltroService {

    @Autowired
    private VehiculoRepository vehiculoRepository;

    @Autowired
    private CaracteristicaService caracteristicaRepository;
//
//    public List<FiltroVehiculoDTO> obtenerTodosLosFiltros() {
//        List<FiltroVehiculoDTO> filtros = new ArrayList<>();
//
//        // Filtro de Marca (campo directo)
//        FiltroVehiculoDTO filtroMarca = new FiltroVehiculoDTO();
//        filtroMarca.setNombre("Marca");
//        filtroMarca.setCampo("marca");
//        filtroMarca.setTipo(TipoFiltro.CAMPO_DIRECTO);
//        filtroMarca.setOpciones(vehiculoRepository.findByMarca());
//        filtros.add(filtroMarca);
//
//        // Filtro de Modelo (campo directo)
//        FiltroVehiculoDTO filtroModelo = new FiltroVehiculoDTO();
//        filtroModelo.setNombre("Modelo");
//        filtroModelo.setCampo("modelo");
//        filtroModelo.setTipo(TipoFiltro.CAMPO_DIRECTO);
//        filtroModelo.setOpciones(vehiculoRepository.findByModelo());
//        filtros.add(filtroModelo);
//
////        // Filtro de Año (campo directo)
////        FiltroVehiculoDTO filtroAnio = new FiltroVehiculoDTO();
////        filtroAnio.setNombre("Año");
////        filtroAnio.setCampo("anio");
////        filtroAnio.setTipo(TipoFiltro.CAMPO_DIRECTO);
////        filtroAnio.setOpciones(vehiculoRepository.findDistinctAnios()
////                .stream()
////                .map(String::valueOf)
////                .collect(Collectors.toList()));
////        filtros.add(filtroAnio);
//
//        // Filtros dinámicos de características (color, transmisión, etc.)
//        List<String> tiposCaracteristicas = caracteristicaRepository.findDistinctNombres();
//
//        for (String nombreCaracteristica : tiposCaracteristicas) {
//            FiltroVehiculoDTO filtroCaracteristica = new FiltroVehiculoDTO();
//            filtroCaracteristica.setNombre(capitalizarPrimeraLetra(nombreCaracteristica));
//            filtroCaracteristica.setCampo(nombreCaracteristica);
//            filtroCaracteristica.setTipo(TipoFiltro.CARACTERISTICA);
//            filtroCaracteristica.setOpciones(
//                    caracteristicaRepository.findDistinctValoresByNombre(nombreCaracteristica)
//            );
//            filtros.add(filtroCaracteristica);
//        }
//
//        return filtros;
//    }
//
//    private String capitalizarPrimeraLetra(String texto) {
//        if (texto == null || texto.isEmpty()) return texto;
//        return texto.substring(0, 1).toUpperCase() + texto.substring(1);
//    }
}
