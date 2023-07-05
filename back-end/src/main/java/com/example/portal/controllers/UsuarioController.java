package com.example.portal.controllers;

import java.net.URI;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.portal.models.Usuario;
import com.example.portal.repositories.UsuarioRepository;

@RestController
@RequestMapping("usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository repository;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Usuario usu) {
		
		Optional<Usuario> usuExist = repository.findByUsername(usu.getUsername());
		
		if(usuExist == null) {
			Usuario newUsu = repository.save(usu);
			URI location = ServletUriComponentsBuilder.
					fromCurrentRequest().
					path("/{id}").
					buildAndExpand(newUsu.getId()).
					toUri();
			return ResponseEntity.created(location).body(newUsu);
		}
		return ResponseEntity.badRequest().body("Email já cadastrado!");
	}
	
	@DeleteMapping ("/{id}")
	public ResponseEntity<?> delete (@PathVariable Integer id) {
		Optional<Usuario> usu = repository.findById(id);
		
		if(usu != null) {
			repository.deleteById(id);
			return ResponseEntity.status(204).build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<?> findByUsername(@RequestParam String username){
		Optional<Usuario> usu = repository.findByUsername(username);
		return usu != null? ResponseEntity.ok(usu): ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}/saldo")
	public ResponseEntity<?> findSaldoByUsuarioId(@PathVariable Integer id){
		Optional<Double> saldo = repository.findSaldoById(id);
		return saldo != null? ResponseEntity.ok(saldo): ResponseEntity.notFound().build();
	}
	
}