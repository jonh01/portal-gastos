package com.example.portal.controllers;

import java.net.URI;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;

import org.modelmapper.ModelMapper;
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

import com.example.portal.models.Transacao;
import com.example.portal.models.dtos.TransacaoDTO;
import com.example.portal.models.enums.TipoTransacao;
import com.example.portal.repositories.TransacaoRepository;
import com.example.portal.services.TransacaoService;

@RestController
@RequestMapping("transacoes")
@CrossOrigin(origins = "*")
public class TransacaoController {

	@Autowired
	private TransacaoRepository repository;
	
	@Autowired
	private TransacaoService service;
	
	@Autowired
	private ModelMapper modelMapper;

	@PostMapping
	public ResponseEntity<?> create(@RequestBody TransacaoDTO transacao) {

		transacao.setData(LocalDateTime.now());
		Transacao transacaoFormart = modelMapper.map(transacao, Transacao.class);
		service.processarTransacao(transacaoFormart);
		Transacao newtr = repository.save(transacaoFormart);
		URI location = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(newtr.getId())
				.toUri();
		return ResponseEntity.created(location).body(modelMapper.map(newtr, TransacaoDTO.class));
	}

	@PutMapping
	public ResponseEntity<?> update(@RequestBody TransacaoDTO transacao) {

		Optional<Transacao> trbefore = repository.findById(transacao.getId());
		int att = 0;

		if (trbefore.isPresent()) {

			if (transacao.getDescricao() != null) {
				trbefore.get().setDescricao(transacao.getDescricao());
				att++;
			}

			if (transacao.getValor() != null) {
				
				service.atualizarTransacao(
						trbefore.get().getUsuario().getId(),
						trbefore.get().getTipo(),
						trbefore.get().getValor(),
						transacao.getValor()
				);
				trbefore.get().setValor(transacao.getValor());
				att++;
			}
			
			if(att == 0)
				return ResponseEntity.ok("Nada foi atualizado!");
			else {
				Transacao newtr = repository.save(trbefore.get());
				return ResponseEntity.ok(modelMapper.map(newtr, TransacaoDTO.class));
			}

		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		Optional<Transacao> transacao = repository.findById(id);

		if (transacao.isPresent()) {
			service.removerTransacao(transacao.get());
			repository.deleteById(id);
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public ResponseEntity<?> findAll(@RequestParam(required = true) Integer usuid,
			@RequestParam(required = false) LocalDate dataini,
			@RequestParam(required = false) LocalDate datafim,
			@RequestParam(required = false) TipoTransacao tipo) {
		
		if (dataini != null && datafim != null) {
			 LocalDateTime datainiTime = dataini.atTime(00, 00);
			 LocalDateTime datafimTime = datafim.atTime(00, 00);
			 
			 if(tipo == null) {
				 Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = service.BuscarTransacaoUsuPorDiaFiltrada(usuid, datainiTime, datafimTime);
				return ResponseEntity.ok(transacoesPorDia);
			 }
			Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = service.BuscarTransacaoUsuPorDiaFiltrada(usuid, tipo, datainiTime, datafimTime);
			return ResponseEntity.ok(transacoesPorDia);
		}
		
		if(tipo == null) {
			Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = service.BuscarTransacaoUsuPorDia(usuid);
			return ResponseEntity.ok(transacoesPorDia);
		 }
		
		Map<LocalDate, List<TransacaoDTO>> transacoesPorDia = service.BuscarTransacaoUsuPorDia(usuid, tipo);
		return ResponseEntity.ok(transacoesPorDia);
		
	}
	
	@GetMapping("/soma")
	public ResponseEntity<?> Soma(@RequestParam(required = true) Integer usuid,
			@RequestParam(required = true) LocalDate dataini,
			@RequestParam(required = true) LocalDate datafim,
			@RequestParam(required = true) TipoTransacao tipo) {
		
		LocalDateTime datainiTime = dataini.atTime(00, 00);
		LocalDateTime datafimTime = datafim.atTime(00, 00);
		
		Double soma = service.SomaTransacao(usuid, tipo, datainiTime, datafimTime);
		return ResponseEntity.ok(soma);
		
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Transacao> tr = repository.findById(id);

		if (tr.isPresent()) {
			return ResponseEntity.ok(modelMapper.map(tr.get(), TransacaoDTO.class));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}