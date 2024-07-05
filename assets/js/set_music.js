// Background audios
var fireAudio = new Audio('./assets/music/background/0_default_sound-of-a-fantastic-warm-fireplace-141728.mp3');
var calmAudio = new Audio('./assets/music/background/calm_game_music_1-49209.mp3');
var clockTickAudio = new Audio('./assets/music/background/clock-tick-76039.mp3');
var lofiAudio = new Audio('./assets/music/background/lofi-chill-medium-version-159456.mp3');
var runningWaterAudio = new Audio('./assets/music/background/the-old-water-mill-meditation-8005.mp3');
var eletronicAudio = new Audio('./assets/music/background/titanium-170190.mp3');

var audioStartPomodoro = new Audio('./assets/music/init_pomodoro/default-decide.mp3');
var audioLosePomodoro = new Audio('./assets/music/lose_pomodoro/game-over-arcade-6435.mp3');
var audioSucessPomodoro = new Audio('./assets/music/sucess_pomodoro/success-1-6297.mp3');
var audioBackground = fireAudio;
var audioEndBreak = new Audio('./assets/music/end_break/alert-sound-loop-189741.mp3');

var audioVolumeGlobal = document.getElementById("audioVolumeGlobal");
var audioVolumeAlarm = document.getElementById("audioVolumeAlarm");
var audioVolumeBackground = document.getElementById("audioVolumeBackground");
var audioVolumeInteraction = document.getElementById("audioVolumeInteraction");
var changeMusicBackground = document.getElementById("changeMusicBackground");

audioEndBreak.loop = true;
audioSucessPomodoro.loop = true;

audioVolumeGlobal.addEventListener("change", () => {
    var newVolume = audioVolumeGlobal.valueAsNumber / 100;

    audioVolumeGlobal.style = "accent-color: #C27600;"
    audioVolumeAlarm.valueAsNumber = audioVolumeGlobal.valueAsNumber;
    audioVolumeBackground.valueAsNumber = audioVolumeGlobal.valueAsNumber;
    audioVolumeInteraction.valueAsNumber = audioVolumeGlobal.valueAsNumber;

    audioStartPomodoro.volume = newVolume;
    audioLosePomodoro.volume = newVolume;
    audioSucessPomodoro.volume = newVolume;
    audioBackground.volume = newVolume;
    audioEndBreak.volume = newVolume;
});

audioVolumeAlarm.addEventListener("change", () => {
    var newVolume = audioVolumeAlarm.valueAsNumber / 100;
    audioSucessPomodoro.volume = newVolume;
    audioEndBreak.volume = newVolume;

    audioVolumeGlobal.style = "accent-color:  #343434;"
});

audioVolumeBackground.addEventListener("change", () => {
    audioBackground.volume = audioVolumeBackground.valueAsNumber / 100;

    audioVolumeGlobal.style = "accent-color:  #343434;"
});

audioVolumeInteraction.addEventListener("change", () => {
    var newVolume = audioVolumeInteraction.valueAsNumber / 100;
    audioStartPomodoro.volume = newVolume;
    audioLosePomodoro.volume = newVolume;

    audioVolumeGlobal.style = "accent-color:  #343434;"
});

changeMusicBackground.addEventListener("change", () => {
    var chooseMusic = changeMusicBackground.value;
    var currentVolume = audioBackground.volume;
    if (!audioBackground.paused) audioBackground.pause();
    switch (chooseMusic) {
        case 'fire':
            audioBackground = fireAudio;
            break;
        case 'calm':
            audioBackground = calmAudio;
            break;
        case 'clockTick':
            audioBackground = clockTickAudio;
            break;
        case 'lofi':
            audioBackground = lofiAudio;
            break;
        case 'runningWater':
            audioBackground = runningWaterAudio;
            break;
        case 'eletronic':
            audioBackground = eletronicAudio;
            break;
        default:
            audioBackground = fireAudio;
    }
    audioBackground.volume = currentVolume;
});