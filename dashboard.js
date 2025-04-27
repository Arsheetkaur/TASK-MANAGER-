let tasks = [];
let achievements = [
    { id: 1, name: "First Task Completed", points: 50, criteria: { tasksCompleted: 1 } },
    { id: 2, name: "Team Player", points: 100, criteria: { collaborations: 1 } },
    { id: 3, name: "Task Master", points: 150, criteria: { tasksCompleted: 10 } },
    { id: 4, name: "Pomodoro Pro", points: 200, criteria: { pomodoroSessions: 5 } }
];
let userData = { points: 0, achievementsUnlocked: [], tasksCompleted: 0, collaborations: 0, pomodoroSessions: 0 };
let analyticsData = { tasksCompleted: 0, points: 0, pomodoroSessions: 0 };
let teams = [];

// Load data from localStorage
function loadData() {
    const savedTasks = localStorage.getItem('taskFlowTasks');
    if (savedTasks) tasks = JSON.parse(savedTasks);

    const savedUserData = localStorage.getItem('taskFlowUserData');
    if (savedUserData) userData = JSON.parse(savedUserData);

    const savedAnalyticsData = localStorage.getItem('taskFlowAnalyticsData');
    if (savedAnalyticsData) analyticsData = JSON.parse(savedAnalyticsData);

    const savedTeams = localStorage.getItem('taskFlowTeams');
    if (savedTeams) teams = JSON.parse(savedTeams);
}

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('taskFlowTasks', JSON.stringify(tasks));
}

// Mark a task as completed
function completeTask(id) {
    const task = tasks.find(t => t.id === id);
    if (task) {
        task.completed = true;
        userData.tasksCompleted += 1;
        localStorage.setItem('taskFlowUserData', JSON.stringify(userData));
        saveTasks();
        renderTasks();
    }
}

// Render tasks
function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    const recentTasks = tasks.slice(0, 3); // Show up to 3 recent tasks
    recentTasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.title}</span>
            ${!task.completed ? `<button onclick="completeTask(${task.id})">Complete</button>` : ''}
        `;
        taskList.appendChild(li);
    });
    document.getElementById('totalTasks').textContent = tasks.length;
}

// Render achievements
function renderAchievements() {
    const achievementList = document.getElementById('achievementList');
    achievementList.innerHTML = '';
    const unlockedAchievements = achievements.filter(a => userData.achievementsUnlocked.includes(a.id)).slice(0, 3); // Show up to 3
    unlockedAchievements.forEach(achievement => {
        const li = document.createElement('li');
        li.textContent = `${achievement.name} (${achievement.points} Points)`;
        achievementList.appendChild(li);
    });
}

// Render analytics
function renderAnalytics() {
    document.getElementById('pointsEarned').textContent = analyticsData.points;
    document.getElementById('pomodoroSessions').textContent = analyticsData.pomodoroSessions;
}

// Render teams
function renderTeams() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';
    const recentTeams = teams.slice(0, 3); // Show up to 3 recent teams
    recentTeams.forEach(team => {
        const li = document.createElement('li');
        li.textContent = `${team.name} (${team.members.length} Members, ${team.tasks.length} Tasks)`;
        teamList.appendChild(li);
    });
}

// Animate dashboard cards on page load
function animateCards() {
    const cards = document.querySelectorAll('.dashboard-card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('animate');
        }, index * 200); // Stagger animations by 200ms
    });
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadData();
    renderTasks();
    renderAchievements();
    renderAnalytics();
    renderTeams();
    animateCards();
});