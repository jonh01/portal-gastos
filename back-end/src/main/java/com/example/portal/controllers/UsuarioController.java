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
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.example.portal.models.Usuario;
import com.example.portal.models.dtos.UsuarioDTO;
import com.example.portal.repositories.UsuarioRepository;

import jakarta.validation.Valid;

@RestController
@RequestMapping("usuarios")
@CrossOrigin(origins = "*")
public class UsuarioController {
	
	@Autowired
	private UsuarioRepository repository;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Usuario usu) {
		
		Optional<Usuario> usuExist = repository.findByEmailIgnoreCase(usu.getEmail());
		
		if(usuExist.isPresent()) {
			return ResponseEntity.badRequest().body("Email já cadastrado!");
		}
		Usuario newUsu = repository.save(usu);
		URI location = ServletUriComponentsBuilder.
				fromCurrentRequest().
				path("/{id}").
				buildAndExpand(newUsu.getId()).
				toUri();
		return ResponseEntity.created(location).body(newUsu);
		
	}
	
	@DeleteMapping ("/{id}")
	public ResponseEntity<?> delete (@PathVariable Integer id) {
		Optional<Usuario> usu = repository.findById(id);
		
		if(usu.isPresent()) {
			repository.deleteById(id);
			return ResponseEntity.status(204).build();
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<?> findByEmail(@RequestParam String email){
		Optional<Usuario> usu = repository.findByEmailIgnoreCase(email);
		return usu.isPresent()? ResponseEntity.ok(usu): ResponseEntity.notFound().build();
	}
	
	@GetMapping("/{id}/saldo")
	public ResponseEntity<?> findSaldoByUsuarioId(@PathVariable Integer id){
		Optional<Double> saldo = repository.findSaldoById(id);
		return saldo.isPresent()? ResponseEntity.ok(saldo): ResponseEntity.notFound().build();
	}
	
	@PostMapping("/login")
	public ResponseEntity<?> login(@Valid @RequestBody UsuarioDTO usuLogin ){
		
		Optional<Usuario> usu = repository.findByEmailIgnoreCase(usuLogin.getEmail());
		
		if(usu.isPresent()) {
			
			return usu.get().getSenha().equals(usuLogin.getSenha())? ResponseEntity.ok(usu): ResponseEntity.badRequest().body("Email ou senha inválido(a)!");
		}
		else {
			return ResponseEntity.badRequest().body("Email ou senha inválido(a)!");
		}
	
	}
	
	@PutMapping("/senha")
	public ResponseEntity<?> updateSenha(@Valid @RequestBody UsuarioDTO usuLogin ){
		
		Optional<Usuario> usu = repository.findByEmailIgnoreCase(usuLogin.getEmail());
		
		if(usu.isPresent()) {
			usu.get().setSenha(usuLogin.getSenha());
			Usuario usuAtt = repository.save(usu.get());
			
			return ResponseEntity.ok(usuAtt);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	
	}
	
}