package com.projetolp2.mesafacil.models;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Table;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Table(name = "restaurantes")
@Entity
public class Restaurante {
    public static final String TABLE_NAME = "restaurantes";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "nome", length = 255, nullable = false)
    private String nome;

    @Column(name = "descricao", length = 500)
    private String descricao;

    @Column(name = "email", length = 255, nullable = false)
    private String email;

    @Column(name = "senha", length = 255, nullable = false)
    private String senha;

    @Column(name = "endereco", length = 255, nullable = false)
    private String endereco;

    @Column(name = "telefone", length = 255, nullable = false)
    private String telefone;

    @Column(name = "criado_em", columnDefinition = "datetime")
    private LocalDateTime criado_em = LocalDateTime.now();

    @OneToMany(mappedBy = "restaurante", orphanRemoval = true)
    @JsonIgnore
    private List<Mesa> mesas;
}
