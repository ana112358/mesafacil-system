// Função para criar uma mesa e adicionar à interface
async function criarMesa(restaurante) {
    try {
        // Obtém os dados inseridos pelo usuário para a mesa
        const numeroMesa = document.getElementById('numeroMesa').value;
        const quantidadePessoas = document.getElementById('quantidadePessoas').value;

        // Verifica se os campos estão preenchidos corretamente
        if (!numeroMesa || !quantidadePessoas) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        // Cria o objeto mesa com os dados necessários
        const mesa = {
            numeracao: numeroMesa,
            quantidade_cadeiras: quantidadePessoas,
            restaurante: restaurante
        };

        // Envia a requisição para criar a mesa
        const response = await fetch('http://localhost:8080/mesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mesa)
        });

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao criar mesa: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const novaMesa = await response.json();

        // Alerta de sucesso
        alert('Mesa criada com sucesso!');

        // Chama a função para renderizar a nova mesa na interface
        adicionarMesaNaInterface(novaMesa);

    } catch (error) {
        console.error('Erro ao criar mesa:', error);
        alert('Erro ao criar mesa: ' + error.message);
    }
}

// Função para adicionar a nova mesa na interface
function adicionarMesaNaInterface(mesa) {
    const conteudoMesas = document.getElementById('conteudoMesasCadastradas');

    // Cria o elemento de mesa
    const mesaDiv = document.createElement('div');
    mesaDiv.classList.add('mesa-item');
    mesaDiv.id = `mesa-${mesa.id}`;  // Adiciona um ID único para a mesa

    mesaDiv.innerHTML = `
        <p><strong>Número da Mesa:</strong> ${mesa.numeracao}</p>
        <p><strong>Quantidade de Cadeiras:</strong> ${mesa.quantidade_cadeiras}</p>
        <button class="deletar-btn" data-id="${mesa.id}">Deletar</button>
        <button class="btn-ver-reservas" data-id="${mesa.id}">Ver Reservas</button>
    `;

    // Adiciona a nova mesa à lista de mesas na interface
    conteudoMesas.appendChild(mesaDiv);

    // Adicionar evento para o botão de deletar da nova mesa
    document.querySelectorAll('.deletar-btn').forEach(button => {
        button.addEventListener('click', async (event) => {
            const idMesa = event.target.dataset.id;
            await deletarMesa(idMesa, event.target);
        });
    });
}

// Evento para o botão de salvar a nova mesa
document.addEventListener('DOMContentLoaded', function () {
    // Recupera os dados do restaurante do localStorage
    const restaurante = JSON.parse(localStorage.getItem('restaurante'));

    // Evento de clique para criar a mesa
    document.getElementById('salvarMesaBtn').addEventListener('click', () => criarMesa(restaurante));
});
