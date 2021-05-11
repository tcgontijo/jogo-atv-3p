package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Usuario;
import com.repository.UsuarioRepository;

@Service
public class UsuarioService {

	@Autowired
	UsuarioRepository repo;

	public List<Usuario> todos() {
		return repo.findAll();
	}

	public Usuario novo(Usuario usuario) {
		return repo.save(usuario);
	}
}
