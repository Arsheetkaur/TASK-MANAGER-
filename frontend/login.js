function handleLogin() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  if (!email || !password) {
      alert('Please fill in all fields.');
      return;
  }

  // Simulate login (replace with actual backend API call)
  if (email.includes('@') && password.length >= 6) {
      alert('Login successful! Redirecting to dashboard...');
      // Redirect to dashboard or homepage
      window.location.href = 'index.html';
  } else {
      alert('Invalid email or password. Please try again.');
  }
}