// Load saved settings when page loads
window.addEventListener('load', function() {
    const savedDuration = localStorage.getItem('pomoDuration');
    const savedTheme = localStorage.getItem('theme');
    const savedSound = localStorage.getItem('sound');
    
    if (savedDuration) document.getElementById('pomoDuration').value = savedDuration;
    if (savedTheme) document.getElementById('theme').value = savedTheme;
    if (savedSound) document.getElementById('sound').checked = savedSound === 'true';
});

document.getElementById('settingsForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get settings values
    const pomoDuration = document.getElementById('pomoDuration').value;
    const theme = document.getElementById('theme').value;
    const sound = document.getElementById('sound').checked;
    
    // Save to localStorage
    localStorage.setItem('pomoDuration', pomoDuration);
    localStorage.setItem('theme', theme);
    localStorage.setItem('sound', sound);
    
    alert('Settings saved successfully!');
});