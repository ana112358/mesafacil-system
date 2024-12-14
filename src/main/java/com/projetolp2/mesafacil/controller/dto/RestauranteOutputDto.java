package com.projetolp2.mesafacil.controller.dto;

public record RestauranteOutputDto(
        Long id,
        String nome,
        String email,
        String endereco,
        String telefone,
        String descricao
) { }