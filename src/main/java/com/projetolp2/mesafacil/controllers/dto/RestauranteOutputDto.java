package com.projetolp2.mesafacil.controllers.dto;

public record RestauranteOutputDto(
                Long id,
                String nome,
                String email,
                String senha,
                String endereco,
                String telefone,
                String descricao) {
}