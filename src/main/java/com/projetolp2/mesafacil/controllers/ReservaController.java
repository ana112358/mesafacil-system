package com.projetolp2.mesafacil.controllers;

import java.net.URI;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import com.projetolp2.mesafacil.models.Reserva;
import com.projetolp2.mesafacil.services.ReservaService;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("/reserva")
@Validated
public class ReservaController {
    @Autowired
    private ReservaService reservaService;

    @GetMapping("/{id}")
    public ResponseEntity<Reserva> findById(@PathVariable Integer id){
        Reserva obj = this.reservaService.findById(id);
        return ResponseEntity.ok().body(obj);
    }
    
    @PostMapping
    public ResponseEntity<Void> create(@RequestBody Reserva obj) {
        this.reservaService.create(obj);
        URI uri = ServletUriComponentsBuilder.fromCurrentRequest()
        .path("/{id}").buildAndExpand(obj.getId()).toUri();
        return ResponseEntity.created(uri).build();
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@RequestBody Reserva obj, @PathVariable Integer id) {
        obj.setId(id);
        this.reservaService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id){
        this.reservaService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
