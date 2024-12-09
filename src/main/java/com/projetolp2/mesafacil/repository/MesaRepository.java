package com.projetolp2.mesafacil.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.projetolp2.mesafacil.model.Mesa;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Long> {
    // Métodos personalizados podem ser adicionados aqui, se necessário
}
