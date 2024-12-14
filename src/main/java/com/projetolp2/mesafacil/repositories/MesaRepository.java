package com.projetolp2.mesafacil.repositories;

import org.springframework.stereotype.Repository;

import com.projetolp2.mesafacil.models.Mesa;

import org.springframework.data.jpa.repository.JpaRepository;

@Repository
public interface MesaRepository extends JpaRepository<Mesa, Integer> {
    
}
