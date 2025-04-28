let analyticsData = {
  tasksCompleted: 0,
  points: 0,
  pomodoroSessions: 0,
  dailyTasks: Array(7).fill(0), // Last 7 days of task completions
  dailyPomodoro: Array(7).fill(0), // Last 7 days of Pomodoro sessions
  daysActive: 0
};

// Load analytics data from localStorage
function loadAnalyticsData() {
  const savedData = localStorage.getItem('taskFlowAnalyticsData');
  if (savedData) {
      analyticsData = JSON.parse(savedData);
  }
}

// Save analytics data to localStorage
function saveAnalyticsData() {
  localStorage.setItem('taskFlowAnalyticsData', JSON.stringify(analyticsData));
}

// Update metrics display
function updateMetrics() {
  const avgTasks = analyticsData.daysActive > 0 ? (analyticsData.tasksCompleted / analyticsData.daysActive).toFixed(1) : 0;
  document.getElementById('totalTasks').textContent = analyticsData.tasksCompleted;
  document.getElementById('avgTasks').textContent = avgTasks;
  document.getElementById('pointsEarned').textContent = analyticsData.points;
  document.getElementById('pomodoroSessions').textContent = analyticsData.pomodoroSessions;
}

// Render charts using Chart.js
function renderCharts() {
  const tasksCtx = document.getElementById('tasksChart').getContext('2d');
  const pomodoroCtx = document.getElementById('pomodoroChart').getContext('2d');

  new Chart(tasksCtx, {
      type: 'line',
      data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [{
              label: 'Tasks Completed',
              data: analyticsData.dailyTasks,
              borderColor: '#007bff',
              backgroundColor: 'rgba(0, 123, 255, 0.1)',
              fill: true,
              tension: 0.4
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: { beginAtZero: true }
          }
      }
  });

  new Chart(pomodoroCtx, {
      type: 'bar',
      data: {
          labels: ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7'],
          datasets: [{
              label: 'Pomodoro Sessions',
              data: analyticsData.dailyPomodoro,
              backgroundColor: '#28a745',
              borderColor: '#28a745',
              borderWidth: 1
          }]
      },
      options: {
          responsive: true,
          scales: {
              y: { beginAtZero: true }
          }
      }
  });
}

// Animate metric and chart cards on page load
function animateCards() {
  const cards = document.querySelectorAll('.metric-card, .chart-card');
  cards.forEach((card, index) => {
      setTimeout(() => {
          card.classList.add('animate');
      }, index * 200); // Stagger animations by 200ms
  });
}

// Simulate user actions (for demo purposes)
function simulateUserActions() {
  analyticsData.tasksCompleted += 25;
  analyticsData.points += 500;
  analyticsData.pomodoroSessions += 10;
  analyticsData.daysActive = 7;
  analyticsData.dailyTasks = [3, 5, 2, 4, 6, 1, 4]; // Simulated task completions
  analyticsData.dailyPomodoro = [1, 2, 0, 3, 2, 1, 1]; // Simulated Pomodoro sessions
  saveAnalyticsData();
  updateMetrics();
  renderCharts();
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
  loadAnalyticsData();
  updateMetrics();
  renderCharts();
  animateCards();

  // Simulate user actions for demo (replace with real data in production)
  setTimeout(() => {
      simulateUserActions();
  }, 1000);
});