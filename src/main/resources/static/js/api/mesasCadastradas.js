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
                console.log("id da mesa:", idMesa)
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
    `;

    conteudoMesas.appendChild(mesaDiv);
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

