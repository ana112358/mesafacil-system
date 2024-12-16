async function carregarRestaurantes() {
    try {
        const apiUrl = 'http://localhost:8080/restaurantes';
        const response = await fetch(apiUrl);

        if (!response.ok) throw new Error(`Erro ao carregar dados: ${response.status}`);

        const restaurantes = await response.json();
        
        const restaurante_lista = document.getElementById('restaurantes-lista');

        restaurantes.forEach(restaurante => {
            const restaurante_card = document.createElement('div');
            restaurante_card.className = 'restaurante-card';
            restaurante_card.innerHTML = `
                <div>
                    <h3 class="nome">${restaurante.nome}</h3>
                    <p class="descricao">${restaurante.descricao}</p>
                </div>
                <div class="informacoes">
                    <p class="telefone">
                        <ion-icon name="call"></ion-icon>
                        ${restaurante.telefone}
                    </p>
                    <p class="endereco">
                        <ion-icon name="location-sharp"></ion-icon>
                        ${restaurante.endereco}
                    </p>
                    <a href="/pages/restaurante.html?restaurante=${restaurante.id}" class="btn-detalhes">Ver detalhes</a>
                </div>
            `;
            restaurante_lista.appendChild(restaurante_card);
        });
    } catch (error) {
        console.error('Erro ao carregar os restaurantes:', error.message);
    }
}
carregarRestaurantes();

// Seleciona os elementos dos modais e botões
const loginModal = document.getElementById('loginModal');
const cadastroModal = document.getElementById('cadastroModal');

const btnLogin = document.querySelector('.btn-login');
const btnAbrirCadastro = document.querySelector('#cadastroBtn');
const btnFecharLogin = document.getElementById('fecharLogin');  // Fechar botão no modal de login
const btnFecharCadastro = document.getElementById('fecharCadastro');  // Fechar botão no modal de cadastro

// Funções para abrir e fechar os modais
function abrirModal(modal) {
    modal.style.display = 'block'; // Torna o modal visível
    document.body.classList.add('no-scroll'); // Desativa a rolagem lateral
}

function fecharModal(modal) {
    modal.style.display = 'none'; // Torna o modal invisível
    document.body.classList.remove('no-scroll'); // Restaura a rolagem lateral
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