package com.example.portal.controllers;

import java.net.URI;
import java.time.LocalDateTime;
import java.util.Optional;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.web.PageableDefault;
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
	public ResponseEntity<?> update(@RequestBody Transacao transacao) {

		Optional<Transacao> trbefore = repository.findById(transacao.getId());

		if (trbefore != null ) {

			if (transacao.getDescricao() != null)
				trbefore.get().setDescricao(transacao.getDescricao());

			if (transacao.getValor() != null) {
				
				service.atualizarTransacao(
						trbefore.get().getUsuario().getId(),
						trbefore.get().getTipo(),
						trbefore.get().getValor(),
						transacao.getValor()
				);
				trbefore.get().setValor(transacao.getValor());
			}
			
			Transacao newtr = repository.save(trbefore.get());
			return ResponseEntity.ok(modelMapper.map(newtr, TransacaoDTO.class));

		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@DeleteMapping("/{id}")
	public ResponseEntity<?> delete(@PathVariable Integer id) {
		Optional<Transacao> transacao = repository.findById(id);

		if (transacao != null) {
			service.removerTransacao(transacao.get());
			repository.deleteById(id);
			return ResponseEntity.status(204).build();
		} else {
			return ResponseEntity.notFound().build();
		}
	}

	@GetMapping
	public ResponseEntity<Page<?>> findAll(@RequestParam(required = true) Integer usuid,
			@RequestParam(required = false) LocalDateTime dataini,
			@RequestParam(required = false) LocalDateTime datafim,
			@PageableDefault(size = 4, sort = "data", direction = Direction.DESC) Pageable pageable) {
		
		if (dataini != null && datafim != null) {
			Page<Transacao> transacaoPage = repository.findAllByUsuarioIdAndDataBetween(usuid, dataini, datafim, pageable);
			return ResponseEntity.ok(transacaoPage.map(transacao -> modelMapper.map(transacao, TransacaoDTO.class)));
		}
		
		Page<Transacao> transacaoPage = repository.findAllByUsuarioId(usuid, pageable);
		return ResponseEntity.ok(transacaoPage.map(transacao -> modelMapper.map(transacao, TransacaoDTO.class)));
	}

	@GetMapping("/{id}")
	public ResponseEntity<?> findById(@PathVariable Integer id) {
		Optional<Transacao> tr = repository.findById(id);

		if (tr != null) {
			return ResponseEntity.ok(modelMapper.map(tr, TransacaoDTO.class));
		} else {
			return ResponseEntity.notFound().build();
		}
	}
}