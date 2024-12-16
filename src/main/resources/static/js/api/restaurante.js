(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idRestaurante = urlParams.get('restaurante');

    if (!idRestaurante)
        return;

    let restaurante = await getRestauranteById(idRestaurante);
    document.getElementById("nomeRestaurante").textContent = restaurante.nome;

    let mesas = await getMesasByRestaurante(idRestaurante);
    let divMesas = document.getElementById("mesasRestaurante");

    renderMesasHTML(mesas, divMesas);
})();

async function getRestauranteById(idRestaurante) {
    const url = "http://localhost:8080/restaurantes/" + idRestaurante;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;

    } catch (error) {
        console.log(error.message);
    }
}

async function getMesasByRestaurante(idRestaurante) {
    console.log(idRestaurante);

    const url = "http://localhost:8080/mesas/restaurante/" + idRestaurante;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;

    } catch (error) {
        console.log(error.message);
    }
}

async function getReservasByMesa(idMesa) {
    const url = "http://localhost:8080/reservas/mesa/" + idMesa;

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;

    } catch (error) {
        console.log(error.message);
    }
}

// function addEventListeners(divMesas) {
//     for (const child of divMesas.children) {
//         child.addEventListener("click", e => {
//             handleRenderReservasByMesaId(getId(e.currentTarget.id));
//         })
//     }
// }

async function handleRenderReservasByMesaId(idMesa) {
    let divReservas = document.getElementById("reservasInfo");
    const reservas = await getReservasByMesa(idMesa);
    if (!reservas || reservas.length === 0) {
        divReservas.innerHTML = "<p>Não há reservas para esta mesa.</p>";
    } else {
        renderReservasHTML(reservas, divReservas);
    }
}

function renderMesasHTML(mesas, divMesas) {
    divMesas.innerHTML = "";
    mesas.forEach(mesa => {
        let appendHTML = `
            <div id="mesa-${mesa.id}" class="mesaRestaurante">
                <p>Mesa ${mesa.numeracao}</p>
                <p>Quantidade de Cadeiras: ${mesa.quantidade_cadeiras}</p>
                <div class="botoes-mesa">
                    <button class="btn-ver-reservas" data-id="${mesa.id}">Ver Reservas</button>
                    <a href="reserva.html?mesa=${mesa.id}" class="btn-reservar">Fazer Reserva</a>
                </div>
            </div>
        `;

        divMesas.innerHTML = divMesas.innerHTML + appendHTML;
    });
    document.querySelectorAll(".btn-ver-reservas").forEach(button => {
        button.addEventListener("click", e => {
            const idMesa = e.currentTarget.getAttribute("data-id");
            handleRenderReservasByMesaId(idMesa);
        });
    });
}

function renderReservasHTML(reservas, divReservas) {
    divReservas.innerHTML = "";

    reservas.forEach(reserva => {
        const horario_inicio = new Date(reserva.horario_inicio).toLocaleTimeString();
        const horario_final = new Date(reserva.horario_final).toLocaleTimeString();

        let appendHTML = `
            <div id="reserva-${reserva.id}" class="reservaOcupada">
                <p class="horario">Horário inicio: ${horario_inicio}</p>|
                <p class="horario">Horário final:  ${horario_final}</p>|
                <p class="ocupado">Ocupado por: ${reserva.nome_cliente}</p>
            </div>
        `;

        divReservas.innerHTML = divReservas.innerHTML + appendHTML;
    });
}

// Aux

function getId(divId) {
    let splitted = divId.split('-');
    return parseInt(splitted[splitted.length - 1]);
}