var bar1 = document.getElementById("cub1");
var bar2 = document.getElementById("cub2");
var bar3 = document.getElementById("cub3");
var bar4 = document.getElementById("cub4");
var bar5 = document.getElementById("cub5");
let loopAnimationTimerBar;
var timeOutBar1, timeOutBar2, timeOutBar3, timeOutBar4, timeOutBar5, timeOutBarNone;

function noneDisplayProgressBars() {
    bar1.style.display = "none";
    bar2.style.display = "none";
    bar3.style.display = "none";
    bar4.style.display = "none";
    bar5.style.display = "none";
}

function animation_bars() {
    timeOutBar1 = setTimeout(() => bar1.style.display = "flex", 15); //8s
    timeOutBar2 = setTimeout(() => bar2.style.display = "flex", 8000); //22-8 14s
    timeOutBar3 = setTimeout(() => bar3.style.display = "flex", 22500); //17s
    timeOutBar4 = setTimeout(() => bar4.style.display = "flex", 38000);
    timeOutBar5 = setTimeout(() => bar5.style.display = "flex", 53000); //8s
    timeOutBarNone = setTimeout(noneDisplayProgressBars, 60005); //8s
}

function progressBar() {
    loopAnimationTimerBar = setInterval(animation_bars, 60010);
    animation_bars();
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