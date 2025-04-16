document.addEventListener('DOMContentLoaded', () => {
  const signupForm = document.getElementById('signupForm');
  const usernameInput = document.getElementById('username');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  // Function to show a message
  function showMessage(message, type) {
      const messageDiv = document.createElement('div');
      messageDiv.textContent = message;
      messageDiv.className = type === 'error' ? 'error-message' : 'success-message';
      signupForm.prepend(messageDiv);
      setTimeout(() => messageDiv.remove(), 3000);
  }

  // Simple form validation
  function validateForm() {
      const username = usernameInput.value.trim();
      const email = emailInput.value.trim();
      const password = passwordInput.value.trim();

      if (username === '' || email === '' || password === '') {
          showMessage('Please fill out all fields', 'error');
          return false;
      }

      // Basic email format check
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      if (!emailPattern.test(email)) {
          showMessage('Please enter a valid email address', 'error');
          return false;
      }

      // Password validation
      if (password.length < 6) {
          showMessage('Password must be at least 6 characters long', 'error');
          return false;
      }

      return true;
  }

  // Submit form event
  signupForm.addEventListener('submit', (e) => {
      e.preventDefault(); // Prevent default form submission

      if (validateForm()) {
          // For demonstration purposes, show success message
          showMessage('Account created successfully!', 'success');
          // Simulate redirect to login page
          setTimeout(() => {
              window.location.href = 'login.html'; // Redirect to login page
          }, 1000);
      }
  });
});