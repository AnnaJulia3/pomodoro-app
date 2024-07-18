var buttonGear = document.getElementById("buttonGear");

function fastTest() {
  // default
  MAX_TIME_IN_SECONDS = 4; // 12h = 43200s
  pomodoroTimeInSeconds = 1; // 25m = 1500s
  breakTimeInSeconds = 2; // 05m = 300s
  changeTypeTimer();
}

buttonGear.addEventListener("click", fastTest);
