// Function to add a new task
function addTask() {
    // Get the task input values
    const taskTitle = document.getElementById("task-title").value;
    const taskNotes = document.getElementById("task-notes").value;
    const taskDueDate = document.getElementById("task-due-date").value;
    const taskPriority = document.getElementById("task-priority").value;
  
    // Check if the title is empty
    if (taskTitle === "") {
        alert("Please enter a task title.");
        return;
    }
  
    // Create a new task object
    const task = {
        title: taskTitle,
        notes: taskNotes,
        dueDate: taskDueDate,
        priority: taskPriority,
    };
  
    // Get the task container based on the priority selected
    `const taskContainer = document.getElementById(${taskPriority}-box).querySelector('ul')`;
  
    // Create a new list item (task element) with all the details
    const taskElement = document.createElement("li");
    taskElement.classList.add("task-item");
  
    // Adding task details
    taskElement.innerHTML = `
        <div class="task-details">
            <h3>${task.title}</h3>
            <p>${task.notes || "No notes added"}</p>
            <span>Due: ${task.dueDate || "No due date"}</span>
        </div>
        <button class="delete-btn" onclick="deleteTask(this)">Delete</button>
    `;
  
    // Append the task to the correct priority list
    taskContainer.appendChild(taskElement);
  
    // Clear the input fields after adding the task
    clearInputs();
  }
  
  // Function to delete a task
  function deleteTask(button) {
    // Remove the task from the DOM
    button.parentElement.remove();
  }
  
  // Function to clear the input fields
  function clearInputs() {
    document.getElementById("task-title").value = "";
    document.getElementById("task-notes").value = "";
    document.getElementById("task-due-date").value = "";
    document.getElementById("task-priority").value = "low";  // Default priority
  }
  
  // Attach the addTask function to the "Add Task" button
  document.getElementById("add-task-btn").addEventListener("click", addTask);