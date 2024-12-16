package com.projetolp2.mesafacil.services;

import java.util.Optional;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.projetolp2.mesafacil.models.Reserva;
import com.projetolp2.mesafacil.repositories.ReservaRepository;
import jakarta.transaction.Transactional;

@Service
public class ReservaService {
    @Autowired
    private ReservaRepository reservaRepository;

    public List<Reserva> findAll() {
        return reservaRepository.findAll();
    }

    public Reserva findById(Integer id) {
        Optional<Reserva> reserva = this.reservaRepository.findById(id);
        return reserva.orElseThrow(() -> new RuntimeException(
                "Reserva não encontrada. ID: " + id + ", Tipo: " + Reserva.class.getName()));
    }

    public List<Reserva> getReservasByMesaId(Integer idMesa) {
        return reservaRepository.findByMesaId(idMesa);
    }

    @Transactional
    public Reserva create(Reserva obj) {
        obj.setId(null);
        obj = this.reservaRepository.save(obj);
        return obj;
    }

    public Reserva update(Reserva obj) {
        Reserva newObj = findById(obj.getId());
        newObj.setNome_cliente(obj.getNome_cliente());
        newObj.setHorario_inicio(obj.getHorario_inicio());
        newObj.setHorario_final(obj.getHorario_final());
        return this.reservaRepository.save(newObj);
    }

    public void delete(Integer id) {
        findById(id);
        try {
            this.reservaRepository.deleteById(id);
        } catch (Exception e) {
            throw new RuntimeException("Não foi possível excluir a reserva.");
        }
    }
}
