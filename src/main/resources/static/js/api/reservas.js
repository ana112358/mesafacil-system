document.addEventListener("DOMContentLoaded", () => {
    const reservaForm = document.getElementById("reservaForm");
    const mensagem = document.getElementById("mensagem");
    mensagem.style.cssText = `
        width: 100%;
        padding: 10px;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
        border-radius: 5px;
        margin-top: 20px;
    `;

    const urlParams = new URLSearchParams(window.location.search);
    const numeroMesa = urlParams.get("mesa");
    if (numeroMesa) {
        const numeroMesaElement = document.getElementById("numeroMesa");
        numeroMesaElement.textContent = `Número da Mesa: ${numeroMesa}`;
    }

    const obterReservasPorMesa = async (idMesa) => {
        try {
            const response = await fetch(`http://localhost:8080/reservas/mesa/${idMesa}`);
            if (!response.ok) throw new Error("Erro ao buscar reservas existentes.");
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar reservas:", error);
            throw error;
        }
    };

    const formatoData = (data) => {
        const dt = new Date(data);
        return dt.getFullYear() +
            "-" + String(dt.getMonth() + 1).padStart(2, "0") +
            "-" + String(dt.getDate()).padStart(2, "0") +
            "T" + String(dt.getHours()).padStart(2, "0") +
            ":" + String(dt.getMinutes()).padStart(2, "0") +
            ":" + String(dt.getSeconds()).padStart(2, "0");
    };

    const enviarReserva = async (dadosReserva, idRestaurante, idMesa) => {        
        try {
            const response = await fetch("http://localhost:8080/reservas", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(dadosReserva)
            });

            if (response.ok) {
                mensagem.textContent = "Reserva realizada com sucesso!";
                mensagem.style.backgroundColor = "rgba(0, 128, 0, 0.4)";
                mensagem.style.color = "rgba(0, 128, 0, 1)";
                reservaForm.reset();

                setTimeout(() => {
                    window.location.href = `/pages/restaurante.html?mesa=${idMesa}&restaurante=${idRestaurante}`;
                }, 5000);
            } else {
                mensagem.textContent = "Erro ao realizar a reserva.";
                mensagem.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
                mensagem.style.color = "rgba(255, 0, 0, 1)";
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            mensagem.textContent = "Erro ao enviar os dados.";
            mensagem.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            mensagem.style.color = "rgba(255, 0, 0, 1)";
        }
    };

    const verificaConflito = (reservas, novaReserva) => {
        const inicioNova = new Date(novaReserva.horario_inicio);
        const finalNova = new Date(novaReserva.horario_final);

        for (const reserva of reservas) {
            const inicioExistente = new Date(reserva.horario_inicio);
            const finalExistente = new Date(reserva.horario_final);
            if (inicioNova < finalExistente && finalNova > inicioExistente) {
                return true;
            }
        }
        return false;
    };

    reservaForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const idMesa = urlParams.get("mesa");
        const idRestaurante = urlParams.get("restaurante");

        if (!idMesa || !idRestaurante) {
            alert("Mesa ou restaurante não encontrados. Verifique a URL.");
            return;
        }

        const nomeCliente = document.getElementById("nomeCliente").value;
        const horarioInicio = document.getElementById("horarioInicio").value;
        const horarioFinal = document.getElementById("horarioFinal").value;

        try {
            const reservasExistentes = await obterReservasPorMesa(idMesa);

            const novaReserva = {
                nome_cliente: nomeCliente,
                horario_inicio: formatoData(horarioInicio),
                horario_final: formatoData(horarioFinal),
                mesa: { id: idMesa }
            };

            if (verificaConflito(reservasExistentes, novaReserva)) {
                mensagem.textContent = "Conflito detectado! Escolha outro horário.";
                mensagem.style.backgroundColor = "rgba(255, 165, 0, 0.4)";
                mensagem.style.color = "rgba(255, 165, 0, 1)";
                return;
            }

            await enviarReserva(novaReserva, idRestaurante, idMesa);
        } catch (error) {
            mensagem.textContent = "Erro ao processar a reserva: " + error.message;
            mensagem.style.color = "red";
        }
    });
});