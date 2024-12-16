document.addEventListener('DOMContentLoaded', carregarMesas);

async function carregarMesas() {
    try {
        const restauranteStage = JSON.parse(localStorage.getItem('restaurante'));
        if (!restauranteStage) {
            throw new Error('Nenhum restaurante logado.');
        }

        const response = await fetch(`http://localhost:8080/mesas/${restauranteStage.id}`);
        if (!response.ok) {
            throw new Error('Erro ao buscar mesas: ' + response.statusText);
        }

        const mesa = await response.json();  // Agora é um único objeto mesa
        console.log(mesa); // Veja a estrutura do objeto mesa para garantir que é o esperado.

        // Limpar o conteúdo antes de renderizar
        const conteudoMesas = document.getElementById('conteudoMesasCadastradas');
        conteudoMesas.innerHTML = '';

        // Verifique se a resposta é uma mesa única ou se é um array de mesas
        if (Array.isArray(mesa)) {
            mesa.forEach(m => {
                renderizarMesa(m, conteudoMesas);
            });
        } else {
            renderizarMesa(mesa, conteudoMesas);
        }

        // Adicionar evento para os botões de deletar
        document.querySelectorAll('.deletar-btn').forEach(button => {
            button.addEventListener('click', async (event) => {
                const idMesa = event.target.dataset.id;
                await deletarMesa(idMesa);
            });
        });

    } catch (error) {
        console.error('Erro ao carregar mesas:', error);
    }
}

function renderizarMesa(mesa, conteudoMesas) {
    const mesaDiv = document.createElement('div');
    mesaDiv.classList.add('mesa-item');

    mesaDiv.innerHTML = `
        <p><strong>Número da Mesa:</strong> ${mesa.numeracao}</p>
        <p><strong>Quantidade de Cadeiras:</strong> ${mesa.quantidade_cadeiras}</p>
        <button class="deletar-btn" data-id="${mesa.id}">Deletar</button>
    `;

    conteudoMesas.appendChild(mesaDiv);
}
