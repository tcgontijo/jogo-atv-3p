package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.domain.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {

}
