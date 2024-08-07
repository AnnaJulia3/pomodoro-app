// --- Animação em 1 minuto ---
var bar1 = document.getElementById("cub1");
var bar2 = document.getElementById("cub2");
var bar3 = document.getElementById("cub3");
var bar4 = document.getElementById("cub4");
var bar5 = document.getElementById("cub5");
let loopAnimationTimerBar;
var timeOutBar1, timeOutBar2, timeOutBar3;
var timeOutBar4, timeOutBar5, timeOutBarNone;

function noneDisplayProgressBars() {
  bar1.style.display = "none";
  bar2.style.display = "none";
  bar3.style.display = "none";
  bar4.style.display = "none";
  bar5.style.display = "none";
}

function animation_bars() {
  timeOutBar1 = setTimeout(() => (bar1.style.display = "flex"), 15); //8s
  timeOutBar2 = setTimeout(() => (bar2.style.display = "flex"), 8000); //22-8 14s
  timeOutBar3 = setTimeout(() => (bar3.style.display = "flex"), 22500); //17s
  timeOutBar4 = setTimeout(() => (bar4.style.display = "flex"), 38000);
  timeOutBar5 = setTimeout(() => (bar5.style.display = "flex"), 53000); //8s
  timeOutBarNone = setTimeout(noneDisplayProgressBars, 59990); //8s
}

function stopProgressBar() {
  // clearInterval(loopAnimationTimerBar);
  // clearTimeout(timeOutBar1);
  // clearTimeout(timeOutBar2);
  // clearTimeout(timeOutBar3);
  // clearTimeout(timeOutBar4);
  // clearTimeout(timeOutBar5);
  // clearTimeout(timeOutBarNone);
  noneDisplayProgressBars();
}

// --- Intermediário ---
function progressBar() {
  //Animação ativa
  // loopAnimationTimerBar = setInterval(animation_bars, 60000);
  // animation_bars();
  //--- Contagem ativa ---
  show_count_pomodoro();
}

// --- Contagem de sessões de foco ---
var count_pomodoro = 0;
var listStars = [
  document.getElementById("microStarAbove3"),
  document.getElementById("microStarAbove2"),
  document.getElementById("microStarAbove1"),

  document.getElementById("microStarBelow2"),
  document.getElementById("microStarBelow3"),
  document.getElementById("microStarBelow4"),
  document.getElementById("microStarBelow5"),

  document.getElementById("smallStarAbove1"),
  document.getElementById("middleStarAbove1"),
  document.getElementById("bigStarBelow"),
  document.getElementById("middleStarBelow"),
  document.getElementById("smallStarBelow"),
  document.getElementById("smallStarAbove2"),
  document.getElementById("middleStarAbove2"),

  document.getElementById("microStarBelow1"),

  document.getElementById("bigStarAbove"),
];

function add_count_pomodoro() {
  // Sessão terminada com sucesso 
  if (count_pomodoro < 16) {
    listStars[count_pomodoro].style.display = "flex";
    count_pomodoro++;
  }
}

function not_show_count_pomodoro() {
  // em break
  if (count_pomodoro > -1) {
    for (var starIndex = 0; starIndex < count_pomodoro; starIndex++) {
      listStars[starIndex].style.display = "none";
    }
  }
}

function show_count_pomodoro() {
  // em pomodoro
  if (count_pomodoro > -1) {
    for (var starIndex = 0; starIndex < count_pomodoro; starIndex++) {
      listStars[starIndex].style.display = "flex";
    }
  }
}
