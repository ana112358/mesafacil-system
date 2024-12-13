# MesaFácil System

## Sobre o Projeto

O **MesaFácil System** é uma solução para gerenciamento de reservas em restaurantes. Ele permite que restaurantes cadastrem mesas e horários disponíveis, enquanto clientes podem fazer reservas de forma simples, sem a necessidade de criar uma conta.

O sistema é composto por um back-end robusto desenvolvido em **Spring Boot** e um front-end intuitivo construído com **HTML**, **CSS**, e **JavaScript**.

---
## Funcionalidades

### Para Restaurantes:
- Cadastro de mesas e horários disponíveis.
- Gestão das reservas diretamente no sistema.

### Para Clientes:
- Reserva de mesas sem necessidade de login.
- Simplicidade ao preencher dados como **nome**, **e-mail**, e **telefone** para contato.
- Visualização de mesas e horários disponíveis em tempo real.

---
## Tecnologias Utilizadas

### Back-End:
- **Linguagem**: Java com Spring Boot.
- **Banco de Dados**: Hospedagem em [Free MySQL Hosting](https://www.freemysqlhosting.net/).
- **API Rest**: Construída para comunicação entre o front-end e o back-end.

### Front-End:
- **HTML**: Estrutura das páginas.
- **CSS**: Estilo e responsividade.
- **JavaScript**: Dinâmica e interação com a API.

---

## Entidade `Restaurante`

A entidade **Restaurante** representa um restaurante que pode registrar suas mesas e gerenciar reservas. Cada restaurante tem informações sobre seu nome, dados de contato, endereço, descrição, e uma lista de mesas associadas.

### Atributos:
- **`id` (Long):** Identificador único do restaurante.
- **`nome` (String):** Nome do restaurante.
- **`email` (String):** E-mail do restaurante, deve ser único no sistema.
- **`senha` (String):** Senha do restaurante para login no sistema.
- **`endereco` (String):** Endereço físico do restaurante.
- **`telefone` (String):** Número de telefone do restaurante.

## Entidade `Mesa`

A entidade **Mesa** representa as mesas disponíveis em cada restaurante. Cada mesa contém as seguintes informações:

### Atributos:
- **`id` (Integer):** Identificador único da mesa.
- **`disponivel` (Boolean):** Indica se a mesa está disponível para reserva. Valor padrão: `true`.
- **`quantidade_cadeiras` (Integer):** Número de cadeiras disponíveis na mesa.
- **`criado_em` (LocalDateTime):** Data e hora de criação do registro.
- **`atualizado_em` (LocalDateTime):** Data e hora da última atualização do registro.

## Entidade `Reserva`

A entidade **Reserva** representa as reservas feitas para as mesas disponíveis em um restaurante. Uma reserva está diretamente associada a uma mesa.

### Atributos:
- **`id` (Long):** Identificador único da reserva.
- **`nome_cliente` (String):** Nome do cliente que fez a reserva. Caso esteja vazio, a mesa está disponível.
- **`horario_inicio` (LocalDateTime):** Horário de início da reserva.
- **`horario_fim` (LocalDateTime):** Horário de término da reserva.
- **`criado_em` (LocalDateTime):** Data e hora de criação do registro.
- **`atualizado_em` (LocalDateTime):** Data e hora da última atualização do registro.
- **`mesa` (Mesa):** Referência à mesa associada à reserva (relacionamento `Many-to-One`).

---
### Relacionamento com a Entidade `Mesa`:
- **`mesas` (List<Mesa>):** Lista de mesas registradas pelo restaurante. Este é um relacionamento `One-to-Many`, onde um restaurante pode ter várias mesas associadas a ele.
  - A anotação **`@OneToMany`** define que um restaurante pode ter múltiplas mesas.
  - **`mappedBy = "restaurante"`** indica que o campo `restaurante` na classe `Mesa` é responsável pela associação inversa.
  - **`cascade = CascadeType.ALL`** permite que todas as operações realizadas no restaurante (como persistência, atualização e exclusão) sejam propagadas para suas mesas associadas.
  - **`orphanRemoval = true`** garante que, ao remover uma mesa da lista de mesas do restaurante, ela seja removida automaticamente do banco de dados, caso não tenha mais nenhuma referência.

### Função Principal:
A classe **Restaurante** permite que o restaurante registre suas mesas e gerencie os dados de contato e operação. Cada restaurante tem uma lista de mesas associadas, e cada mesa pode ter várias reservas. O restaurante tem controle total sobre suas mesas e pode determinar a disponibilidade para reserva.

## Relacionamento entre `Mesa` e `Reserva`

O relacionamento entre as entidades **Mesa** e **Reserva** é do tipo `One-to-Many` e `Many-to-One`:
- **Uma mesa pode ter várias reservas associadas a ela.**
- **Cada reserva está associada a apenas uma mesa.**

---

## Regras de Negócio

1. **Associação de Mesas e Reservas:**
   - Cada restaurante pode registrar suas mesas disponíveis.
   - Para cada mesa registrada, um conjunto de reservas pode ser configurado.
   - Reservas sem nome de cliente estão disponíveis para novos agendamentos.

2. **Gestão de Disponibilidade:**
   - Uma mesa é considerada ocupada quando há uma reserva ativa para ela (nome do cliente preenchido e horário atual dentro do intervalo de reserva).

---
