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

    public Mesa getMesaById(Integer id) {
        Optional<Mesa> mesa = mesaRepository.findById(id);
        return mesa.orElseThrow(() -> new RuntimeException(
                "Reserva não encontrada. ID: " + id + ", Tipo: " + Mesa.class.getName()));
    }

    public List<Mesa> getMesasByRestauranteId(Integer idRestaurante) {
        return mesaRepository.findByRestauranteId(idRestaurante);
    }

    public Mesa createMesa(Mesa mesa) {
        return mesaRepository.save(mesa);
    }

    public Mesa update(Mesa obj) {
        Mesa newObj = getMesaById(obj.getId());
        newObj.setNumeracao(obj.getNumeracao());
        newObj.setQuantidade_cadeiras(obj.getQuantidade_cadeiras());
        return mesaRepository.save(newObj);
    }

    public void deleteMesa(Integer id) {
        mesaRepository.deleteById(id);
    }
}
