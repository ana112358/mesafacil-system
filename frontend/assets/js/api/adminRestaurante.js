// Script para tratar a ação do botão de "Sair"
document.getElementById('sairBtn').addEventListener('click', () => {
    localStorage.removeItem('usuarioLogado');
    alert("Você saiu com sucesso!");
    window.location.href = "/frontend/index.html"; // Redireciona para login
});

document.addEventListener("DOMContentLoaded", function () {
    // Verifique se o usuário está autenticado
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Se não estiver autenticado, redirecione para a página de login
    if (!usuarioLogado) {
        alert("Você não está autenticado. Redirecionando para a página de login.");
        window.location.href = "/frontend/pages/login.html"; // Redireciona para o login
    } else {
        // O usuário está autenticado, continue com o carregamento da página
        // Aqui você pode carregar os dados do usuário ou realizar outras ações
        console.log(`Bem-vindo, ${usuarioLogado.nome}!`);
    }
});

document.addEventListener("DOMContentLoaded", function () {
    // Recupera os dados do usuário logado do localStorage
    const usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'));

    // Verifica se o usuário está logado
    if (!usuarioLogado) {
        alert("Você não está logado. Redirecionando para a página de login.");
        window.location.href = "/frontend/pages/login.html"; // Redireciona para a página de login
    } else {
        // Exibir o nome do usuário logado
        const nomeRestaurante = usuarioLogado.nome;
        document.getElementById("nomeRestaurante").textContent = nomeRestaurante;

        // Agora você pode acessar outros dados do usuário logado, como mesas, etc.
        console.log(usuarioLogado); // Exibe no console para testar os dados
    }
});





