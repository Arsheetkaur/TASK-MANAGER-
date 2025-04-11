// Wait until the DOM is fully loaded before running the script
document.addEventListener("DOMContentLoaded", () => {
  
    // === Dropdown Menu Interactivity ===
    const dropdown = document.querySelector(".dropdown");
    const dropdownMenu = dropdown.querySelector(".dropdown-menu");
  
    // Show/hide the dropdown menu on hover (for desktop experience)
    dropdown.addEventListener("mouseenter", () => {
      dropdownMenu.style.display = "block";
    });
  
    dropdown.addEventListener("mouseleave", () => {
      dropdownMenu.style.display = "none";
    });
  
    // === Responsive Mobile Menu (if implemented later) ===
    // Placeholder for adding mobile menu logic, like a hamburger toggle
  
    // === Smooth Scroll to Sections ===
    const navLinks = document.querySelectorAll(".nav-links a");
  
    navLinks.forEach(link => {
      link.addEventListener("click", function (e) {
        // Check if href starts with #
        if (this.getAttribute("href").startsWith("#")) {
          e.preventDefault();
          const targetId = this.getAttribute("href").substring(1);
          const targetSection = document.getElementById(targetId);
          
          // Scroll smoothly to the section
          if (targetSection) {
            targetSection.scrollIntoView({ behavior: "smooth" });
          }
        }
      });
    });
  
    // === Future Features ===
    // You can add event listeners here for to-do items, Pomodoro timers, etc.
    // Example: Load user preferences from localStorage or APIs in future
  
    console.log("TaskPro JS loaded successfully ✅");
  });
  