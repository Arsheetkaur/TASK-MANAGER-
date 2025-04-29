// Task Management Object
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
    const lowTasks = document.getElementById('low-tasks');
    const mediumTasks = document.getElementById('medium-tasks');
    const highTasks = document.getElementById('high-tasks');

    lowTasks.innerHTML = '';
    mediumTasks.innerHTML = '';
    highTasks.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.draggable = true;
        li.dataset.priority = task.priority;
        li.innerHTML = `
            <div class="task-content">
                <strong>${task.title}</strong><br>
                <span class="task-notes">${task.notes || ''}</span><br>
                <small>Due: ${task.time || 'No due date'}</small>
            </div>
            <div class="task-actions">
                <button class="complete-btn" onclick="toggleComplete(this)">✓</button>
                <button class="edit-btn" onclick="editTask(this)">✎</button>
                <button class="delete-btn" onclick="deleteTask(this)">✖</button>
            </div>
        `;

        if (task.completed) li.classList.add('completed');

        if (task.priority === 'low') lowTasks.appendChild(li);
        else if (task.priority === 'medium') mediumTasks.appendChild(li);
        else if (task.priority === 'high') highTasks.appendChild(li);

        li.addEventListener('dragstart', handleDragStart);
        li.addEventListener('dragover', handleDragOver);
        li.addEventListener('drop', handleDrop);
    });
}

function addTask() {
    const title = document.getElementById('task-input').value;
    const notes = document.getElementById('task-notes').value;
    const time = document.getElementById('task-time').value;
    const priority = document.getElementById('task-priority').value;

    if (title.trim()) {
        tasks.push({ title, notes, time, priority, completed: false });
        saveTasks();
        renderTasks();
        document.getElementById('task-input').value = '';
        document.getElementById('task-notes').value = '';
        document.getElementById('task-time').value = '';
    }
}

function toggleComplete(button) {
    const li = button.parentElement.parentElement;
    const title = li.querySelector('strong').textContent;
    const task = tasks.find(t => t.title === title);
    task.completed = !task.completed;
    saveTasks();
    renderTasks();
}

function editTask(button) {
    const li = button.parentElement.parentElement;
    const title = li.querySelector('strong').textContent;
    const task = tasks.find(t => t.title === title);
    const newTitle = prompt('Edit task:', task.title);
    const newNotes = prompt('Edit notes:', task.notes);
    const newTime = prompt('Edit due time (YYYY-MM-DDTHH:MM):', task.time);

    if (newTitle) {
        task.title = newTitle.trim();
        task.notes = newNotes || task.notes;
        task.time = newTime || task.time;
        saveTasks();
        renderTasks();
    }
}

function deleteTask(button) {
    const li = button.parentElement.parentElement;
    const title = li.querySelector('strong').textContent;
    tasks = tasks.filter(t => t.title !== title);
    saveTasks();
    renderTasks();
}

// Drag and Drop Functionality
let draggedItem = null;

function handleDragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', draggedItem.dataset.priority);
    setTimeout(() => (draggedItem.style.display = 'none'), 0);
}

function handleDragOver(e) {
    e.preventDefault();
}

function handleDrop(e) {
    e.preventDefault();
    const priority = e.dataTransfer.getData('text/plain');
    const newPriority = e.target.closest('.priority-box').id.replace('-box', '');
    const title = draggedItem.querySelector('strong').textContent;
    const task = tasks.find(t => t.title === title);

    if (task && task.priority !== newPriority) {
        task.priority = newPriority;
        saveTasks();
        renderTasks();
    }
    draggedItem.style.display = 'flex';
    draggedItem = null;
}

document.querySelectorAll('.priority-box').forEach(box => {
    box.addEventListener('dragover', handleDragOver);
    box.addEventListener('drop', handleDrop);
});

document.addEventListener('dragend', () => {
    if (draggedItem) draggedItem.style.display = 'flex';
    draggedItem = null;
});

// Initial Render
renderTasks();