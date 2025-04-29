function handleSignup() {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirm-password').value;

    if (!name || !email || !password || !confirmPassword) {
        alert('Please fill in all fields.');
        return;
    }

    if (password !== confirmPassword) {
        alert('Passwords do not match.');
        return;
    }

    if (!email.includes('@') || password.length < 6) {
        alert('Please enter a valid email and a password with at least 6 characters.');
        return;
    }

    // Simulate signup (replace with actual backend API call)
    alert('Signup successful! Redirecting to login...');
    window.location.href = 'login.html';
}