// Initialize variables
let timer;
let isRunning = false;
let minutes = 25;  // Pomodoro work duration in minutes
let seconds = 0;
let progress = 0;
let timerDuration = minutes * 60 * 1000;  // Convert to milliseconds
const timeDisplay = document.getElementById("time-display");
const progressBar = document.getElementById("progress");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");

// Start or pause the timer
function toggleTimer() {
    if (isRunning) {
        clearInterval(timer);
        startButton.textContent = "Start";
    } else {
        startButton.textContent = "Pause";
        startTimer();
    }
    isRunning = !isRunning;
}

// Start the Pomodoro timer
function startTimer() {
    timer = setInterval(() => {
        if (seconds === 0 && minutes === 0) {
            clearInterval(timer);
            alert("Time's up! Take a break.");
            resetTimer();
        } else if (seconds === 0) {
            minutes--;
            seconds = 59;
        } else {
            seconds--;
        }

        updateDisplay();
        updateProgressBar();
    }, 1000);
}

// Update the display with current time
function updateDisplay() {
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    `timeDisplay.textContent = ${displayMinutes}:${displaySeconds}`;
}

// Update the progress bar
function updateProgressBar() {
    progress = (1 - (minutes * 60 + seconds) / (timerDuration / 1000)) * 100;
    `progressBar.style.width = ${progress}%`;
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    minutes = 25;
    seconds = 0;
    progress = 0;
    updateDisplay();
    updateProgressBar();
    startButton.textContent = "Start";
}

// Event listeners
startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);