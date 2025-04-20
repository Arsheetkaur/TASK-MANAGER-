document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('loginForm');
    const emailInput = document.getElementById('email');
    const passwordInput = document.getElementById('password');
  
    // Function to show a message
    function showMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
      loginForm.prepend(messageDiv);
      setTimeout(() => messageDiv.remove(), 3000);
    }
  
    // Simple form validation
    function validateForm() {
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();
  
      if (email === '' || password === '') {
        showMessage('Please fill out all fields', 'error');
        return false;
      }
  
      // Basic email format check (you can add more sophisticated checks)
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
        showMessage('Please enter a valid email address', 'error');
        return false;
      }
  
      // Password validation (add your own complexity)
      if (password.length < 6) {
        showMessage('Password must be at least 6 characters long', 'error');
        return false;
      }
  
      return true;
    }
  
    // Submit form event
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission
  
      if (validateForm()) {
        // For demonstration purposes, just show success message
        showMessage('Login successful!', 'success');
        // Here you can add code for form submission, e.g., API request
        // e.g., sending data to a server (AJAX/fetch)
        // For now, simulate success:
        setTimeout(() => {
          window.location.href = 'dashboard.html'; // Redirect to the dashboard or homepage
        }, 1000);
      }
    });
  });
  