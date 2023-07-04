package com.example.portal.controllers;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
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

import com.example.portal.models.Transacao;
import com.example.portal.models.enums.TipoTransacao;
import com.example.portal.repositories.TransacaoRepository;
import com.example.portal.repositories.UsuarioRepository;

@RestController
@RequestMapping("transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

	@Autowired
	private TransacaoRepository repository;
	@Autowired
	private UsuarioRepository usuRepository;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody Transacao transacao) {
		
		transacao.setData(LocalDateTime.now());
		processarTransacao(transacao);
		Transacao newtr = repository.save(transacao);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newtr.getId())
				.toUri();
		return ResponseEntity.created(location).body(newtr);
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		Optional<Transacao> transacao = repository.findById(id);

		if (transacao.isPresent()) {
			recuperarTransacao(transacao.get());
			repository.deleteById(id);
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}
	
	@GetMapping
	public ResponseEntity<Page<Transacao>> findAll(
			@RequestParam(required = true) Integer usuid,
			@RequestParam(required = false) LocalDateTime dataini,
			@RequestParam(required = false) LocalDateTime datafim,
			@PageableDefault(size = 4, sort = "data") Pageable pageable
	){
		if(dataini != null && datafim != null)
			return ResponseEntity.ok(repository.findAllByUsuarioIdAndDataBetween(usuid, dataini, datafim, pageable));
		
		return ResponseEntity.ok(repository.findAllByUsuarioId(usuid, pageable));
	}
	
	@GetMapping("/id")
	public ResponseEntity<?> findById(@PathVariable Integer id){
		Optional<Transacao> tr = repository.findById(id);
		
		if(tr.isPresent()) {
			return ResponseEntity.ok(tr);
		}
		else {
			return ResponseEntity.notFound().build();
		}
	}
	
	private void processarTransacao(Transacao transacao) {
		Optional<Double> saldo = usuRepository.findSaldoById(transacao.getUsuario().getId());
	    if (transacao.getTipo() == TipoTransacao.SAIDA) {
	        Double novoSaldo = saldo.get() - transacao.getValor();
	        usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());
	        
	    } else if (transacao.getTipo() == TipoTransacao.ENTRADA) {
	        Double novoSaldo = saldo.get() + transacao.getValor();
	        usuRepository.updateSaldoById(novoSaldo, transacao.getUsuario().getId());
	    }
	}
	
	private void recuperarTransacao(Transacao transacao) {
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