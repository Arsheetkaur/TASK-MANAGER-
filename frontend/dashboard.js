// Simulated Task Stats
const completed = 12;
const inProgress = 5;
const pending = 3;

// Set values
document.getElementById("tasksCompleted").textContent = completed;
document.getElementById("tasksInProgress").textContent = inProgress;
document.getElementById("pendingTasks").textContent = pending;

// Calculate progress
const totalTasks = completed + inProgress + pending;
const completionRate = totalTasks === 0 ? 0 : Math.round((completed / totalTasks) * 100);

// Update Progress Bar
`document.getElementById("progressBar").style.width = ${completionRate}%`;
`document.getElementById("progressText").textContent = ${completionRate}% Completed`;''