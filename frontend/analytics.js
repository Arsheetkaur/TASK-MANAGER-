// Get real data from localStorage
function getProductivityStats() {
    // Get completed tasks
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    const tasksCompleted = completedTasks.length;

    // Get pomodoro stats
    const completedPomodoros = parseInt(localStorage.getItem('completedPomodoros')) || 0;
    
    // Calculate total focus time in minutes
    const totalFocusTime = parseInt(localStorage.getItem('totalFocusTime')) || 0;

    return {
        tasksCompleted,
        completedPomodoros,
        totalFocusTime
    };
}

// Update stats display
function updateStatsDisplay() {
    const stats = getProductivityStats();

    // Update stat boxes
    document.getElementById("totalTasks").textContent = stats.tasksCompleted;
    document.getElementById("totalPomos").textContent = stats.completedPomodoros;
    document.getElementById("totalFocus").textContent = `${stats.totalFocusTime} mins`;

    // Update chart
    const ctx = document.getElementById("productivityChart").getContext("2d");
    new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Tasks", "Pomodoros", "Focus (mins)"],
            datasets: [{
                label: "Your Progress",
                data: [
                    stats.tasksCompleted, 
                    stats.completedPomodoros, 
                    stats.totalFocusTime
                ],
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
}

// Mark a task as complete
function completeTask(taskId) {
    const completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
    completedTasks.push({
        id: taskId,
        completedAt: new Date().toISOString()
    });
    localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
    // ...rest of your task completion code...
}

// Update stats when page loads
window.addEventListener('load', updateStatsDisplay);

// Update stats every minute to keep data fresh
setInterval(updateStatsDisplay, 60000);