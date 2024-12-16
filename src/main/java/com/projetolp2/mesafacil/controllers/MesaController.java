package com.projetolp2.mesafacil.controllers;

import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import com.projetolp2.mesafacil.models.Mesa;
import com.projetolp2.mesafacil.models.Mesa.CreateMesa;
import com.projetolp2.mesafacil.models.Mesa.UpdateMesa;
import com.projetolp2.mesafacil.services.MesaService;
import jakarta.validation.Valid;
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

    @GetMapping("/restaurante/{id}")
    public List<Mesa> getMesasByRestauranteId(@PathVariable Integer id) {
        return mesaService.getMesasByRestauranteId(id);
    }

    @PostMapping
    @Validated(CreateMesa.class)
    public Mesa createMesa(@Valid @RequestBody Mesa mesa) {
        return mesaService.createMesa(mesa);
    }

    @PutMapping("/{id}")
    @Validated(UpdateMesa.class)
    public ResponseEntity<Void> update(@Valid @RequestBody Mesa obj, @PathVariable Integer id) {
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
