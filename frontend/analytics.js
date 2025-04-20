// Mock data (replace with localStorage or real data if available)
const tasksCompleted = localStorage.getItem("tasksCompleted") || 8;
const pomosCompleted = localStorage.getItem("pomosCompleted") || 12;
const totalFocusTime = pomosCompleted * 25; // Each pomo = 25 min

// Update the stat boxes
document.getElementById("totalTasks").textContent = tasksCompleted;
document.getElementById("totalPomos").textContent = pomosCompleted;
`document.getElementById("totalFocus").textContent = ${totalFocusTime} mins`;

// Chart
const ctx = document.getElementById("productivityChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Tasks", "Pomodoros", "Focus (mins)"],
    datasets: [{
      label: "This Week",
      data: [tasksCompleted, pomosCompleted, totalFocusTime],
      backgroundColor: ["#007bff", "#28a745", "#ffc107"]
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
    }
  }
});