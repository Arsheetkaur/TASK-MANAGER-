let timer;
let timeLeft = 1500; // default 25 minutes
let running = false;
let currentMode = "pomodoro"; // default

const timerDisplay = document.getElementById("timerDisplay");

const modes = {
  pomodoro: 25 * 60,
  shortBreak: 5 * 60,
  longBreak: 15 * 60,
};

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timeLeft % 60).toString().padStart(2, "0");
  `timerDisplay.textContent = ${minutes}:${seconds}`;
}

function startPauseTimer() {
  if (running) {
    clearInterval(timer);
    running = false;
  } else {
    running = true;
    timer = setInterval(() => {
      if (timeLeft > 0) {
        timeLeft--;
        updateDisplay();
      } else {
        clearInterval(timer);
        running = false;
        playSound();
        alert("Time's up!");
      }
    }, 1000);
  }
}

function resetTimer() {
  clearInterval(timer);
  running = false;
  timeLeft = modes[currentMode];
  updateDisplay();
}

function setMode(mode) {
  currentMode = mode;
  resetTimer();
}

function playSound() {
  const audio = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");
  audio.play();
}

updateDisplay();