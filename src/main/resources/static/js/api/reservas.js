(async () => {
    let reservas = await getAllReservas();
    console.log("aqui: ", reservas);
    let divReservasOcupadas = document.getElementById("reservasOcupadas");
    let divReservasDisponiveis = document.getElementById("myid");

    renderReservasHTML(reservas, divReservasOcupadas, divReservasDisponiveis);

    console.log(reservas);
})();


async function getAllReservas() {
    const url = "http://localhost:8080/reservas";

    try {
        const response = await fetch(url);
        const json = await response.json();

        return json;

    } catch (error) {
        console.log(error.message);
    }
}

function renderReservasHTML(reservas, divReservasOcupadas, divReservasDisponiveis) {
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
        divReservasOcupadas.innerHTML = divReservasOcupadas.innerHTML + appendHTML;
    });
}