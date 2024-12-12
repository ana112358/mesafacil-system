package com.projetolp2.mesafacil.service;

import com.projetolp2.mesafacil.models.Restaurante;
import com.projetolp2.mesafacil.repository.RestauranteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RestauranteService {

    @Autowired
    private RestauranteRepository restauranteRepository;

    // Listar todos os restaurantes
    public List<Restaurante> listarTodos() {
        return restauranteRepository.findAll();
    }

    // Buscar restaurante por ID
    public Optional<Restaurante> buscarPorId(Long id) {
        return restauranteRepository.findById(id);
    }

    // Criar um novo restaurante
    public Restaurante criar(Restaurante restaurante) {
        return restauranteRepository.save(restaurante);
    }

    // Atualizar restaurante existente
    public Optional<Restaurante> atualizar(Long id, Restaurante detalhes) {
        return restauranteRepository.findById(id).map(restaurante -> {
            restaurante.setNome(detalhes.getNome());
            restaurante.setEmail(detalhes.getEmail());
            restaurante.setSenha(detalhes.getSenha());
            restaurante.setEndereco(detalhes.getEndereco());
            restaurante.setTelefone(detalhes.getTelefone());
            restaurante.setDescricao(detalhes.getDescricao());
            return restauranteRepository.save(restaurante);
        });
    }

    // Deletar restaurante por ID
    public boolean deletar(Long id) {
        return restauranteRepository.findById(id).map(restaurante -> {
            restauranteRepository.delete(restaurante);
            return true;
        }).orElse(false);
    }
}
