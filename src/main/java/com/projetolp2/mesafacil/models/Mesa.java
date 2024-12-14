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
@Table(name = "mesas")
@Getter
@Setter
public class Mesa {
    public static final String TABLE_NAME = "mesas";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "disponivel")
    private Boolean disponivel = true;

    @Column(name = "vip")
    private Boolean vip = false;

    @Column(name = "quantidade_cadeiras")
    private Integer quantidade_cadeiras;

    @Column(name = "criado_em", columnDefinition = "datetime")
    private LocalDateTime criado_em;

    @Column(name = "atualizado_em", columnDefinition = "datetime")
    private LocalDateTime atualizado_em;

    @ManyToOne
    @JoinColumn(name = "restaurante_id", nullable = false)
    private Restaurante restaurante;

    public Mesa() {
    }

    public Mesa(Boolean disponivel, Boolean vip, Integer quantidade_cadeiras) {
        this.disponivel = disponivel;
        this.vip = vip;
        this.quantidade_cadeiras = quantidade_cadeiras;
        this.criado_em = LocalDateTime.now();
        this.atualizado_em = LocalDateTime.now();
    }
}
