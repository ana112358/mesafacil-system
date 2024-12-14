package com.projetolp2.mesafacil.models;

import java.time.LocalDateTime;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "reservas")
@Getter
@Setter
public class Reserva {
    public static final String TABLE_NAME = "reservas";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @ManyToOne
    @JoinColumn(name = "id_mesa", nullable = false, updatable = false)
    private Mesa mesa;

    // private Integer id_cliente;

    @Column(name = "nome_cliente", length = 255 , nullable = false)
    private String nome_cliente;

    @Column(name = "horario_inicio", nullable = false, columnDefinition = "datetime")
    private LocalDateTime horario_inicio;

    @Column(name = "horario_final", nullable = false, columnDefinition = "datetime")
    private LocalDateTime horario_final;

    @Column(name = "criado_em", nullable = false, columnDefinition = "datetime")
    private LocalDateTime criado_em;

    @Column(name = "atualizado_em", nullable = false, columnDefinition = "datetime")
    private LocalDateTime atualizado_em;
}
