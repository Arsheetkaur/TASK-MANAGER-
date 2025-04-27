document.addEventListener('DOMContentLoaded', () => {
  console.log('Index page loaded');
  initializeTasks();
});

// Initialize tasks and authentication
function initializeTasks() {
  try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const taskList = document.getElementById('taskList');

      if (!taskList) {
          console.error('Task list element not found');
          return;
      }

      // Add authentication prompt
      const authPrompt = document.createElement('p');
      authPrompt.id = 'taskAuthPrompt';
      authPrompt.style.display = 'none';
      authPrompt.innerHTML = 'Please <a href="login.html">log in</a> or <a href="signup.html">sign up</a> to manage tasks.';
      taskList.parentNode.insertBefore(authPrompt, taskList);

      if (user.email) {
          console.log('User authenticated:', user);
          authPrompt.style.display = 'none';
          taskList.style.display = 'block';
          loadTasks(user.email);
      } else {
          console.log('No valid user found in localStorage');
          authPrompt.style.display = 'block';
          taskList.style.display = 'block'; // Show hardcoded tasks as demo
          // Disable checkboxes for unauthenticated users
          const checkboxes = taskList.querySelectorAll('input[type="checkbox"]');
          checkboxes.forEach(checkbox => {
              checkbox.disabled = true;
              checkbox.title = 'Log in to manage tasks';
          });
      }
  } catch (error) {
      console.error('Error in initializeTasks:', error);
  }
}

// Load tasks from localStorage
function loadTasks(userEmail) {
  try {
      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskList = document.getElementById('taskList');

      if (!taskList) {
          console.error('Task list element not found');
          return;
      }

      // Filter tasks for the current user and incomplete tasks
      const userTasks = tasks.filter(task => task.userEmail === userEmail && !task.completed);

      // If no tasks exist for the user, seed with hardcoded tasks
      if (userTasks.length === 0 && tasks.filter(task => task.userEmail === userEmail).length === 0) {
          const defaultTasks = [
              { description: 'Prepare pitch deck', priority: 'Medium', dueDate: new Date().toISOString().split('T')[0], completed: false },
              { description: 'Email client follow-up', priority: 'High', dueDate: new Date().toISOString().split('T')[0], completed: false },
              { description: 'Draft new blog post', priority: 'Low', dueDate: new Date().toISOString().split('T')[0], completed: false }
          ];

          defaultTasks.forEach(task => {
              tasks.push({
                  id: Date.now().toString() + Math.random().toString(36).slice(2),
                  ...task,
                  userEmail
              });
          });
          localStorage.setItem('tasks', JSON.stringify(tasks));
          console.log('Seeded default tasks for user:', userEmail);
      }

      // Render tasks
      tasks = JSON.parse(localStorage.getItem('tasks') || '[]'); // Refresh tasks after seeding
      taskList.innerHTML = tasks
          .filter(task => task.userEmail === userEmail && !task.completed)
          .map(task => `
              <li>
                  <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(this, '${task.id}')">
                  ${task.description}
              </li>
          `).join('');

      console.log('Tasks loaded for user:', userEmail, 'Count:', userTasks.length);
  } catch (error) {
      console.error('Error in loadTasks:', error);
  }
}

// Toggle task completion
function toggleTask(checkbox, taskId) {
  try {
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      if (!user.email) {
          console.warn('User not authenticated');
          alert('Please log in to manage tasks.');
          checkbox.checked = false; // Revert checkbox
          return;
      }

      let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks = tasks.map(task => 
          task.id === taskId && task.userEmail === user.email 
              ? { ...task, completed: checkbox.checked } 
              : task
      );
      localStorage.setItem('tasks', JSON.stringify(tasks));
      console.log('Task toggled:', taskId, 'Completed:', checkbox.checked);

      // Refresh task list
      loadTasks(user.email);
  } catch (error) {
      console.error('Error in toggleTask:', error);
      alert('Failed to update task. Please try again.');
      checkbox.checked = !checkbox.checked; // Revert on error
  }
}