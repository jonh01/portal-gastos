package com.example.portal.services;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.portal.models.Transacao;
import com.example.portal.models.enums.TipoTransacao;
import com.example.portal.repositories.UsuarioRepository;

@Service
public class TransacaoService {

	@Autowired
	private UsuarioRepository usuRepository;
	
	public void processarTransacao(Transacao transacao) {
		Optional<Double> saldo = usuRepository.findSaldoById(transacao.getUsuario().getId());
		if (transacao.getTipo() == TipoTransacao.SAIDA) {
			Double novoSaldo = saldo.get() - transacao.getValor();
			usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());

		} else if (transacao.getTipo() == TipoTransacao.ENTRADA) {
			Double novoSaldo = saldo.get() + transacao.getValor();
			usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());
		}
	}
	
	public void atualizarTransacao(Integer usuId, TipoTransacao tipo, Double beforeValue, Double afterValue) {
		
		Double dif = afterValue >= beforeValue?(afterValue - beforeValue):
			(beforeValue - afterValue);
		
		if(tipo.equals(TipoTransacao.ENTRADA)) {
			Optional<Double> saldo = usuRepository.findSaldoById(usuId);
			Double novoSaldo = afterValue >= beforeValue? saldo.get() + dif: saldo.get() - dif;
			usuRepository.updateSaldoById(novoSaldo, usuId);
			
		}else if(tipo.equals(TipoTransacao.SAIDA)) {
			Optional<Double> saldo = usuRepository.findSaldoById(usuId);
			Double novoSaldo = afterValue >= beforeValue? saldo.get() - dif: saldo.get() + dif;
			usuRepository.updateSaldoById(novoSaldo, usuId);
		}
	}

	public void removerTransacao(Transacao transacao) {
		Optional<Double> saldo = usuRepository.findSaldoById(transacao.getUsuario().getId());
		if (transacao.getTipo() == TipoTransacao.SAIDA) {
			Double novoSaldo = saldo.get() + transacao.getValor();
			usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());

		} else if (transacao.getTipo() == TipoTransacao.ENTRADA) {
			Double novoSaldo = saldo.get() - transacao.getValor();
			usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());
		}
	}

}
