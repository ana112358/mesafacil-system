package com.projetolp2.mesafacil.repositories;

import org.springframework.stereotype.Repository;

import com.projetolp2.mesafacil.models.Mesa;
import com.projetolp2.mesafacil.models.Restaurante;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    List<Mesa> findByRestauranteId(Integer restauranteId);
}