const bar1 = document.getElementById("cub1");
const bar2 = document.getElementById("cub2");
const bar3 = document.getElementById("cub3");
const bar4 = document.getElementById("cub4");
const bar5 = document.getElementById("cub5");
let loopAnimationTimer;

var timeOutBar1, timeOutBar2, timeOutBar3, timeOutBar4, timeOutBar5, timeOutBarNone;
function animation1(){
    timeOutBar1 = setTimeout(() => bar1.style.display = "flex", 15); //8s
    timeOutBar2 = setTimeout(() => bar2.style.display = "flex", 8000); //22-8 14s
    timeOutBar3 = setTimeout(() => bar3.style.display = "flex", 22500); //17s
    timeOutBar4 = setTimeout(() => bar4.style.display = "flex", 38000);
    timeOutBar5 = setTimeout(() => bar5.style.display = "flex", 53000); //8s
    timeOutBarNone = setTimeout(noneDisplayProgress, 60005); //8s
}

function progressBar(){
    loopAnimationTimer = setInterval(animation1, 60010);
    animation1();
}

function noneDisplayProgress(){
    bar1.style.display="none";
    bar2.style.display="none";
    bar3.style.display="none";
    bar4.style.display="none";
    bar5.style.display="none";
}

function stopProgressBar(){
    clearInterval(loopAnimationTimer);
    clearTimeout(timeOutBar1);
    clearTimeout(timeOutBar2);
    clearTimeout(timeOutBar3);
    clearTimeout(timeOutBar4);
    clearTimeout(timeOutBar5);
    clearTimeout(timeOutBarNone);
    noneDisplayProgress();
}