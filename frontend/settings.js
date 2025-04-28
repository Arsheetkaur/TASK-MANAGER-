let settings = {
    username: '',
    email: '',
    emailNotifications: false,
    taskReminders: false,
    theme: 'light'
  };
  
  // Load settings from localStorage
  function loadSettings() {
    const savedSettings = localStorage.getItem('taskFlowSettings');
    if (savedSettings) {
        settings = JSON.parse(savedSettings);
    }
    document.getElementById('username').value = settings.username;
    document.getElementById('email').value = settings.email;
    document.getElementById('emailNotifications').checked = settings.emailNotifications;
    document.getElementById('taskReminders').checked = settings.taskReminders;
    document.getElementById('theme').value = settings.theme;
    applyTheme();
  }
  
  // Save settings to localStorage
  function saveSettings() {
    const username = document.getElementById('username').value.trim();
    const email = document.getElementById('email').value.trim();
    const emailNotifications = document.getElementById('emailNotifications').checked;
    const taskReminders = document.getElementById('taskReminders').checked;
    const theme = document.getElementById('theme').value;
  
    if (!username) {
        alert('Please enter a username.');
        return;
    }
    if (!email) {
        alert('Please enter an email address.');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
  
    settings = { username, email, emailNotifications, taskReminders, theme };
    localStorage.setItem('taskFlowSettings', JSON.stringify(settings));
    applyTheme();
    showConfirmation('Settings saved successfully!');
  }
  
  // Validate email format
  function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  
  // Apply theme (light/dark)
  function applyTheme() {
    const body = document.body;
    const header = document.querySelector('.header');
    const footer = document.querySelector('.main-footer');
    const cards = document.querySelectorAll('.settings-card, .dashboard-card, .team-form, .task-form, .analytics-container');
  
    if (settings.theme === 'dark') {
        body.classList.add('dark-mode');
        body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #3c3c3c 100%)';
        if (header) header.style.background = '#2c2c2c';
        if (footer) footer.style.background = '#1a1a1a';
        cards.forEach(card => {
            card.style.background = '#2c2c2c';
            card.style.color = '#fff';
        });
    } else {
        body.classList.remove('dark-mode');
        body.style.background = 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)';
        if (header) header.style.background = '#fff';
        if (footer) footer.style.background = '#2c3e50';
        cards.forEach(card => {
            card.style.background = '#fff';
            card.style.color = '#333';
        });
    }
  }
  
  // Clear all data
  function clearData() {
    if (confirm('Are you sure you want to clear all data? This will reset tasks, achievements, teams, and analytics.')) {
        localStorage.removeItem('taskFlowTasks');
        localStorage.removeItem('taskFlowUserData');
        localStorage.removeItem('taskFlowAnalyticsData');
        localStorage.removeItem('taskFlowTeams');
        showConfirmation('All data cleared successfully!');
    }
  }
  
  // Show confirmation message
  function showConfirmation(message) {
    const confirmation = document.getElementById('confirmationMessage');
    confirmation.textContent = message;
    confirmation.style.display = 'block';
    confirmation.classList.add('show');
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 500);
    }, 2000);
  }
  
  // Animate settings form on page load
  function animateForm() {
    const form = document.querySelector('.settings-form');
    form.classList.add('animate');
  }
  
  // Initialize the page
  document.addEventListener('DOMContentLoaded', () => {
    loadSettings();
    animateForm();
  });