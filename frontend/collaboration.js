let teams = [];
let tempMembers = []; // Temporary list for members before team creation

// Load teams from localStorage
function loadTeams() {
    const savedTeams = localStorage.getItem('taskFlowTeams');
    if (savedTeams) {
        teams = JSON.parse(savedTeams);
    }
    renderTeamList();
}

// Save teams to localStorage
function saveTeams() {
    localStorage.setItem('taskFlowTeams', JSON.stringify(teams));
}

// Validate email format
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Add a team member to the temporary list
function addTeamMember() {
    const email = document.getElementById('teamMemberEmail').value.trim();
    if (!email) {
        alert('Please enter an email address.');
        return;
    }
    if (!isValidEmail(email)) {
        alert('Please enter a valid email address.');
        return;
    }
    if (tempMembers.includes(email)) {
        alert('This email is already added.');
        return;
    }

    tempMembers.push(email);
    document.getElementById('teamMemberEmail').value = '';
    renderTempMemberList();

    showConfirmation('Member added to the list!');
}

// Render temporary member list
function renderTempMemberList() {
    const tempMemberList = document.getElementById('tempMembers');
    tempMemberList.innerHTML = '';
    tempMembers.forEach(email => {
        const li = document.createElement('li');
        li.textContent = email;
        tempMemberList.appendChild(li);
    });
}

// Create a new team
function createTeam() {
    const teamName = document.getElementById('teamName').value.trim();
    if (!teamName) {
        alert('Please enter a team name.');
        return;
    }
    if (tempMembers.length === 0) {
        alert('Please add at least one team member.');
        return;
    }

    const team = {
        id: Date.now(), // Unique ID based on timestamp
        name: teamName,
        members: [...tempMembers],
        tasks: [],
        createdAt: new Date().toISOString()
    };

    teams.push(team);
    saveTeams();
    renderTeamList();

    // Clear form
    document.getElementById('teamName').value = '';
    document.getElementById('teamMemberEmail').value = '';
    tempMembers = [];
    renderTempMemberList();

    showConfirmation('Team created successfully!');
}

// Add a task to a team
function addTeamTask(teamId) {
    const taskInput = document.getElementById(`taskInput-${teamId}`);
    const taskTitle = taskInput.value.trim();
    if (!taskTitle) {
        alert('Please enter a task title.');
        return;
    }

    const team = teams.find(t => t.id === teamId);
    if (team) {
        team.tasks.push({
            id: Date.now(),
            title: taskTitle,
            createdAt: new Date().toISOString()
        });
        saveTeams();
        renderTeamList();
        taskInput.value = '';
        showConfirmation('Task added to team!');
    }
}

// Delete a team
function deleteTeam(id) {
    teams = teams.filter(team => team.id !== id);
    saveTeams();
    renderTeamList();
    showConfirmation('Team deleted successfully!');
}

// Render the team list
function renderTeamList() {
    const teamList = document.getElementById('teamList');
    teamList.innerHTML = '';

    teams.forEach(team => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="team-info">
                <h4>${team.name}</h4>
                <p>Created: ${new Date(team.createdAt).toLocaleDateString()}</p>
            </div>
            <div class="team-members">
                <p>Members:</p>
                <ul>
                    ${team.members.map(email => `<li>${email}</li>`).join('')}
                </ul>
            </div>
            <div class="add-task-form">
                <input type="text" id="taskInput-${team.id}" placeholder="Enter team task">
                <button class="add-task-button" onclick="addTeamTask(${team.id})">Add Task</button>
            </div>
            <div class="team-tasks">
                <p>Tasks:</p>
                <ul>
                    ${team.tasks.map(task => `<li>${task.title}</li>`).join('')}
                </ul>
            </div>
            <button class="delete-team-button" onclick="deleteTeam(${team.id})">Delete Team</button>
        `;
        teamList.appendChild(li);
    });
}

// Show confirmation message
function showConfirmation(message) {
    const confirmation = document.getElementById('confirmationMessage');
    confirmation.textContent = message;
    confirmation.style.display = 'block';
    confirmation.classList.add('show');
    setTimeout(() => {
        confirmation.classList.remove('show');
        setTimeout(() => {
            confirmation.style.display = 'none';
        }, 500);
    }, 2000);
}

// Animate form and team list on page load
function animateElements() {
    const form = document.querySelector('.team-form');
    const teamList = document.querySelector('.team-list');
    form.classList.add('animate');
    setTimeout(() => {
        teamList.classList.add('animate');
    }, 200); // Stagger animation
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    loadTeams();
    animateElements();
});