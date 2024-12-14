package com.projetolp2.mesafacil.controllers;

import com.projetolp2.mesafacil.controllers.dto.*;
import com.projetolp2.mesafacil.models.Restaurante;
import com.projetolp2.mesafacil.repositories.RestauranteRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/restaurantes")
public class RestauranteController {

    @Autowired
    private RestauranteRepository restauranteRepository;

    // Método GET para listar todos os restaurantes
    @GetMapping
    public List<Restaurante> listarTodos() {
        return restauranteRepository.findAll();
    }

    // Método GET para buscar um restaurante por ID
    @GetMapping("/{id}")
    public ResponseEntity<Restaurante> buscarPorId(@PathVariable Long id) {
        return restauranteRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @PostMapping
    public Restaurante criar(@RequestBody RestauranteInputDto restauranteInputDto) {
        Restaurante restaurante = new Restaurante();
        restaurante.setNome(restauranteInputDto.nome());
        restaurante.setEmail(restauranteInputDto.email());
        restaurante.setSenha(restauranteInputDto.senha());
        restaurante.setEndereco(restauranteInputDto.endereco());
        restaurante.setTelefone(restauranteInputDto.telefone());
        restaurante.setDescricao(restauranteInputDto.descricao());

        return restauranteRepository.save(restaurante);
    }

    // Método PUT para atualizar um restaurante existente
    @PutMapping("/{id}")
    public ResponseEntity<Restaurante> atualizar(@PathVariable Long id, @RequestBody Restaurante detalhes) {
        return restauranteRepository.findById(id).map(restaurante -> {
            restaurante.setNome(detalhes.getNome());
            restaurante.setEmail(detalhes.getEmail());
            restaurante.setSenha(detalhes.getSenha());
            restaurante.setEndereco(detalhes.getEndereco());
            restaurante.setTelefone(detalhes.getTelefone());
            restaurante.setDescricao(detalhes.getDescricao());
            return ResponseEntity.ok(restauranteRepository.save(restaurante));
        }).orElse(ResponseEntity.notFound().build());
    }

    // Método DELETE para remover um restaurante por ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deletar(@PathVariable Long id) {
        return restauranteRepository.findById(id).map(restaurante -> {
            restauranteRepository.delete(restaurante);
            return ResponseEntity.ok().<Void>build(); // Garante que o retorno é do tipo ResponseEntity<Void>
        }).orElse(ResponseEntity.notFound().build());
    }

}