// Background audios
var fireAudio = document.getElementById("fireAudio");
// new Audio(
//   "./assets/music/background/0_default_sound-of-a-fantastic-warm-fireplace-141728.mp3"
// );
var calmAudio = document.getElementById("calmAudio");
//  new Audio(
//   "./assets/music/background/calm_game_music_1-49209.mp3"
// );
var clockTickAudio = document.getElementById("clockTickAudio");
// new Audio(
//   "./assets/music/background/clock-tick-76039.mp3"
// );
var loFiChillAudio = document.getElementById("loFiChillAudio");
// new Audio(
//   "./assets/music/background/lo-fi-chill-medium-version-159456.mp3"
// );
var runningWaterAudio = document.getElementById("runningWaterAudio");
// new Audio(
//   "./assets/music/background/the-old-water-mill-meditation-8005.mp3"
// );
var electronicAudio = document.getElementById("electronicAudio");
// new Audio("./assets/music/background/titanium-170190.mp3");

var audioStartPomodoro = document.getElementById("audioStartPomodoro");
// new Audio(
//   "./assets/music/init_pomodoro/default-decide.mp3"
// );
var audioLosePomodoro = document.getElementById("audioLosePomodoro");
// new Audio(
//   "./assets/music/lose_pomodoro/game-over-arcade-6435.mp3"
// );
var audioSuccessPomodoro = document.getElementById("audioSuccessPomodoro");
// new Audio(
//   "./assets/music/success_pomodoro/success-1-6297.mp3"
// );

var audioBackground = fireAudio;
// var audioBackground = audioSuccessPomodoro;

var audioEndBreak = document.getElementById("audioEndBreak");
// new Audio(
//   "./assets/music/end_break/alert-sound-loop-189741.mp3"
// );

var audioVolumeGlobal = document.getElementById("audioVolumeGlobal");
var audioVolumeAlarm = document.getElementById("audioVolumeAlarm");
var audioVolumeBackground = document.getElementById("audioVolumeBackground");
var audioVolumeInteraction = document.getElementById("audioVolumeInteraction");
var changeMusicBackground = document.getElementById("changeMusicBackground");

// audioEndBreak.loop = true;
// audioSuccessPomodoro.loop = true;

audioVolumeGlobal.addEventListener("change", () => {
  var newVolume = audioVolumeGlobal.valueAsNumber / 100;

  audioVolumeGlobal.style = "accent-color: #C27600;";
  audioVolumeAlarm.valueAsNumber = audioVolumeGlobal.valueAsNumber;
  audioVolumeBackground.valueAsNumber = audioVolumeGlobal.valueAsNumber;
  audioVolumeInteraction.valueAsNumber = audioVolumeGlobal.valueAsNumber;

  audioStartPomodoro.volume = newVolume;
  audioLosePomodoro.volume = newVolume;
  audioSuccessPomodoro.volume = newVolume;
  audioBackground.volume = newVolume;
  audioEndBreak.volume = newVolume;
});

audioVolumeAlarm.addEventListener("change", () => {
  var newVolume = audioVolumeAlarm.valueAsNumber / 100;
  audioSuccessPomodoro.volume = newVolume;
  audioEndBreak.volume = newVolume;

  audioVolumeGlobal.style = "accent-color:  #343434;";
});

audioVolumeBackground.addEventListener("change", () => {
  audioBackground.volume = audioVolumeBackground.valueAsNumber / 100;

  audioVolumeGlobal.style = "accent-color:  #343434;";
});

audioVolumeInteraction.addEventListener("change", () => {
  var newVolume = audioVolumeInteraction.valueAsNumber / 100;
  audioStartPomodoro.volume = newVolume;
  audioLosePomodoro.volume = newVolume;

  audioVolumeGlobal.style = "accent-color:  #343434;";
});

changeMusicBackground.addEventListener("change", () => {
  var chooseMusic = changeMusicBackground.value;
  var currentVolume = audioBackground.volume;
  if (!audioBackground.paused) audioBackground.pause();
  switch (chooseMusic) {
    case "fire":
      audioBackground = fireAudio;
      break;
    case "calm":
      audioBackground = calmAudio;
      break;
    case "clockTick":
      audioBackground = clockTickAudio;
      break;
    case "loFiChill":
      audioBackground = loFiChillAudio;
      break;
    case "runningWater":
      audioBackground = runningWaterAudio;
      break;
    case "electronic":
      audioBackground = electronicAudio;
      break;
    default:
      audioBackground = fireAudio;
  }
  audioBackground.load();
  audioBackground.volume = currentVolume;
});

function setPlayAudio(audioToStart) {
  let playPromise = audioToStart.play();
  if (playPromise !== undefined) {
    playPromise.catch((error) => {
      stopTimer();
      controlPlayTimer.checked = false;
      alert("Não foi possível reproduzir o áudio. Recarregue!");
    });
  }
}
