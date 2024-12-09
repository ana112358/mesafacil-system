package com.projetolp2.mesafacil.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.projetolp2.mesafacil.models.Reserva;

@Repository
public interface ReservaRepository extends JpaRepository<Reserva, Integer> {

}
