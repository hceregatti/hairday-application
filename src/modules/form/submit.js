import dayjs from "dayjs";

import { scheduleNew } from "../../services/schedule-new.js"
import { schedulesDay } from "../schedules/load.js";

const form = document.querySelector("form");
const clientName = document.getElementById("client");
const selectedDate = document.getElementById("date");

// Data atual para formatar o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD");

// Carrega a data atual e define a data minima com a atual.
selectedDate.value = inputToday;
selectedDate.min = inputToday;

form.onsubmit = async (event) => {
  event.preventDefault();

  try {
    // recuperando o nome do cliente/
    const name = clientName.value.trim();

    if (!name) {
      return alert("Informe o nome do cliente!");
    }

    // recuperar o horário selecionado

    const hourSelected = document.querySelector(".hour-selected");

    if (!hourSelected) {
      return alert("Selecione a hora.");
    }

    // Recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":");

    // inserir a hora na data
    const when = dayjs(selectedDate.value).add(hour, "hour");
    console.log(when);

    // gerar um id para ter um identificador
    const id = new Date().getTime();

    // Faz o agendamento
    await scheduleNew({
      id,
      name,
      when,
    });
    
    // Recarrega os agendamentos
    await schedulesDay();

    // limpa input nome cliente.
    clientName.value = "";

  } catch (error) {
    alert("Não foi possível realizar o agendamento.");
    console.log(error);
  }
};
