package com.example.portal.services;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.example.portal.models.Transacao;
import com.example.portal.models.dtos.TransacaoDTO;
import com.example.portal.models.enums.TipoTransacao;
import com.example.portal.repositories.TransacaoRepository;
import com.example.portal.repositories.UsuarioRepository;

@Service
public class TransacaoService {

	@Autowired
	private UsuarioRepository usuRepository;
	
	@Autowired
	private TransacaoRepository trRepository;
	
	@Autowired
	private ModelMapper modelMapper;
	
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
	
	public Map<LocalDate, List<TransacaoDTO>> BuscarTransacaoUsuPorDia(Integer usuarioId) {
		
	    Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = new HashMap<>();

	    List<Transacao> transacoesDoUsuario = trRepository.findAllByUsuarioIdOrderByDataDesc(usuarioId);

	    for (Transacao transacao : transacoesDoUsuario) {
	        LocalDate data = transacao.getData().toLocalDate(); // Extrai a parte de data do LocalDateTime

	        if (!transacoesPorDia.containsKey(data)) {
	            transacoesPorDia.put(data, new ArrayList<>());
	        }

	        transacoesPorDia.get(data).add(modelMapper.map(transacao, TransacaoDTO.class));
	    }

	    return transacoesPorDia;
	}
	
	
	public Map<LocalDate, List<TransacaoDTO>> BuscarTransacaoUsuPorDia(Integer usuarioId, TipoTransacao tipo) {
		
	    Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = new HashMap<>();

	    List<Transacao> transacoesDoUsuario = trRepository.findAllByUsuarioIdAndTipoOrderByDataDesc(usuarioId, tipo);

	    for (Transacao transacao : transacoesDoUsuario) {
	        LocalDate data = transacao.getData().toLocalDate(); // Extrai a parte de data do LocalDateTime

	        if (!transacoesPorDia.containsKey(data)) {
	            transacoesPorDia.put(data, new ArrayList<>());
	        }

	        transacoesPorDia.get(data).add(modelMapper.map(transacao, TransacaoDTO.class));
	    }

	    return transacoesPorDia;
	}
	
	public Map<LocalDate, List<TransacaoDTO>> BuscarTransacaoUsuPorDiaFiltrada(Integer usuarioId, LocalDateTime dataini, LocalDateTime datafim) {
		
	    Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = new HashMap<>();

	    List<Transacao> transacoesDoUsuario = trRepository.findAllByUsuarioIdAndDataBetweenOrderByDataDesc(usuarioId, dataini, datafim  );

	    for (Transacao transacao : transacoesDoUsuario) {
	        LocalDate data = transacao.getData().toLocalDate(); // Extrai a parte de data do LocalDateTime

	        if (!transacoesPorDia.containsKey(data)) {
	            transacoesPorDia.put(data, new ArrayList<>());
	        }

	        transacoesPorDia.get(data).add(modelMapper.map(transacao, TransacaoDTO.class));
	    }

	    return transacoesPorDia;
	}
	
	public Map<LocalDate, List<TransacaoDTO>> BuscarTransacaoUsuPorDiaFiltrada(Integer usuarioId, TipoTransacao tipo, LocalDateTime dataini, LocalDateTime datafim) {
		
	    Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = new HashMap<>();

	    List<Transacao> transacoesDoUsuario = trRepository.findAllByUsuarioIdAndTipoAndDataBetweenOrderByDataDesc(usuarioId, tipo, dataini, datafim  );

	    for (Transacao transacao : transacoesDoUsuario) {
	        LocalDate data = transacao.getData().toLocalDate(); // Extrai a parte de data do LocalDateTime

	        if (!transacoesPorDia.containsKey(data)) {
	            transacoesPorDia.put(data, new ArrayList<>());
	        }

	        transacoesPorDia.get(data).add(modelMapper.map(transacao, TransacaoDTO.class));
	    }

	    return transacoesPorDia;
	}
	
	public Double SomaTransacao(Integer usuarioId, TipoTransacao tipo, LocalDateTime dataini, LocalDateTime datafim) {
		List<Transacao> transacoes = trRepository.findAllByUsuarioIdAndTipoAndDataBetweenOrderByDataDesc(usuarioId, tipo, dataini, datafim  );
		Double somaValores = transacoes.stream().mapToDouble(Transacao::getValor).sum();
		return somaValores;
	}

}
