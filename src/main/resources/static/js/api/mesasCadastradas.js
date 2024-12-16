document.addEventListener('DOMContentLoaded', carregarMesas);

async function carregarMesas() {
    try {
        const restauranteStage = JSON.parse(localStorage.getItem('restaurante'));
        if (!restauranteStage) {
            throw new Error('Nenhum restaurante logado.');
        }

        const response = await fetch(`http://localhost:8080/mesas/restaurante/${restauranteStage.id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar mesas: ' + response.statusText);
        }

        const mesas = await response.json();  // Agora deve retornar um array de mesas
        console.log("mesas:", mesas); // Veja a estrutura do objeto mesas para garantir que é o esperado.

        // Limpar o conteúdo antes de renderizar
        const conteudoMesas = document.getElementById('conteudoMesasCadastradas');
        conteudoMesas.innerHTML = '';
        console.log("mesas2:", mesas);

        // Verifique se a resposta é uma mesa única ou se é um array de mesas
        if (Array.isArray(mesas)) {
            mesas.forEach(mesa => {
                renderizarMesa(mesa, conteudoMesas);
            });
        } else {
            renderizarMesa(mesas, conteudoMesas);
        }

        // Adicionar evento para os botões de deletar
        document.querySelectorAll('.deletar-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const idMesa = event.target.dataset.id;
                await deletarMesa(idMesa, event.target);
                document.getElementById("reservasMesa").innerHTML = "";
            });
        });

        document.querySelectorAll('.btn-ver-reservas').forEach(button => {
            button.addEventListener('click', async (event) => {
                const idMesa = event.target.dataset.id;
                const divReservas = document.getElementById("reservasMesa");
                const reservas = await getReservasByMesa(idMesa);

                if (!reservas || reservas.length === 0) {
                    divReservas.innerHTML = "<p>Não há reservas para esta mesa.</p>";
                } else {
                    renderReservasHTML(reservas, divReservas);
                }

                setTimeout(() => {

                    document.querySelectorAll('.delete-reserva').forEach(button => {
                        button.addEventListener('click', async (event) => {
                            const idReserva = event.target.dataset.id;
                            await deletarReserva(idReserva);
                        });
                    })

                }, 500);
            });
        });

    } catch (error) {
        console.error('Erro ao carregar mesas:', error);
    }
}

function renderizarMesa(mesa, conteudoMesas) {
    const mesaDiv = document.createElement('div');
    mesaDiv.classList.add('mesa-item');
    mesaDiv.id = `mesa-${mesa.id}`;  // Adiciona um ID único para cada mesa no DOM

    mesaDiv.innerHTML = `
        <p><strong>Número da Mesa:</strong> ${mesa.numeracao}</p>
        <p><strong>Quantidade de Cadeiras:</strong> ${mesa.quantidade_cadeiras}</p>
        <button class="deletar-btn" data-id="${mesa.id}">Deletar</button>
        <button class="btn-ver-reservas" data-id="${mesa.id}">Ver Reservas</button>
    `;

    conteudoMesas.appendChild(mesaDiv);
}

function renderReservasHTML(reservas, divReservas) {
    divReservas.innerHTML = "";

    reservas.forEach(reserva => {
        const horario_inicio = new Date(reserva.horario_inicio).toLocaleTimeString();
        const horario_final = new Date(reserva.horario_final).toLocaleTimeString();

        let appendHTML = `
            <div id="reserva-${reserva.id}" class="reservaOcupada">
                <p class="horario">Horário inicio: ${horario_inicio}</p>|
                <p class="horario">Horário final:  ${horario_final}</p>|
                <p class="ocupado">Ocupado por: ${reserva.nome_cliente}</p>
                <button class="delete-reserva" data-id="${reserva.id}">Deletar</button>
            </div>
        `;

        divReservas.innerHTML = divReservas.innerHTML + appendHTML;
    });
}

async function getReservasByMesa(idMesa) {
    const url = "http://localhost:8080/reservas/mesa/" + idMesa;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;

    } catch (error) {
        console.log(error.message);
    }
}

async function deletarReserva(idReserva) {
    try {
        // Envia a requisição DELETE para o servidor
        const response = await fetch(`http://localhost:8080/reservas/${idReserva}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar reserva: ' + response.statusText);
        }

        // Se a exclusão for bem-sucedida, remove a mesa da interface
        alert('Reseva deletada com sucesso!');

        // Remover o elemento da mesa do DOM imediatamente
        const reservaDiv = document.getElementById(`reserva-${idReserva}`);
        if (reservaDiv) {
            reservaDiv.remove();
        }

    } catch (error) {
        console.error('Erro ao deletar mesa:', error);
        alert('Erro ao deletar mesa: ' + error.message);
    }
}

async function deletarMesa(idMesa, botaoDeletar) {
    try {
        // Verificar se a mesa tem reservas associadas
        const reservasResponse = await fetch(`http://localhost:8080/reservas/mesa/${idMesa}`, {
            method: 'GET'

        });

        console.log(reservasResponse)
        if (!reservasResponse.ok) {
            throw new Error('Erro ao verificar reservas: ' + reservasResponse.statusText);
        }

        const reservas = await reservasResponse.json();

        // Se houver reservas, não permitir a exclusão
        if (reservas && reservas.length > 0) {
            alert('Não é possível deletar a mesa, pois ela ainda possui reservas.');
            return;  // Não prosseguir com a exclusão
        }

        // Envia a requisição DELETE para o servidor
        const response = await fetch(`http://localhost:8080/mesas/${idMesa}`, {
            method: 'DELETE'
        });

        if (!response.ok) {
            throw new Error('Erro ao deletar mesa: ' + response.statusText);
        }

        // Se a exclusão for bem-sucedida, remove a mesa da interface
        alert('Mesa deletada com sucesso!');

        // Remover o elemento da mesa do DOM imediatamente
        const mesaDiv = document.getElementById(`mesa-${idMesa}`);
        if (mesaDiv) {
            mesaDiv.remove();
        }

    } catch (error) {
        console.error('Erro ao deletar mesa:', error);
        alert('Erro ao deletar mesa: ' + error.message);
    }
}

