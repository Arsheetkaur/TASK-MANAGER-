// privacy.js

// Collapsible sections (optional)
document.addEventListener("DOMContentLoaded", () => {
    const policyBoxes = document.querySelectorAll(".policy-box");
  
    policyBoxes.forEach((box) => {
      const heading = box.querySelector("h2");
      const content = box.querySelector("p");
  
      heading.style.cursor = "pointer";
      content.style.display = "none";
  
      heading.addEventListener("click", () => {
        const isVisible = content.style.display === "block";
        content.style.display = isVisible ? "none" : "block";
      });
    });
  });
  
  // Cookie notice (optional)
  function showCookieNotice() {
    if (!localStorage.getItem("cookieAccepted")) {
      const notice = document.createElement("div");
      notice.className = "cookie-notice";
      notice.innerHTML = `
        <p>We use cookies to improve your experience. By using our site, you agree to our <a href="privacy.html">Privacy Policy</a>.</p>
        <button id="acceptCookies">Accept</button>
      `;
      document.body.appendChild(notice);
  
      document.getElementById("acceptCookies").addEventListener("click", () => {
        localStorage.setItem("cookieAccepted", "true");
        notice.remove();
      });
    }
  }
  
  document.addEventListener("DOMContentLoaded", showCookieNotice);
  