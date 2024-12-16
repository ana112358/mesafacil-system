package com.projetolp2.mesafacil.controllers;

import java.net.URI;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projetolp2.mesafacil.models.Mesa;
import com.projetolp2.mesafacil.models.Reserva;
import com.projetolp2.mesafacil.models.Reserva.UpdateReserva;
import com.projetolp2.mesafacil.models.Reserva.CreateReserva;
import com.projetolp2.mesafacil.services.ReservaService;
import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/reservas")
@Validated
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping
    public ResponseEntity<List<Reserva>> findAll() {
        List<Reserva> lista = this.reservaService.findAll();
        return ResponseEntity.ok().body(lista);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> findById(@PathVariable Integer id) {
        Reserva obj = this.reservaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }

    @GetMapping("/mesa/{id}")
    public List<Reserva> getReservasByMesaId(@PathVariable Integer id) {
        return reservaService.getReservasByMesaId(id);
    }

    @PostMapping
    @Validated(CreateReserva.class)
    public ResponseEntity<Void> create(@Valid @RequestBody Reserva obj) {
        this.reservaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
                .path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    @Validated(UpdateReserva.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Reserva obj, @PathVariable Integer id) {
        obj.setId(id);
        this.reservaService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        this.reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
