package com.tuGarage.sistema_ventas_vehiculos.service;

import com.tuGarage.sistema_ventas_vehiculos.dto.VendedorRegisterDTO;
import com.tuGarage.sistema_ventas_vehiculos.entity.Vendedor;
import com.tuGarage.sistema_ventas_vehiculos.repository.VendedorRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder; // <-- Importación necesaria
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class VendedorService implements UserDetailsService {

    @Autowired
    private VendedorRepository vendedorRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    private static final String ROL_VENDEDOR = "VENDEDOR";

    public List<Vendedor> obtenerVendedores() {
        return vendedorRepository.findAll();
    }

    public Optional<Vendedor> obtenerVendedor(Long id) {
        // Es mejor devolver Optional<Vendedor> para manejar el caso de no encontrado.
        return vendedorRepository.findById(id);
    }

    public Vendedor guardarVendedor(Vendedor vendedor) {
        String contrasenaPlana = vendedor.getContrasena();

        String contrasenaHash = passwordEncoder.encode(contrasenaPlana);

        vendedor.setContrasena(contrasenaHash);

        return vendedorRepository.save(vendedor);
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Vendedor vendedor = vendedorRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("Email no registrado: " + email));
        return User.builder()
                .username(vendedor.getEmail())
                .password(vendedor.getContrasena())
                .authorities(Collections.singletonList(new SimpleGrantedAuthority("ROLE_" + ROL_VENDEDOR)))
                .build();
    }

    @Transactional
    public String registrarVendedor(VendedorRegisterDTO dto) {

        // Validar password y confirm
        if (!dto.getContrasena().equals(dto.getConfirmContrasena())) {
            throw new IllegalArgumentException("Las contraseñas no coinciden");
        }

        // Validar email existente
        if (vendedorRepository.existsByEmail(dto.getEmail())) {
            throw new IllegalArgumentException("El email ya está registrado");
        }

        // Crear vendedor
        Vendedor vendedor = new Vendedor();
        vendedor.setNombre(dto.getNombre());
        vendedor.setEmail(dto.getEmail());
        vendedor.setContrasena(passwordEncoder.encode(dto.getContrasena()));
        vendedor.setDireccion(dto.getDireccion());
        vendedor.setTelefono(dto.getTelefono());
        vendedor.setInstragram(dto.getInstagram());
        vendedor.setDescripcion(dto.getDescripcion());
        vendedor.setFotoPerfil(dto.getFotoPerfil());
        vendedor.setCiudad(dto.getCiudad());

        vendedorRepository.save(vendedor);

        return "Registro exitoso";
    }
}