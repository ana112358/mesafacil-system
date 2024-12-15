// Função para pegar os dados de cadastro e armazená-los em variáveis
function pegarDadosCadastro() {
    // Pegando os dados dos campos de input
    var nome = document.getElementById("nome").value;
    var email = document.getElementById("cadastroEmail").value;
    var senha = document.getElementById("cadastroSenha").value;
    var telefone = document.getElementById("telefone").value;
    var endereco = document.getElementById("endereco").value;
    var descricao = document.getElementById("descricao").value;

    enviarDadosBanco(nome, email,senha,telefone,endereco,descricao);

}

// Função assíncrona para enviar os dados ao banco (API)
async function enviarDadosBanco(nome, email, senha, telefone, endereco, descricao) {
    // URL da API (preencha com a URL correta do seu backend)
    const apiUrl = 'http://localhost:8080/restaurantes';  // Altere para o seu endpoint real

    // Dados a serem enviados para o backend
    const dados = {
        nome: nome,
        email: email,
        senha: senha,
        telefone: telefone,
        endereco: endereco,
        descricao: descricao
    };

    try {
        // Enviando os dados via POST para a API usando o fetch
        const response = await fetch(apiUrl, {
            method: 'POST', // Método POST para envio de dados
            headers: {
                'Content-Type': 'application/json', // Especificando o tipo de conteúdo como JSON
            },
            body: JSON.stringify(dados), // Convertendo o objeto para JSON
        });

        // Verificando se a resposta foi bem-sucedida (código 2xx)
        if (!response.ok) {
            throw new Error('Erro na resposta da API: ' + response.statusText);
        }

        // Convertendo a resposta para JSON
        const data = await response.json();

        // Se necessário, manipule a resposta, exiba um sucesso ou faça outra ação
        console.log('Dados enviados com sucesso:', data);
        // Exemplo: alert('Restaurante cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao enviar os dados:', error);
        // Trate o erro (exibição de mensagem de erro, por exemplo)
        alert('Ocorreu um erro ao enviar os dados, tente novamente.');
    }
}


// Chamando a função no envio do formulário
document.getElementById('cadastroModal').querySelector('form').addEventListener('submit', function(event) {
    event.preventDefault();  // Previne o envio do formulário
    pegarDadosCadastro();    // Chama a função para pegar os dados


});
