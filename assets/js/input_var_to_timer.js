var countFocusToNormal = 0;
// --- Alterar tempo das sessões ---
var focusSessionTimeRange = document.getElementById("focusSessionTimeRange");
var breakSessionTimeRange = document.getElementById("breakSessionTimeRange");
// --- Auto avanço ---
var autoFoco = document.getElementById("autoFoco");
var autoBreak = document.getElementById("autoBreak");
var checkSynchronizedInternetClock = document.getElementById(
  "synchronizeInternetClock"
);
// --- Personalização de quantidade de sessões ---
var countToShortBreak = document.getElementById("countToShortBreak");
var countToLongBreak = document.getElementById("countToLongBreak");
// --- Personalização de notificação ---
var typeNotification = document.getElementById("typeNotification");
// --- --- ---

// --- Alterar tempo das sessões ---
function convertFormattedTimeToSeconds(timeInput) {
  let hourInput = parseInt(timeInput.substring(0, 2));
  let minutesInput = parseInt(timeInput.substring(3, 5));
  let secondsInput = parseInt(timeInput.substring(6, 8));
  secondsInput += hourInput * 3600 + minutesInput * 60;
  return secondsInput;
}

function resetTimeRange() {
  pomodoroTimeInSeconds = convertFormattedTimeToSeconds(
    focusSessionTimeRange.value
  );
  breakTimeInSeconds = convertFormattedTimeToSeconds(
    breakSessionTimeRange.value
  );
  changeTypeTimer();
}

function changeFocusTimeRange() {
  pomodoroTimeInSeconds = convertFormattedTimeToSeconds(
    focusSessionTimeRange.value
  );
  changeTypeTimer();
}

function changeBreakTimeRange() {
  breakTimeInSeconds = convertFormattedTimeToSeconds(
    breakSessionTimeRange.value
  );
  changeTypeTimer();
}

focusSessionTimeRange.addEventListener("change", changeFocusTimeRange);
breakSessionTimeRange.addEventListener("change", changeBreakTimeRange);

// --- Auto avanço ---
function removeSynchronize() {
  // play
  // console.log("Contagem até foco na hora redonda " + countFocusToNormal);
  switch (countFocusToNormal) {
    case -2:
      // console.log("Acabou contagem");
      // tudo a seguir não faz mais parte da sincronização
      // não há mais focos até a pausa curta
      break;
    case -1:
      // primeiro pomodoro na hora desejada
      // apos break
      countFocusToNormal -= 1;
      // console.log("Diminui contagem para " + countFocusToNormal);
      // reinicia td
      resetTimeRange();
      break;
    case 0:
      //break
      countFocusToNormal -= 1;
      // console.log("Diminui contagem para " + countFocusToNormal);
      break;
    default:
      countFocusToNormal -= 1;
    // console.log("Diminui contagem para " + countFocusToNormal);
  }
}

function synchronizeInternetClock() {
  let status;
  let dateNow = new Date();
  let hour = dateNow.getHours() + 1;
  let teste1 = false;
  if (teste1) hour = 12 + 1;
  let minutesNow;
  let segundosAteAProxHora;
  let primeiroPomodoroASerSeguido;
  let quantasPode;
  let umaSessão;

  // --- auxiliar
  let mensagem;
  // breakTimeInSeconds
  // pomodoroTimeInSeconds

  if (checkSynchronizedInternetClock.checked) {
    status = confirm(
      "Realmente deseja sincronizar com o relógio na internet? O timer será ajustado para que uma das sessão de foco comece às " +
        hour +
        "h"
    );
    if (!status) {
      checkSynchronizedInternetClock.checked = false;
      return;
    }
    // countFocusToNormal = 2;
    // ---
    // Atualiza qualquer informação que possa estar desatualizada
    resetTimeRange();
    // ---
    minutesNow = "00:" + dateNow.getMinutes() + ":" + dateNow.getSeconds();
    if (teste1) minutesNow = "00:58:00";
    segundosAteAProxHora = 3600 - convertFormattedTimeToSeconds(minutesNow);
    umaSessão =
      pomodoroTimeInSeconds * countToShortBreak.value + breakTimeInSeconds;
    quantasPode = segundosAteAProxHora / umaSessão;
    segundosNaoEncaixamFocoBreak = segundosAteAProxHora % umaSessão;

    if (quantasPode < 1) {
      mensagem = "Quebra algo \n";
    } else {
      mensagem = "Vai ter sessões de foco e break " + quantasPode + "\n";
    }

    if (segundosNaoEncaixamFocoBreak > breakTimeInSeconds) {
      // ---> foco
      primeiroPomodoroASerSeguido =
        segundosNaoEncaixamFocoBreak - breakTimeInSeconds;
      mensagem += "foco de " + primeiroPomodoroASerSeguido / 60;
      pomodoroTimeInSeconds = primeiroPomodoroASerSeguido;
      countFocusToNormal = 1;

      changeTypeTimer();
    } else {
      // restante <= break --->  break
      mensagem += "break de " + segundosNaoEncaixamFocoBreak / 60;
      breakTimeInSeconds = segundosNaoEncaixamFocoBreak;
      changeTypeTimerToBreak();
      countFocusToNormal = 0;
    }

    // pelo restante sei o restante real que não encaixa no que o próprio algoritmo vai cuidar
    // restante <= break --->  break
    // restante > break ---> foco

    // Olho a partir da pausa curta
    // Casos
    // restante <= break ---> break
    // Se o tempo restante é curto demais para 1 foco e 1 break -> faz um break curto com o tempo restante
    // break < restante < foco + break  ---> foco
    // Se o tempo restante sobra para 1 foco e 1 break -> faz um foco e break curto com o tempo restante
    // foco + break < restante <= break + foco + break  ---> break
    // break + foco + break < restante <= break + foco + break + foco ---> foco

    // restante % (foco + break) = rest

    /* console.log(
      minutesNow +
        "\n" +
        "Tempo timer " +
        pomodoroTimeInSeconds / 60 +
        " Tempo atual " +
        segundosAteAProxHora / 60 +
        "\n" +
        "\n" +
        mensagem
    );
    */
  }
}

checkSynchronizedInternetClock.addEventListener(
  "change",
  synchronizeInternetClock
);
