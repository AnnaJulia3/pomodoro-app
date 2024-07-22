var focusSessionTimeRange = document.getElementById("focusSessionTimeRange");
var breakSessionTimeRange = document.getElementById("breakSessionTimeRange");

function convertFormattedTimeToSeconds(timeInput) {
  let hourInput = parseInt(timeInput.substring(0, 2));
  let minutesInput = parseInt(timeInput.substring(3, 5));
  let secondsInput = parseInt(timeInput.substring(6, 8));
  secondsInput += hourInput * 3600 + minutesInput * 60;
  return secondsInput;
}

function changeFocusTimeRange(){
  pomodoroTimeInSeconds = convertFormattedTimeToSeconds(focusSessionTimeRange.value);
  changeTypeTimer();
}

function changeBreakTimeRange(){
  breakTimeInSeconds = convertFormattedTimeToSeconds(breakSessionTimeRange.value);
  changeTypeTimer();
}

focusSessionTimeRange.addEventListener("change", changeFocusTimeRange);
breakSessionTimeRange.addEventListener("change", changeBreakTimeRange);