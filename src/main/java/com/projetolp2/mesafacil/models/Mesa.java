package com.projetolp2.mesafacil.models;

import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
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

    @Column(name = "numeracao", nullable = false)
    private Integer numeracao;

    @Column(name = "quantidade_cadeiras", nullable = false)
    private Integer quantidade_cadeiras;

    @Column(name = "criado_em", columnDefinition = "datetime")
    private LocalDateTime criado_em;

    @ManyToOne
    @JoinColumn(name = "id_restaurante", nullable = false)
    private Restaurante restaurante;

    @OneToMany(mappedBy = "mesa")
    @JsonIgnore
    private List<Reserva> reservas;
}
