const tasks = [
    {
      title: "Design Login Page",
      description: "Create a responsive UI for login with validation",
      priority: "High",
      due: "2025-04-20",
      status: "To Do"
    },
    {
      title: "Fix Navbar Bug",
      description: "Responsive navbar issue on mobile",
      priority: "Medium",
      due: "2025-04-17",
      status: "In Progress"
    },
    {
      title: "Add Dark Mode",
      description: "Implement toggle button and styling",
      priority: "Low",
      due: "2025-04-22",
      status: "To Do"
    }
  ];
  
  const container = document.getElementById("taskContainer");
  
  tasks.forEach(task => {
    const card = document.createElement("div");
    card.className = "task-card";
  
    const priorityClass = {
      Low: "priority-low",
      Medium: "priority-medium",
      High: "priority-high"
    };
  
    card.innerHTML = `
      <span class="status">${task.status}</span>
      <h3>${task.title}</h3>
      <p class="description">${task.description}</p>
      <div>
        <span class="badge ${priorityClass[task.priority]}">${task.priority} Priority</span>
        <span class="badge">Due: ${task.due}</span>
      </div>
    `;
  
    container.appendChild(card);
  });