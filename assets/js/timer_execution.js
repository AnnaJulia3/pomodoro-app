var controlPlayTimer = document.getElementById("controlPlayTimer");
var timerText = document.getElementById("timerText");
var buttonMusic = document.getElementById("buttonMusic");
var buttonTopGame = document.getElementById("buttonGameTop");
var progress_clock_space = document.getElementById("progress_clock_space");

const TYPE_POMODORO = 0;
const TYPE_BREAK = 1;
const TYPE_STOPWATCH = 2;
const TYPE_TIMING_DEVICE = 3;
const MAX_TIME_IN_SECONDS = 43200;  // 12h = 43200s
var pomodoroTimeInSeconds = 1500;  // 25m = 1500s
var breakTimeInSeconds = 300;     // 05m = 300s
var stepTimer = -1;
var nowType = 0;
var timerNowInSeconds, endNowInSeconds;
var initTimeInSeconds = pomodoroTimeInSeconds;
var endTimeInSeconds = 0;
var initBreakInSeconds = breakTimeInSeconds;
var endBreakInSeconds = 0;
let timerProgress;

function formatMinutes(){
    timerNowInMinutes = timerNowInSeconds / 60;
    var minutes = Math.trunc(timerNowInMinutes).toString().padStart(2, '0');
    var seconds = Math.trunc(timerNowInSeconds % 60).toString().padStart(2, '0');
    timerText.textContent = `${minutes}:${seconds}`;
}

// -- Tipo de timer ---
var selectTypeTimer = document.getElementById("type_timer");

function changeTypeTimer() {
    nowType = selectTypeTimer.value;

    if (nowType == TYPE_STOPWATCH) {
        stepTimer = 1;
        initTimeInSeconds = 0;
        endTimeInSeconds = MAX_TIME_IN_SECONDS;

    } else if (nowType == 1) { // pomodoro crescente
        stepTimer = 1;
        initTimeInSeconds = 0;
        initBreakInSeconds = 0;
        endTimeInSeconds = pomodoroTimeInSeconds;
        endBreakInSeconds = breakTimeInSeconds;

    }
    else {
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

// --- Progressão do timer ---

function stopTimer() {
    stopProgressBar();
    clearInterval(timerProgress);
    buttonMusic.style.display = "flex";
    if (!audioBackground.paused) audioBackground.pause();
}

function playTimer() {
    formatMinutes();
    if (nowType != TYPE_POMODORO) audioBackground.play();
    if (timerNowInSeconds ==  endNowInSeconds) {
        controlPlayTimer.checked = false;
        stopTimer();
        if (nowType != TYPE_POMODORO) {
            add_count_pomodoro();
            audioSucessPomodoro.play();
        }
        else {
            audioEndBreak.play();
        }
    }
    timerNowInSeconds += stepTimer;
}

controlPlayTimer.addEventListener("click", () => {
    if (controlPlayTimer.checked) {
        audioStartPomodoro.currentTime = 0;
        audioStartPomodoro.play();
        buttonMusic.style.display = "none";
        buttonTopGame.style.display = "none";
        progress_clock_space.setAttribute("theme", "pomodoro");
        if (!audioEndBreak.paused) {
            audioEndBreak.pause();
            audioEndBreak.currentTime = 0;
        }

        if (nowType == TYPE_BREAK) {
            timerNowInSeconds = initBreakInSeconds;
            endNowInSeconds = endBreakInSeconds;

            nowType = TYPE_POMODORO;
            buttonTopGame.style.display = "flex";
            progress_clock_space.setAttribute("theme", "break");
            not_show_count_pomodoro();
        }
        else {
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
    else {
        stopTimer();
        audioLosePomodoro.play();
    }
});