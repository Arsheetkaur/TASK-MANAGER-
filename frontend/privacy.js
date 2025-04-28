// privacy.js

// Dynamically update the greeting based on time of day
document.addEventListener("DOMContentLoaded", function() {
  const greeting = document.getElementById("greeting");
  if (greeting) {
      const hour = new Date().getHours();
      let message = "Your privacy matters to us!";
      if (hour < 12) {
          message = "Good morning! Your privacy matters to us!";
      } else if (hour < 18) {
          message = "Good afternoon! Your privacy matters to us!";
      } else {
          message = "Good evening! Your privacy matters to us!";
      }
      greeting.textContent = message;
  }
});

// Example: Function to clear all cookies (for demonstration purposes)
function clearAllCookies() {
  const cookies = document.cookie.split("; ");
  for (let c = 0; c < cookies.length; c++) {
      const d = window.location.hostname.split(".");
      while (d.length > 0) {
          const cookieBase = encodeURIComponent(cookies[c].split(";")[0].split("=")[0]) +
              "=; expires=Thu, 01-Jan-1970 00:00:01 GMT; domain=" +
              d.join('.') + " ;path=";
          const paths = location.pathname.split('/');
          document.cookie = cookieBase + '/';
          while (paths.length > 0) {
              document.cookie = cookieBase + paths.join('/');
              paths.pop();
          }
          d.shift();
      }
  }
  alert("All cookies cleared (for demonstration).");
}

// Example: Add a button to clear cookies if needed
document.addEventListener("DOMContentLoaded", function() {
  const privacySection = document.querySelector('.privacy-section');
  if (privacySection) {
      const btn = document.createElement('button');
      btn.textContent = "Clear Cookies";
      btn.style.marginTop = "20px";
      btn.onclick = clearAllCookies;
      privacySection.appendChild(btn);
  }
});