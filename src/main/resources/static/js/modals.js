// Seleciona os elementos dos modais e botões
const loginModal = document.getElementById('loginModal');
const cadastroModal = document.getElementById('cadastroModal');

const btnLogin = document.querySelector('.btn-login');
const btnAbrirCadastro = document.querySelector('#cadastroBtn');
const btnFecharLogin = document.querySelector('.close');  // Fechar botão no modal de login
const btnFecharCadastro = document.querySelector('.close');  // Fechar botão no modal de cadastro

// Funções para abrir e fechar os modais
function abrirModal(modal) {
    modal.style.display = 'block'; // Torna o modal visível
}

function fecharModal(modal) {
    modal.style.display = 'none'; // Torna o modal invisível
}

// Eventos para abrir e fechar o modal de login
btnLogin.addEventListener('click', () => abrirModal(loginModal));
btnFecharLogin.addEventListener('click', () => fecharModal(loginModal));

// Eventos para abrir o modal de cadastro a partir do login
btnAbrirCadastro.addEventListener('click', () => {
    fecharModal(loginModal); // Fecha o modal de login
    abrirModal(cadastroModal); // Abre o modal de cadastro
});

// Eventos para fechar o modal de cadastro
btnFecharCadastro.addEventListener('click', () => fecharModal(cadastroModal));

// Fecha os modais ao clicar fora deles
window.addEventListener('click', (event) => {
    if (event.target === loginModal) {
        fecharModal(loginModal);
    }
    if (event.target === cadastroModal) {
        fecharModal(cadastroModal);
    }
});