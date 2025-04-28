// === Define All Available Achievements ===
const achievements = [
  {
    id: "firstTask",
    title: "First Task Completed",
    description: "Complete your very first task.",
  },
  {
    id: "streak5",
    title: "5-Day Streak",
    description: "Complete a task daily for 5 consecutive days.",
  },
  {
    id: "pomodoroMaster",
    title: "Pomodoro Master",
    description: "Complete 10 pomodoro sessions.",
  },
  {
    id: "taskMachine",
    title: "Task Machine",
    description: "Complete 50 tasks.",
  },
  {
    id: "teamPlayer",
    title: "Team Player",
    description: "Collaborate with your team at least once.",
  },
];

// === Load unlocked achievements from localStorage ===
const unlockedAchievements = JSON.parse(localStorage.getItem("unlockedAchievements")) || [];

// === Display Achievements in Grid ===
function renderAchievements() {
  const container = document.getElementById("achievement-container");
  container.innerHTML = "";

  achievements.forEach((achieve) => {
    const isUnlocked = unlockedAchievements.includes(achieve.id);

    const card = document.createElement("div");
    card.className = "achievement-card" + (isUnlocked ? "" : " locked");

    card.innerHTML = `
      <div class="achievement-title">${achieve.title}</div>
      <div class="achievement-description">${achieve.description}</div>
      ${isUnlocked ? '<div class="badge">Unlocked</div>' : ""}
    `;

    container.appendChild(card);
  });
}

// === Unlock an Achievement and Save it ===
function unlockAchievement(id) {
  if (!unlockedAchievements.includes(id)) {
    unlockedAchievements.push(id);
    localStorage.setItem("unlockedAchievements", JSON.stringify(unlockedAchievements));
    renderAchievements();
  }
}

// === EXAMPLE: Auto-unlock some achievements for testing ===
unlockAchievement("firstTask");
unlockAchievement("pomodoroMaster");

// === Initial Render Call ===
renderAchievements();