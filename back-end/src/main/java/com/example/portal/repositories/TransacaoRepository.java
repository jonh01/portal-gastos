package com.example.portal.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.portal.models.Transacao;
import com.example.portal.models.enums.TipoTransacao;

public interface TransacaoRepository extends JpaRepository<Transacao, Integer> {
	
	List<Transacao> findAllByUsuarioIdOrderByDataDesc(Integer usuarioId);
	
	List<Transacao> findAllByUsuarioIdAndDataBetweenOrderByDataDesc(Integer usuarioId, LocalDateTime dataini, LocalDateTime datafim);
	
	List<Transacao> findAllByUsuarioIdAndTipoOrderByDataDesc(Integer usuarioId, TipoTransacao tipo);
	
	List<Transacao> findAllByUsuarioIdAndTipoAndDataBetweenOrderByDataDesc(Integer usuarioId, TipoTransacao tipo, LocalDateTime dataini, LocalDateTime datafim);
}
