// Função para criar uma mesa
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
            restaurante : restaurante
        };

        console.log("mesa:",mesa)

        // Envia a requisição para criar a mesa
        const response = await fetch('http://localhost:8080/mesas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(mesa)
        });
        console.log("response is: ", response)

        // Verifica se a resposta foi bem-sucedida
        if (!response.ok) {
            throw new Error('Erro ao criar mesa: ' + response.statusText);
        }

        // Converte a resposta para JSON
        const data = await response.json();

        // Alerta de sucesso
        alert('Mesa criada com sucesso!');

        // Exibe a resposta da criação da mesa (opcional)
        console.log('Mesa criada:', data);
        
        // Opcional: Você pode atualizar a interface ou redirecionar o usuário conforme necessário
    } catch (error) {
        console.error('Erro ao criar mesa:', error);
        alert('Erro ao criar mesa: ' + error.message);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    // Recupera os dados do restaurante do localStorage
    const restaurante = JSON.parse(localStorage.getItem('restaurante'));

    document.getElementById('salvarMesaBtn').addEventListener('click', () => criarMesa(restaurante));
    

});
