package com.miGarage.sistema_ventas_vehiculos.service;

import com.miGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.miGarage.sistema_ventas_vehiculos.repository.VendedorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class VendedorService {
    @Autowired
    private VendedorRepository vendedorRepository;

    public List<Vendedor> obtenerVendedores() {
        return vendedorRepository.findAll();
    }

    public Vendedor obtenerVendedorPorId(Long id) {
        return vendedorRepository.findById(id).get();
    }
}
