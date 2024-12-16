document.addEventListener("DOMContentLoaded", () => {
    const reservaForm = document.getElementById("reservaForm");
    const mensagem = document.getElementById("mensagem");
    
    const urlParams = new URLSearchParams(window.location.search);
    const numeroMesa = urlParams.get('mesa');
    if (numeroMesa) {
        const numeroMesaElement = document.getElementById("numeroMesa");
        numeroMesaElement.textContent = `Número da Mesa: ${numeroMesa}`;
    }

    const obterDadosMesa = async (idMesa) => {
        try {
            const response = await fetch(`http://localhost:8080/mesas/${idMesa}`);
            if (!response.ok) throw new Error("Erro ao obter dados da mesa.");
            return await response.json();
        } catch (error) {
            console.error("Erro ao buscar dados da mesa:", error);
            throw error;
        }
    };

    const formatoData = (data) => {
        const dt = new Date(data);
        return dt.getFullYear() +
            "-" + String(dt.getMonth() + 1).padStart(2, '0') +
            "-" + String(dt.getDate()).padStart(2, '0') +
            "T" + String(dt.getHours()).padStart(2, '0') +
            ":" + String(dt.getMinutes()).padStart(2, '0') +
            ":" + String(dt.getSeconds()).padStart(2, '0');
    };

    const enviarReserva = async (dadosReserva, idRestaurante, idMesa) => {
        const mensagem = document.getElementById('mensagem');
        mensagem.style.width = "100%";
        mensagem.style.padding = "10px";
        mensagem.style.textAlign = "center";
        mensagem.style.fontSize = "16px";
        mensagem.style.fontWeight = "bold";
        mensagem.style.borderRadius = "5px";
        mensagem.style.marginTop = "20px";
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
                const errorData = await response.json();
                console.error("Erro na resposta da API:", errorData);
                mensagem.textContent = "Erro ao realizar a reserva";
                mensagem.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
                mensagem.style.color = "rgba(255, 0, 0, 1)";
            }
        } catch (error) {
            console.error("Erro ao enviar os dados:", error);
            mensagem.textContent = "Erro ao enviar os dados";
            mensagem.style.backgroundColor = "rgba(255, 0, 0, 0.4)";
            mensagem.style.color = "rgba(255, 0, 0, 1)";
        }
    };

    reservaForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams(window.location.search);
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
            const mesaData = await obterDadosMesa(idMesa);

            const dadosReserva = {
                nome_cliente: nomeCliente,
                horario_inicio: formatoData(horarioInicio),
                horario_final: formatoData(horarioFinal),
                mesa: mesaData
            };

            console.log("Dados da reserva formatados:", dadosReserva);

            await enviarReserva(dadosReserva, idRestaurante, idMesa);
        } catch (error) {
            mensagem.textContent = "Erro ao processar a reserva: " + error.message;
            mensagem.style.color = "red";
        }
    });
});