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
                <div>
                    <p class="endereco">
                        <ion-icon name="location-sharp"></ion-icon>
                        ${restaurante.endereco}
                    </p>
                    <a href="#" class="btn-detalhes">Ver detalhes</a>
                </div>
            `;
            restaurante_lista.appendChild(restaurante_card);
        });
    } catch (error) {
        console.error('Erro ao carregar os restaurantes:', error.message);
    }
}
carregarRestaurantes();