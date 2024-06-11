var toggleTheme = document.getElementById("toggleTheme");
var controlPlayClock = document.getElementById("controlPlayClock");
var timeText = document.getElementById("timeText");

const pomodoroTimerInSeconds = 1500;
const shortBreakTimerInSeconds = 100;

var timeNow = 0;
var timeEnd = 25;
var initClock = 0;
var modeClock = 0;
var stepClock = 1;
let progressClock;
var seconds = 0;
var minutes = 0;
var hour = 0;

toggleTheme.addEventListener("click", () => {
    let currentTheme = document.documentElement.getAttribute("data-theme");
    if (currentTheme === "light") {
        document.documentElement.setAttribute("data-theme", "dark");
    } else {
        document.documentElement.setAttribute("data-theme", "light");
    }
});

var aux;

function playClockHour() {
    timeText.textContent = `${hour}:${minutes}:${seconds}`;
    timeNow = timeNow + stepClock;
    hour = Math.trunc(timeNow / 360).toString().padStart(2, '0');
    minutes = Math.trunc(timeNow / 60).toString().padStart(2, '0');
    seconds = Math.trunc(timeNow % 60).toString().padStart(2, '0');
}

function playClock() {
    timeText.textContent = `${minutes}:${seconds}`;
    timeNow = timeNow + stepClock;
    minutes = Math.trunc(timeNow / 60).toString().padStart(2, '0');
    seconds = Math.trunc(timeNow % 60).toString().padStart(2, '0');

    if(timeNow === timeEnd){
        clearInterval(progressClock);
    }
}

controlPlayClock.addEventListener("change", () => {
    if (controlPlayClock.checked) {
        timeNow = initClock;
        minutes = Math.trunc(timeNow).toString().padStart(2, '0');
        seconds = '00';
        hour = '00';
        progressClock = setInterval(playClock, 1000); 
        playClock();
    }
    else {
        clearInterval(progressClock);
    }
});