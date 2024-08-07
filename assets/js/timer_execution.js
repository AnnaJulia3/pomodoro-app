var controlPlayTimer = document.getElementById("controlPlayTimer");
var timerText = document.getElementById("timerText");
var buttonMusic = document.getElementById("buttonMusic");
var buttonTopGame = document.getElementById("buttonGameTop");
var progressClockSpace = document.getElementById("progressClockSpace");
const TYPE_POMODORO = 0;
const TYPE_BREAK = 1;
const TYPE_STOPWATCH = 2;
const TYPE_TIMING_DEVICE = 3;
var MAX_TIME_IN_SECONDS = 43200; // 12h = 43200s
var pomodoroTimeInSeconds = 1500; // 25m = 1500s
var breakTimeInSeconds = 300; // 05m = 300s
var stepTimer = -1;
var nowType = TYPE_POMODORO;
var timerNowInSeconds, endNowInSeconds;
var initTimeInSeconds = pomodoroTimeInSeconds;
var endTimeInSeconds = 0;
var initBreakInSeconds = breakTimeInSeconds;
var endBreakInSeconds = 0;
let timerProgress;

function formatMinutes() {
  timerNowInMinutes = timerNowInSeconds / 60;
  var minutes = Math.trunc(timerNowInMinutes).toString().padStart(2, "0");
  var seconds = Math.trunc(timerNowInSeconds % 60)
    .toString()
    .padStart(2, "0");
  timerText.textContent = `${minutes}:${seconds}`;
}

// -- Tipo de timer ---
var selectTypeTimer = document.getElementById("typeTimer");

function changeTypeTimer() {
  // console.log("Vira pomodoro - troca de timer");
  nowType = selectTypeTimer.value;

  if (nowType == TYPE_STOPWATCH) {
    stepTimer = 1;
    initTimeInSeconds = 0;
    endTimeInSeconds = MAX_TIME_IN_SECONDS;
  } else if (nowType == 1) {
    // pomodoro crescente
    stepTimer = 1;
    initTimeInSeconds = 0;
    initBreakInSeconds = 0;
    endTimeInSeconds = pomodoroTimeInSeconds;
    endBreakInSeconds = breakTimeInSeconds;
  } else {
    stepTimer = -1;
    initTimeInSeconds = pomodoroTimeInSeconds;
    initBreakInSeconds = breakTimeInSeconds;
    endTimeInSeconds = 0;
    endBreakInSeconds = 0;
  }
  if (nowType == TYPE_BREAK) nowType = TYPE_POMODORO; // sessão break ou pomodoro crescente
  timerNowInSeconds = initTimeInSeconds;
  endNowInSeconds = endTimeInSeconds;
  formatMinutes();
}

function changeTypeTimerToBreak() {
  nowType = TYPE_BREAK;
  if (stepTimer < 0) {
    initBreakInSeconds = breakTimeInSeconds;
  } else {
    endBreakInSeconds = breakTimeInSeconds;
  }
  timerNowInSeconds = initTimeInSeconds;
  // console.log("Vira break -> inicio: " +  initBreakInSeconds/60 + ' Até: ' + endBreakInSeconds/60);
  // formatMinutes();
}

// --- Progressão do timer ---

function stopTimer() {
  stopProgressBar();
  clearInterval(timerProgress);
  buttonMusic.style.display = "flex";
  if (!audioBackground.paused) audioBackground.pause();
}

function playTimer() {
  formatMinutes();
  if (timerNowInSeconds == endNowInSeconds) {
    controlPlayTimer.checked = false;
    stopTimer();
    if (nowType != TYPE_POMODORO) {
      add_count_pomodoro();
      setPlayAudio(audioSuccessPomodoro);
    } else {
      setPlayAudio(audioEndBreak);
    }
  }
  timerNowInSeconds += stepTimer;
}

function setStartTimer() {
  audioStartPomodoro.currentTime = 0;
  setPlayAudio(audioStartPomodoro);
  buttonMusic.style.display = "none";
  buttonTopGame.style.display = "none";
  progressClockSpace.setAttribute("theme", "pomodoro");
  if (!audioEndBreak.paused) {
    audioEndBreak.pause();
    audioEndBreak.currentTime = 0;
  }
  if (!audioSuccessPomodoro.paused) {
    audioSuccessPomodoro.pause();
    audioSuccessPomodoro.currentTime = 0;
  }

  if (nowType == TYPE_BREAK) {
    timerNowInSeconds = initBreakInSeconds;
    endNowInSeconds = endBreakInSeconds;

    nowType = TYPE_POMODORO;
    buttonTopGame.style.display = "flex";
    progressClockSpace.setAttribute("theme", "break");
    not_show_count_pomodoro();
  } else {
    setPlayAudio(audioBackground);
    timerNowInSeconds = initTimeInSeconds;
    progressBar();
    if (nowType == TYPE_POMODORO) {
      nowType = TYPE_BREAK;
      endNowInSeconds = endTimeInSeconds;
    }
  }
  timerProgress = setInterval(playTimer, 1000);
  playTimer();
}

controlPlayTimer.addEventListener("click", () => {
  if (openMenuSession > -1) closeMenu();
  if (controlPlayTimer.checked) {
    removeSynchronize();
    setStartTimer();
  } else {
    stopTimer();
    setPlayAudio(audioLosePomodoro);
  }
});
