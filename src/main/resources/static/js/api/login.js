document.addEventListener("DOMContentLoaded", function() {
    const loginModal = document.getElementById('loginModal');
    const loginBtn = document.getElementById('loginBtn');
    const fecharLogin = document.getElementById('fecharLogin'); // Botão de fechar o modal
    const loginForm = loginModal.querySelector('form'); // Seleciona o formulário dentro do modal

    // Abrir o modal de login ao clicar no botão de login
    loginBtn.addEventListener('click', function() {
        loginModal.classList.remove('hidden'); // Exibe o modal
    });

    // Fechar o modal de login
    fecharLogin.addEventListener('click', function() {
        loginModal.classList.add('hidden'); // Fecha o modal
    });

    // Realiza o login ao submeter o formulário
    loginForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Impede o comportamento padrão de envio do formulário
        
        // Pega os dados de email e senha inseridos pelo usuário
        const emailInput = document.getElementById('email').value;
        const senhaInput = document.getElementById('senha').value;

        autenticarUsuario(emailInput, senhaInput);
        
        
    });





    async function autenticarUsuario(email, senha) {
        try {
            // Fazendo a requisição GET para obter todos os restaurantes
            const response = await fetch('http://localhost:8080/restaurantes');
            
            if (!response.ok) {
                throw new Error('Erro ao buscar os restaurantes: ' + response.statusText);
            }
            
            // Convertendo a resposta para JSON
            const restaurantes = await response.json();
            console.log('Restaurantes recebidos:', restaurantes);  // Logar todos os restaurantes para análise
    
            // Normalizando o email e senha para comparar sem problemas de maiúsculas/minúsculas ou espaços
            const emailNormalizado = email.trim().toLowerCase();  // Remover espaços e transformar para minúsculo
            const senhaNormalizada = senha.trim();  // Remover espaços
    
            // Buscando o restaurante que corresponde ao email e senha fornecidos
            const restaurante = restaurantes.find(r => {
                // Adicionando log para ver como cada restaurante está sendo comparado
                console.log(`Comparando: email -> ${r.email} com ${emailNormalizado} e senha -> ${r.senha} com ${senhaNormalizada}`);
                return r.email.trim().toLowerCase() === emailNormalizado && r.senha === senhaNormalizada;
            });
    
            if (restaurante) {
                // Se encontrar o restaurante, salva os dados no localStorage
                localStorage.setItem('restaurante', JSON.stringify(restaurante));
                console.log('Usuário autenticado com sucesso:', restaurante);
                alert('Login bem-sucedido!');
                // Aqui você pode redirecionar para outra página, por exemplo: 
                window.location.href = '../pages/adminRestaurante.html';
            } else {
                throw new Error('Credenciais inválidas');
            }
        } catch (error) {
            console.error('Erro ao autenticar o usuário:', error);
            alert(error.message);
        }
    }
    
    
});
