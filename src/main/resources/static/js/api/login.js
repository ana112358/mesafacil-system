document.addEventListener("DOMContentLoaded", function () {
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const fecharLogin = document.getElementById('fecharLogin'); // Botão de fechar o modal
    const loginForm = loginModal.querySelector('form'); // Seleciona o formulário dentro do modal
    const cadastroBtn = document.getElementById('cadastroBtn'); // Se precisar de ação no cadastro

    // Abrir o modal de login ao clicar no botão de login
    loginBtn.addEventListener('click', function () {
        loginModal.classList.remove('hidden'); // Exibe o modal
    });

    // Fechar o modal de login
    fecharLogin.addEventListener('click', function () {
        loginModal.classList.add('hidden'); // Fecha o modal
    });

    // Realiza o login ao submeter o formulário
    loginForm.addEventListener('submit', function (event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário

        // Pega os dados de email e senha inseridos pelo usuário
        const emailInput = document.getElementById('email').value;
        const senhaInput = document.getElementById('senha').value;

        // Carregar o arquivo JSON simulando os dados dos usuários
        console.log(emailInput);

        fetch("/frontend/assets/datas/usuarios.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o arquivo: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("Dados carregados:", data);

                // Verifica se existe um usuário com email e senha correspondentes
                const usuario = data.usuarios.find(user => user.email === emailInput && user.senha === senhaInput);

                if (usuario) {
                    alert(`Bem-vindo, ${usuario.nome}!`);
                    loginModal.classList.add('hidden'); // Fecha o modal após o login bem-sucedido

                    // Redireciona para a página de administração do restaurante
                    window.location.href = "/frontend/pages/adminRestaurante.html";

                    localStorage.setItem('usuarioLogado', JSON.stringify(usuario));
                } else {
                    alert('Credenciais inválidas!');
                }
            })
            .catch(error => {
                console.error('Erro ao carregar os dados de login:', error);
                alert('Erro ao tentar autenticar. Tente novamente mais tarde.');
            });



    });
});
