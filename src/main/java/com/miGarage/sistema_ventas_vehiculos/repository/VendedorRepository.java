package com.miGarage.sistema_ventas_vehiculos.repository;

import com.miGarage.sistema_ventas_vehiculos.entity.Vendedor;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface VendedorRepository extends JpaRepository<Vendedor, Long> {
    Optional<Vendedor> findByEmail(String email);
}
