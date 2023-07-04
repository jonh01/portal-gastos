package com.example.portal.repositories;

import java.time.LocalDateTime;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.transaction.annotation.Transactional;

import com.example.portal.models.Transacao;

public interface TransacaoRepository extends JpaRepository<Transacao, Integer> {
	
	Page<Transacao> findAllByUsuarioId(Integer usuarioId, Pageable pageable);
	
	@Transactional(readOnly=true)
    Page<Transacao> findAllByUsuarioIdAndDataBetween(Integer usuarioId, LocalDateTime dataini, LocalDateTime datafim, Pageable pageable);
}
