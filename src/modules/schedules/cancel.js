import { schedulesDay } from "./load.js"
import { scheduleCancel } from "../../services/schedule-cancel.js";
const periods = document.querySelectorAll(".period");

// Gerar evento de click para cada lista
periods.forEach((period) => {
  // capturar o evento de click na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      // obtem a li pai do elemento clicado.
      const item = event.target.closest("li");
      const { id } = item.dataset;

      if (id) {
        const isConfirm = confirm(
          "Tem certeza que deseja cancelar o agendamento?"
        );

        if (isConfirm) {
          await scheduleCancel({id})
          schedulesDay();
        }
      }
    }
  });
});
