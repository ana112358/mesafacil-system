package com.projetolp2.mesafacil.models;

import java.time.LocalDateTime;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.validation.constraints.NotEmpty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "reservas")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Reserva {
    public interface CreateReserva {   
    }

    public interface UpdateReserva {
    }

    public static final String TABLE_NAME = "reservas";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "nome_cliente", length = 255, nullable = false)
    @NotNull(groups = {CreateReserva.class, UpdateReserva.class})
    @NotEmpty(groups = {CreateReserva.class, UpdateReserva.class})
    @Size(groups = {CreateReserva.class, UpdateReserva.class}, max = 255)
    private String nome_cliente;

    @Column(name = "horario_inicio", nullable = false, columnDefinition = "datetime")
    @NotNull(groups = {CreateReserva.class, UpdateReserva.class})
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime horario_inicio;

    @Column(name = "horario_final", nullable = false, columnDefinition = "datetime")
    @NotNull(groups = {CreateReserva.class, UpdateReserva.class})
    @JsonFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss", shape = JsonFormat.Shape.STRING)
    private LocalDateTime horario_final;

    @Column(name = "criado_em", nullable = false, columnDefinition = "datetime")
    @NotNull(groups = {CreateReserva.class, UpdateReserva.class})
    private LocalDateTime criado_em = LocalDateTime.now();

    @ManyToOne
    @JoinColumn(name = "id_mesa", nullable = false, updatable = false)
    @NotNull(groups = {CreateReserva.class, UpdateReserva.class})
    private Mesa mesa;
}
