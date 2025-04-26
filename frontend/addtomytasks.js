document.addEventListener('DOMContentLoaded', () => {
    console.log('Add Task page loaded');
    checkAuth();

    const addTaskForm = document.getElementById('addTaskForm');
    if (addTaskForm) {
        addTaskForm.addEventListener('submit', (event) => {
            event.preventDefault();
            addTask();
        });
    } else {
        console.error('Add task form not found');
    }
});

// Check authentication status
function checkAuth() {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        const authPrompt = document.getElementById('authPrompt');
        const taskForm = document.getElementById('taskForm');
        const addTaskButton = document.getElementById('addTaskButton');

        if (!authPrompt || !taskForm || !addTaskButton) {
            console.error('Task form elements missing:', { authPrompt, taskForm, addTaskButton });
            return;
        }

        if (user.email) {
            console.log('User authenticated:', user);
            authPrompt.style.display = 'none';
            taskForm.style.display = 'block';
            addTaskButton.disabled = false;
        } else {
            console.log('No valid user found in localStorage');
            authPrompt.style.display = 'block';
            taskForm.style.display = 'none';
            addTaskButton.disabled = true;
        }
    } catch (error) {
        console.error('Error in checkAuth:', error);
    }
}

// Add a task
function addTask() {
    try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user.email) {
            console.warn('User not authenticated');
            alert('Please log in to add tasks.');
            return;
        }

        const taskInput = document.getElementById('taskInput');
        const priorityInput = document.getElementById('priorityInput');
        const dueDateInput = document.getElementById('dueDateInput');

        if (!taskInput || !priorityInput || !dueDateInput) {
            console.error('Task input elements missing:', { taskInput, priorityInput, dueDateInput });
            return;
        }

        const description = taskInput.value.trim();
        const priority = priorityInput.value;
        const dueDate = dueDateInput.value;

        if (!description || !dueDate) {
            console.warn('Invalid task input');
            alert('Please fill in all fields.');
            return;
        }

        // Validate due date (not in the past)
        const today = new Date().toISOString().split('T')[0];
        if (dueDate < today) {
            console.warn('Invalid due date');
            alert('Due date cannot be in the past.');
            return;
        }

        let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        const newTask = {
            id: Date.now().toString(),
            description,
            priority,
            dueDate,
            completed: false,
            userEmail: user.email
        };

        tasks.push(newTask);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log('Task added:', newTask);

        // Clear form
        taskInput.value = '';
        dueDateInput.value = '';
        priorityInput.value = 'Low';

        // Show success message and redirect option
        alert('Task added successfully!');
        if (confirm('View your tasks now?')) {
            window.location.href = 'tasks.html';
        }
    } catch (error) {
        console.error('Error in addTask:', error);
        alert('Failed to add task. Please try again.');
    }
}