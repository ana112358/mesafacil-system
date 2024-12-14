package com.projetolp2.mesafacil.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.projetolp2.mesafacil.models.Mesa;
import com.projetolp2.mesafacil.services.MesaService;

import java.util.List;

@RestController
@RequestMapping("/mesas")
public class MesaController {

    private final MesaService mesaService;

    public MesaController(MesaService mesaService) {
        this.mesaService = mesaService;
    }

    @GetMapping
    public List<Mesa> getAllMesas() {
        return mesaService.getAllMesas();
    }

    @GetMapping("/{id}")
    public ResponseEntity<Mesa> getMesaById(@PathVariable Integer id) {
        Mesa obj = mesaService.getMesaById(id);
        return ResponseEntity.ok().body(obj);
    }

    @PostMapping
    public Mesa createMesa(@RequestBody Mesa mesa) {
        return mesaService.createMesa(mesa);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Void> update(@RequestBody Mesa obj, @PathVariable Integer id) {
        obj.setId(id);
        mesaService.update(obj);
        return ResponseEntity.noContent().build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMesa(@PathVariable Integer id) {
        mesaService.deleteMesa(id);
        return ResponseEntity.noContent().build();
    }
}
