// Calendar Management Object
let currentDate = new Date();
let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

// Render the calendar
function renderCalendar() {
    const monthYear = document.getElementById('month-year');
    const calendarDays = document.getElementById('calendar-days');
    const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDay = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDays = lastDay.getDate();
    const firstDayIndex = firstDay.getDay();
    const lastDayIndex = lastDay.getDay();

    monthYear.textContent = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' });

    calendarDays.innerHTML = '';

    // Add empty days before the first day of the month
    for (let i = 0; i < firstDayIndex; i++) {
        const emptyDay = document.createElement('div');
        calendarDays.appendChild(emptyDay);
    }

    // Add days of the month
    for (let day = 1; day <= totalDays; day++) {
        const dayDiv = document.createElement('div');
        dayDiv.className = 'day';
        dayDiv.textContent = day;
        const fullDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        dayDiv.dataset.date = fullDate;

        // Highlight today's date
        if (day === new Date().getDate() && currentDate.getMonth() === new Date().getMonth() && currentDate.getYear() === new Date().getYear()) {
            dayDiv.classList.add('today');
        }

        // Check for tasks and add tooltip
        if (tasks[fullDate] && tasks[fullDate].length > 0) {
            dayDiv.classList.add('has-task');
            const tooltip = document.createElement('div');
            tooltip.className = 'task-tooltip';
            tooltip.textContent = tasks[fullDate].join(', ');
            dayDiv.appendChild(tooltip);
        }

        dayDiv.addEventListener('click', () => openModal(fullDate, day));
        calendarDays.appendChild(dayDiv);
    }

    // Add empty days after the last day of the month
    for (let i = lastDayIndex + 1; i < 7; i++) {
        const emptyDay = document.createElement('div');
        calendarDays.appendChild(emptyDay);
    }
}

// Open modal for adding tasks
function openModal(date, day) {
    const modal = document.getElementById('task-modal');
    const selectedDate = document.getElementById('selected-date');
    const taskInput = document.getElementById('task-input');
    const savedTasks = document.getElementById('saved-tasks');

    selectedDate.textContent = `${new Date(date).toLocaleDateString()} (Day ${day})`;
    taskInput.value = '';
    savedTasks.innerHTML = '';

    if (tasks[date] && tasks[date].length > 0) {
        tasks[date].forEach((task, index) => {
            const taskDiv = document.createElement('div');
            taskDiv.textContent = task;
            const deleteBtn = document.createElement('button');
            deleteBtn.textContent = '×';
            deleteBtn.className = 'delete-task';
            deleteBtn.onclick = () => deleteTask(date, index);
            taskDiv.appendChild(deleteBtn);
            savedTasks.appendChild(taskDiv);
        });
    }

    modal.style.display = 'flex';
}

// Save task to the selected date
function saveTask() {
    const taskInput = document.getElementById('task-input');
    const date = document.getElementById('selected-date').textContent.split(' ')[0];
    const taskText = taskInput.value.trim();

    if (taskText) {
        if (!tasks[date]) tasks[date] = [];
        tasks[date].push(taskText);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        openModal(date, new Date(date).getDate()); // Refresh modal
        renderCalendar(); // Update tooltip
        taskInput.value = '';
    } else {
        alert('Please enter a task or note!');
    }
}

// Delete a specific task
function deleteTask(date, index) {
    tasks[date].splice(index, 1);
    if (tasks[date].length === 0) delete tasks[date];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    openModal(date, new Date(date).getDate());
    renderCalendar(); // Update tooltip
}

// Navigate to previous month
function prevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

// Navigate to next month
function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Close modal
function closeModal() {
    const modal = document.getElementById('task-modal');
    modal.style.display = 'none';
}

// Event Listeners
document.getElementById('prev-month').addEventListener('click', prevMonth);
document.getElementById('next-month').addEventListener('click', nextMonth);
document.getElementById('save-task').addEventListener('click', saveTask);
document.getElementById('close-modal').addEventListener('click', closeModal);

// Initial Render
renderCalendar();