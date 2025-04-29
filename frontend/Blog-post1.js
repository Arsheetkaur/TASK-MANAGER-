// blog.js

// Optional fade-in effect when scrolling (can be extended)
window.addEventListener("DOMContentLoaded", () => {
  const blogContainer = document.querySelector(".blog-container");

  blogContainer.style.opacity = 0;
  blogContainer.style.transform = "translateY(30px)";

  setTimeout(() => {
    blogContainer.style.transition = "opacity 1s ease, transform 1s ease";
    blogContainer.style.opacity = 1;
    blogContainer.style.transform = "translateY(0)";
  }, 300);
});