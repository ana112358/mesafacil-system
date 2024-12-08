package com.projetolp2.mesafacil.models;

import java.sql.Timestamp;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "mesas")
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

    @Column(name = "criado_em")
    @CreationTimestamp
    private Timestamp criado_em;

    @Column(name = "atualizado_em")
    @UpdateTimestamp
    private Timestamp atualizado_em;
}
