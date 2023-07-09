package com.example.portal.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.example.portal.models.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Integer> {
	
	Optional<Usuario> findByEmailIgnoreCase(String email);
	
	@Transactional
	@Modifying
	@Query(value = "update usuario set saldo = ? where id = ?", 
	 		nativeQuery = true)
	int updateSaldoById(Double saldo, Integer id);
	
	@Transactional(readOnly=true)
	@Query(value = "select saldo FROM usuario WHERE id = ?", 
	 		nativeQuery = true)
	Optional<Double> findSaldoById(Integer id);

}
