// Load saved settings
window.onload = () => {
  document.getElementById("theme").value = localStorage.getItem("theme") || "light";
  document.getElementById("sound").checked = localStorage.getItem("sound") === "true";
  document.getElementById("pomoDuration").value = localStorage.getItem("pomoDuration") || 25;
};

document.getElementById("settingsForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const theme = document.getElementById("theme").value;
  const sound = document.getElementById("sound").checked;
  const pomoDuration = document.getElementById("pomoDuration").value;

  localStorage.setItem("theme", theme);
  localStorage.setItem("sound", sound);
  localStorage.setItem("pomoDuration", pomoDuration);

  alert("Settings saved successfully!");
});