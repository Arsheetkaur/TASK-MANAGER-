// Add at the beginning of your pomodoro.js file
function getPomodoroDuration() {
    const savedDuration = localStorage.getItem('pomoDuration');
    return savedDuration ? parseInt(savedDuration) : 25; // default to 25 if not set
}

// Initialize variables
let timer;
let isRunning = false;
let timeLeft;
let progress = 0;
const timeDisplay = document.getElementById("time-display");
const progressBar = document.getElementById("progress");
const startButton = document.getElementById("start-btn");
const resetButton = document.getElementById("reset-btn");

// Modify your timer initialization to use the saved duration
function initializeTimer() {
    const minutes = getPomodoroDuration();
    timeLeft = minutes * 60; // Convert to seconds
    updateDisplay();
}

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
        if (timeLeft <= 0) {
            clearInterval(timer);
            alert("Time's up! Take a break.");
            resetTimer();
        } else {
            timeLeft--;
        }

        updateDisplay();
        updateProgressBar();
    }, 1000);
}

// Update the display with current time
function updateDisplay() {
    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;
    let displayMinutes = minutes < 10 ? "0" + minutes : minutes;
    let displaySeconds = seconds < 10 ? "0" + seconds : seconds;
    timeDisplay.textContent = `${displayMinutes}:${displaySeconds}`;
}

// Update the progress bar
function updateProgressBar() {
    const totalDuration = getPomodoroDuration() * 60; // Convert to seconds
    progress = (1 - timeLeft / totalDuration) * 100;
    progressBar.style.width = `${progress}%`;
}

// Reset the timer
function resetTimer() {
    clearInterval(timer);
    isRunning = false;
    initializeTimer();
    progress = 0;
    updateProgressBar();
    startButton.textContent = "Start";
}

// Event listeners
startButton.addEventListener("click", toggleTimer);
resetButton.addEventListener("click", resetTimer);

// Make sure to call initializeTimer when the page loads
window.addEventListener('load', initializeTimer);