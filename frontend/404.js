// Log a message in the console for developers or curious users
console.log("404 Page Loaded: The page you're looking for doesn't exist.");

// Add a fun little animation or text effect
window.addEventListener("DOMContentLoaded", () => {
  const message = document.querySelector('.error-message h2');
  if (message) {
    message.style.transition = "all 0.6s ease";
    message.style.color = "#007bff"; // subtle color change
    message.style.transform = "scale(1.05)";
  }

  const link = document.querySelector('.back-home');
  if (link) {
    link.addEventListener('mouseover', () => {
      link.style.backgroundColor = "#007bff";
      link.style.color = "#fff";
    });
    link.addEventListener('mouseout', () => {
      link.style.backgroundColor = "transparent";
      link.style.color = "#007bff";
    });
  }
});
