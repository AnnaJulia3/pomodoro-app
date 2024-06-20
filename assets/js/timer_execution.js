var controlPlayTimer = document.getElementById("controlPlayTimer");
var timerText = document.getElementById("timerText");
var buttonMusic = document.getElementById("buttonMusic");
var buttonTopGame = document.getElementById("buttonGameTop");
var clockSpace = document.getElementById("clock_space");

const TYPE_POMODORO = 0;
const TYPE_BREAK = 1;
const TYPE_STOPWATCH = 2; //prox passo funcao indicar tipo stepTimer = 1
const TYPE_TIMING_DEVICE = 3; //prox passo funcao indicar tipo stepTimer = -1
var maxTime = 720;
var pomodoroTime = 25;
var breakTime = 5;
var stepTimer = -1;
var nowType = 0;
var timerNow;
var endTime;
var seconds;
var minutes;
let timerProgress;

function stopTimer() {
    clearInterval(timerProgress);
    buttonMusic.style.display = "flex";
    if (!audioBackground.paused) audioBackground.pause();
}

function playTimer() {
    timerNowInMinutes = timerNow / 60;
    minutes = Math.trunc(timerNowInMinutes).toString().padStart(2, '0');
    seconds = Math.trunc(timerNow % 60).toString().padStart(2, '0');
    timerText.textContent = `${minutes}:${seconds}`;
    if (nowType != TYPE_POMODORO) audioBackground.play();
    if (timerNowInMinutes == endTime) {
        controlPlayTimer.checked = false;
        stopTimer();
        if (nowType != TYPE_POMODORO) audioSucessPomodoro.play();
        else {
            audioEndBreak.play();
        }
    }
    timerNow += stepTimer;
}

controlPlayTimer.addEventListener("click", () => {
    if (controlPlayTimer.checked) {
        audioStartPomodoro.currentTime = 0;
        audioStartPomodoro.play();
        timerNow = 0;
        buttonMusic.style.display = "none";
        buttonTopGame.style.display = "none";
        clockSpace.setAttribute("theme", "pomodoro");

        if (!audioEndBreak.paused) {
            audioEndBreak.pause();
            audioEndBreak.currentTime = 0;
        }
        if (nowType == TYPE_STOPWATCH) {
            endTime = maxTime;
        }
        else {
            if (nowType == TYPE_BREAK) {
                endTime = breakTime * 60;
                nowType = TYPE_POMODORO;
                buttonTopGame.style.display = "flex";
                clockSpace.setAttribute("theme", "break");
            }
            else {
                endTime = pomodoroTime * 60;
                if (nowType == TYPE_POMODORO) nowType = TYPE_BREAK;
            }
            if (stepTimer == -1) {
                timerNow = endTime;
                endTime = 0;
            }
        }

        timerProgress = setInterval(playTimer, 1000);
        playTimer();
    }
    else {
        stopTimer();
        audioLosePomodoro.play();
    }
});