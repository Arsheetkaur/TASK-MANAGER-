<<<<<<< HEAD
// Fetching mock data (replace with actual localStorage if available)
const tasksCompleted = parseInt(localStorage.getItem("tasksCompleted")) || 8;
const pomosCompleted = parseInt(localStorage.getItem("pomosCompleted")) || 12;
const totalFocusTime = pomosCompleted * 25; // Each pomodoro = 25 minutes

// Update the stat boxes in the HTML
document.getElementById("totalTasks").textContent = tasksCompleted;
document.getElementById("totalPomos").textContent = pomosCompleted;
document.getElementById("totalFocus").textContent = `${totalFocusTime} mins`;

// Create the productivity chart
=======
// Mock data (replace with localStorage or real data if available)
const tasksCompleted = localStorage.getItem("tasksCompleted") || 8;
const pomosCompleted = localStorage.getItem("pomosCompleted") || 12;
const totalFocusTime = pomosCompleted * 25; // Each pomo = 25 min

// Update the stat boxes
document.getElementById("totalTasks").textContent = tasksCompleted;
document.getElementById("totalPomos").textContent = pomosCompleted;
`document.getElementById("totalFocus").textContent = ${totalFocusTime} mins`;

// Chart
>>>>>>> 3a354718559449c2cae3c9bda687152bf4f2d0d1
const ctx = document.getElementById("productivityChart").getContext("2d");
new Chart(ctx, {
  type: "bar",
  data: {
<<<<<<< HEAD
    labels: ["Tasks", "Pomodoros", "Focus Time (mins)"],
    datasets: [{
      label: "This Week's Progress",
      data: [tasksCompleted, pomosCompleted, totalFocusTime],
      backgroundColor: ["#007bff", "#28a745", "#ffc107"],
      borderColor: ["#0056b3", "#1c7430", "#e0a800"],
      borderWidth: 1
=======
    labels: ["Tasks", "Pomodoros", "Focus (mins)"],
    datasets: [{
      label: "This Week",
      data: [tasksCompleted, pomosCompleted, totalFocusTime],
      backgroundColor: ["#007bff", "#28a745", "#ffc107"]
>>>>>>> 3a354718559449c2cae3c9bda687152bf4f2d0d1
    }]
  },
  options: {
    responsive: true,
    scales: {
      y: {
        beginAtZero: true
      }
<<<<<<< HEAD
    },
    plugins: {
      legend: {
        position: 'top'
      },
      tooltip: {
        enabled: true
      }
=======
>>>>>>> 3a354718559449c2cae3c9bda687152bf4f2d0d1
    }
  }
});