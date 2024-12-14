package com.projetolp2.mesafacil.controllers.dto;

// DTO para entrada de dados (input)
public record RestauranteInputDto(
                String nome,
                String email,
                String senha,
                String endereco,
                String telefone,
                String descricao) {
}
