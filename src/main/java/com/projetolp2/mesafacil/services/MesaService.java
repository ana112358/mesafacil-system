package com.projetolp2.mesafacil.services;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.projetolp2.mesafacil.models.Mesa;
import com.projetolp2.mesafacil.repositories.MesaRepository;

@Service
public class MesaService {
    private final MesaRepository mesaRepository;

    public MesaService(MesaRepository mesaRepository) {
        this.mesaRepository = mesaRepository;
    }

    public List<Mesa> getAllMesas() {
        return mesaRepository.findAll();
    }

    public Optional<Mesa> getMesaById(Integer id) {
        return mesaRepository.findById(id);
    }

    public Mesa createMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public void deleteMesa(Integer id) {
        mesaRepository.deleteById(id);
    }
}
