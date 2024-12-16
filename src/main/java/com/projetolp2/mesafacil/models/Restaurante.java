package com.projetolp2.mesafacil.models;

import java.time.LocalDateTime;
import java.util.List;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Column;
import jakarta.persistence.OneToMany;
import jakarta.persistence.GenerationType;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "restaurantes")
@Entity
public class Restaurante {
    public interface CreateRestaurante {   
    }

    public interface UpdateRestaurante {
    }

    public static final String TABLE_NAME = "restaurantes";

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", unique = true)
    private Integer id;

    @Column(name = "nome", length = 255, nullable = false)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @Size(groups = {CreateRestaurante.class, UpdateRestaurante.class}, max = 255)
    private String nome;

    @Column(name = "descricao", length = 500)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    private String descricao;

    @Column(name = "email", length = 255, nullable = false)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @Size(groups = {CreateRestaurante.class, UpdateRestaurante.class}, max = 255)
    private String email;
 
    @Column(name = "senha", length = 255, nullable = false)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @Size(groups = {CreateRestaurante.class, UpdateRestaurante.class}, min = 8, max = 255)
    private String senha;

    @Column(name = "endereco", length = 255, nullable = false)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @Size(groups = {CreateRestaurante.class, UpdateRestaurante.class}, max = 255)
    private String endereco;

    @Column(name = "telefone", length = 255, nullable = false)
    @NotNull(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @NotEmpty(groups = {CreateRestaurante.class, UpdateRestaurante.class})
    @Size(groups = {CreateRestaurante.class, UpdateRestaurante.class}, max = 255)
    private String telefone;

    @Column(name = "criado_em", columnDefinition = "datetime")
    private LocalDateTime criado_em = LocalDateTime.now();

    @OneToMany(mappedBy = "restaurante", orphanRemoval = true)
    @JsonIgnore
    private List<Mesa> mesas;
}
