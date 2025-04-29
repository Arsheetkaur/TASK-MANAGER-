// Task Management Object
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
s

document.addEventListener('dragend', () => {
    if (draggedItem) draggedItem.style.display = 'flex';
    draggedItem = null;
});

// Initial Render
renderTasks();