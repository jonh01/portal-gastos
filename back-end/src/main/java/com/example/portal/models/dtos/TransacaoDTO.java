package com.example.portal.models.dtos;

import java.time.LocalDateTime;

import com.example.portal.models.enums.TipoTransacao;

public class TransacaoDTO {
	
	private Integer id;
    private String descricao;
    private Double valor;
    private LocalDateTime data;
    private TipoTransacao tipo;
    private Integer usuarioId;
    
    public TransacaoDTO() {
		// TODO Auto-generated constructor stub
	}

	public TransacaoDTO(Integer id, String descricao, Double valor, LocalDateTime data, TipoTransacao tipo,
			Integer usuarioId) {
		this.id = id;
		this.descricao = descricao;
		this.valor = valor;
		this.data = data;
		this.tipo = tipo;
		this.usuarioId = usuarioId;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getDescricao() {
		return descricao;
	}

	public void setDescricao(String descricao) {
		this.descricao = descricao;
	}

	public Double getValor() {
		return valor;
	}

	public void setValor(Double valor) {
		this.valor = valor;
	}

	public LocalDateTime getData() {
		return data;
	}

	public void setData(LocalDateTime data) {
		this.data = data;
	}

	public TipoTransacao getTipo() {
		return tipo;
	}

	public void setTipo(TipoTransacao tipo) {
		this.tipo = tipo;
	}

	public Integer getUsuarioId() {
		return usuarioId;
	}

	public void setUsuarioId(Integer usuarioId) {
		this.usuarioId = usuarioId;
	}
    
}
