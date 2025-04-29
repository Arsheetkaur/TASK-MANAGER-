let settings = { theme: 'light' };
let timerState = {
    isRunning: false,
    isWorkSession: true,
    timeLeft: 25 * 60, // Default 25 minutes in seconds
    totalTime: 25 * 60,
    workDuration: 25,
    breakDuration: 5,
    points: 0,
    streak: 0,
    sessions: 0,
    badges: []
};

const badges = [
    { id: 1, name: "Pomodoro Novice", sessions: 5, points: 50, icon: "🌟" },
    { id: 2, name: "Pomodoro Pro", sessions: 10, points: 100, icon: "🏆" },
    { id: 3, name: "Focus Master", sessions: 20, points: 200, icon: "🔥" }
];

let timerInterval = null;

// Progress ring setup
const ring = document.querySelector('.progress-ring__circle');
const radius = ring.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
ring.style.strokeDasharray = `${circumference} ${circumference}`;
ring.style.strokeDashoffset = circumference;

// Load settings and timer state from localStorage
function loadData() {
    const savedSettings = localStorage.getItem('taskFlowSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }

    const savedTimerState = localStorage.getItem('taskFlowPomodoro');
    if (savedTimerState) {
        timerState = JSON.parse(savedTimerState);
        document.getElementById('workDuration').value = timerState.workDuration;
        document.getElementById('breakDuration').value = timerState.breakDuration;
        timerState.totalTime = timerState.isWorkSession ? timerState.workDuration * 60 : timerState.breakDuration * 60;
        updateTimerDisplay();
    }

    const savedAnalytics = localStorage.getItem('taskFlowAnalyticsData');
    if (savedAnalytics) {
        const analytics = JSON.parse(savedAnalytics);
        timerState.points = analytics.points || 0;
        timerState.sessions = analytics.pomodoroSessions || 0;
    }

    applyTheme();
    renderStats();
}

// Save timer state and analytics to localStorage
function saveData() {
    localStorage.setItem('taskFlowPomodoro', JSON.stringify(timerState));
    const analyticsData = {
        tasksCompleted: 0,
        points: timerState.points,
        pomodoroSessions: timerState.sessions
    };
    localStorage.setItem('taskFlowAnalyticsData', JSON.stringify(analyticsData));
}

// Apply theme (light/dark)
function applyTheme() {
    const body = document.body;
    const header = document.querySelector('.header');
    const footer = document.querySelector('.main-footer');
    const cards = document.querySelectorAll('.timer-card, .stats-card, .achievement-content');

    if (settings.theme === 'dark') {
        body.classList.add('dark-mode');
        body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #3c3c3c 100%)';
        if (header) header.style.background = '#2c2c2c';
        if (footer) footer.style.background = '#1a1a1a';
        cards.forEach(card => {
            card.style.background = '#2c2c2c';
            card.style.color = '#fff';
        });
    } else {
        body.classList.remove('dark-mode');
        body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        if (header) header.style.background = '#fff';
        if (footer) footer.style.background = '#2c3e50';
        cards.forEach(card => {
            card.style.background = '#fff';
            card.style.color = '#333';
        });
    }
}

// Update timer display
function updateTimerDisplay() {
    const minutes = Math.floor(timerState.timeLeft / 60);
    const seconds = timerState.timeLeft % 60;
    document.getElementById('timer').textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    document.getElementById('sessionType').textContent = timerState.isWorkSession ? 'Work Session' : 'Break Session';

    // Update progress ring
    const progress = (timerState.timeLeft / timerState.totalTime) * circumference;
    ring.style.strokeDashoffset = progress;

    // Add active class for animation
    const timerCard = document.querySelector('.timer-card');
    const timerDisplay = document.querySelector('.timer-display');
    if (timerState.isRunning) {
        timerCard.classList.add('active');
        timerDisplay.classList.add('active');
    } else {
        timerCard.classList.remove('active');
        timerDisplay.classList.remove('active');
    }
}

// Start the timer
function startTimer() {
    if (!timerState.isRunning) {
        timerState.isRunning = true;
        timerState.workDuration = parseInt(document.getElementById('workDuration').value) || 25;
        timerState.breakDuration = parseInt(document.getElementById('breakDuration').value) || 5;
        timerState.totalTime = timerState.isWorkSession ? timerState.workDuration * 60 : timerState.breakDuration * 60;
        timerInterval = setInterval(() => {
            if (timerState.timeLeft > 0) {
                timerState.timeLeft--;
                updateTimerDisplay();
            } else {
                completeSession();
            }
        }, 1000);
    }
}

// Pause the timer
function pauseTimer() {
    if (timerState.isRunning) {
        timerState.isRunning = false;
        clearInterval(timerInterval);
        updateTimerDisplay();
    }
}

// Reset the timer
function resetTimer() {
    timerState.isRunning = false;
    clearInterval(timerInterval);
    timerState.timeLeft = timerState.isWorkSession ? timerState.workDuration * 60 : timerState.breakDuration * 60;
    timerState.totalTime = timerState.timeLeft;
    updateTimerDisplay();
}

// Complete a session
function completeSession() {
    timerState.isRunning = false;
    clearInterval(timerInterval);

    // Award points and increment streak
    if (timerState.isWorkSession) {
        timerState.points += 10;
        timerState.streak += 1;
        timerState.sessions += 1;
    } else {
        timerState.points += 5;
    }

    // Trigger confetti
    triggerConfetti();

    // Check for badge unlocks
    checkBadges();

    // Switch session type
    timerState.isWorkSession = !timerState.isWorkSession;
    timerState.timeLeft = timerState.isWorkSession ? timerState.workDuration * 60 : timerState.breakDuration * 60;
    timerState.totalTime = timerState.timeLeft;

    saveData();
    updateTimerDisplay();
    renderStats();
    showConfirmation(timerState.isWorkSession ? 'Work session completed! 10 points earned!' : 'Break session completed! 5 points earned!');
}

// Trigger confetti celebration
function triggerConfetti() {
    confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#007bff', '#28a745', '#ffc107']
    });
}

// Check for badge unlocks
function checkBadges() {
    badges.forEach(badge => {
        if (timerState.sessions >= badge.sessions && !timerState.badges.includes(badge.id)) {
            timerState.badges.push(badge.id);
            timerState.points += badge.points;
            showAchievementModal(badge);
            triggerConfetti();
        }
    });
    saveData();
}

// Show achievement modal
function showAchievementModal(badge) {
    const modal = document.getElementById('achievementModal');
    const badgeIcon = document.getElementById('badgeIcon');
    const badgeName = document.getElementById('badgeName');
    const badgePoints = document.getElementById('badgePoints');

    badgeIcon.textContent = badge.icon;
    badgeName.textContent = badge.name;
    badgePoints.textContent = `+${badge.points} Points`;

    modal.style.display = 'flex';
    setTimeout(() => {
        modal.classList.add('show');
    }, 10);
}

// Close achievement modal
function closeAchievementModal() {
    const modal = document.getElementById('achievementModal');
    modal.classList.remove('show');
    setTimeout(() => {
        modal.style.display = 'none';
    }, 300);
}

// Render stats and badges
function renderStats() {
    document.getElementById('points').textContent = timerState.points;
    document.getElementById('streak').textContent = timerState.streak;
    document.getElementById('sessions').textContent = timerState.sessions;

    const badgeList = document.getElementById('badgeList');
    badgeList.innerHTML = '';
    timerState.badges.forEach((badgeId, index) => {
        const badge = badges.find(b => b.id === badgeId);
        if (badge) {
            const li = document.createElement('li');
            li.textContent = `${badge.name} (${badge.points} Points)`;
            li.style.animationDelay = `${index * 0.1}s`;
            badgeList.appendChild(li);
        }
    });
}

// Show confirmation message
function showConfirmation(message) {
    const confirmation = document.getElementById('confirmationMessage');
    confirmation.textContent = message;
    confirmation.style.display = 'block';
    confirmation.classList.add('show');
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 500);
    }, 2000);
}

// Animate timer and stats cards on page load
function animateCards() {
    const timerCard = document.querySelector('.timer-card');
    const statsCard = document.querySelector('.stats-card');
    timerCard.classList.add('animate');
    setTimeout(() => {
        statsCard.classList.add('animate');
    }, 200);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    animateCards();
});