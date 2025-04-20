const calendarDays = document.getElementById("calendar-days");
const monthYear = document.getElementById("month-year");
const prevMonthBtn = document.getElementById("prev-month");
const nextMonthBtn = document.getElementById("next-month");

const modal = document.getElementById("task-modal");
const closeModal = document.getElementById("close-modal");
const selectedDateText = document.getElementById("selected-date");
const taskInput = document.getElementById("task-input");
const saveTaskBtn = document.getElementById("save-task");
const savedTask = document.getElementById("saved-task");

let date = new Date();
let tasks = {};

function renderCalendar() {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const lastDate = new Date(year, month + 1, 0).getDate();

  const monthName = date.toLocaleString("default", { month: "long" });
  `monthYear.textContent = ${monthName} ${year}`;

  calendarDays.innerHTML = "";

  for (let i = 0; i < firstDay; i++) {
    const emptyCell = document.createElement("div");
    calendarDays.appendChild(emptyCell);
  }

  for (let i = 1; i <= lastDate; i++) {
    const day = document.createElement("div");
    day.textContent = i;
    day.addEventListener("click", () => openModal(i, month, year));
    calendarDays.appendChild(day);
  }
}

function openModal(day, month, year) {
  `const key = ${year}-${month + 1}-${day};
  selectedDateText.textContent = Task for ${day}/${month + 1}/${year}`;
  taskInput.value = tasks[key] || "";
  savedTask.textContent = "";
  modal.style.display = "flex";

  saveTaskBtn.onclick = () => {
    tasks[key] = taskInput.value;
    savedTask.textContent = "Task Saved!";
    setTimeout(() => modal.style.display = "none", 1000);
  };
}

closeModal.onclick = () => (modal.style.display = "none");

window.onclick = (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
};

prevMonthBtn.onclick = () => {
  date.setMonth(date.getMonth() - 1);
  renderCalendar();
};

nextMonthBtn.onclick = () => {
  date.setMonth(date.getMonth() + 1);
  renderCalendar();
};

renderCalendar();