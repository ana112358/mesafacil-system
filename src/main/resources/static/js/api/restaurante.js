(async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const idRestaurante = urlParams.get('restaurante');

    if (!idRestaurante)
        return;

    let mesas = await getMesasByRestaurante(idRestaurante);
    let divMesas = document.getElementById("mesasRestaurante");

    renderMesasHTML(mesas, divMesas);
    addEventListeners(divMesas);
})();

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

function addEventListeners(divMesas) {
    for (const child of divMesas.children) {
        child.addEventListener("click", e => {
            handleRenderReservasByMesaId(getId(e.currentTarget.id));
        })
    }
}

async function handleRenderReservasByMesaId(idMesa) {
    let divReservas = document.getElementById("reservasInfo");
    const reservas = await getReservasByMesa(idMesa);
    renderReservasHTML(reservas, divReservas);
}

function renderMesasHTML(mesas, divMesas) {
    mesas.forEach(mesa => {
        let appendHTML = `
            <div id="mesa-${mesa.id}" class="mesaRestaurante">
                <p>Mesa ${mesa.numeracao}</p>
                <p>Quantidade de Cadeiras: ${mesa.quantidade_cadeiras}</p>
            </div>
        `;

        divMesas.innerHTML = divMesas.innerHTML + appendHTML;
    });
}

function renderReservasHTML(reservas, divReservas) {
    divReservas.innerHTML = "";

    reservas.forEach(reserva => {
        const horario_inicio = new Date(reserva.horario_inicio).toLocaleTimeString();
        const horario_final = new Date(reserva.horario_final).toLocaleTimeString();

        let appendHTML = `
            <div id="reserva-${reserva.id}" class="reservaOcupada">
                <p>Horário inicio: ${horario_inicio}</p>
                <p>Horário final:  ${horario_final}</p>
                <p>Ocupado por: ${reserva.nome_cliente}</p>
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