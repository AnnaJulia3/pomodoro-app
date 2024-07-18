// --- Animation Bar ---
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
  timeOutBarNone = setTimeout(noneDisplayProgressBars, 60005); //8s
}

function stopProgressBar() {
  clearInterval(loopAnimationTimerBar);
  clearTimeout(timeOutBar1);
  clearTimeout(timeOutBar2);
  clearTimeout(timeOutBar3);
  clearTimeout(timeOutBar4);
  clearTimeout(timeOutBar5);
  clearTimeout(timeOutBarNone);
  noneDisplayProgressBars();
}

// --- Intermediário ---
function progressBar() {
  //pomodoro ativo
  loopAnimationTimerBar = setInterval(animation_bars, 60010);
  animation_bars();
  //--- star ---
  show_count_pomodoro();
}

// --- Count stars ---
var count_pomodoro = 0;
var listStars = [
  document.getElementById("micro_star_above3"),
  document.getElementById("micro_star_above2"),
  document.getElementById("micro_star_above1"),

  document.getElementById("micro_star_below2"),
  document.getElementById("micro_star_below3"),
  document.getElementById("micro_star_below4"),
  document.getElementById("micro_star_below5"),

  document.getElementById("small_star_above1"),
  document.getElementById("middle_star_above1"),
  document.getElementById("big_star_below"),
  document.getElementById("middle_star_below"),
  document.getElementById("small_star_below"),
  document.getElementById("small_star_above2"),
  document.getElementById("middle_star_above2"),

  document.getElementById("micro_star_below1"),

  document.getElementById("big_star_above"),
];

function add_count_pomodoro() {
  // sucess
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
