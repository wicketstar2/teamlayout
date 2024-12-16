// Login Function
function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    // Change the username and password to 'admin'
    if (username === "admin" && password === "admin") {
        alert("Login successful!");
        document.getElementById("login-section").classList.add("hidden");
        document.getElementById("home-page").classList.remove("hidden");
        loadAgeGroups();
    } else {
        document.getElementById("login-error").style.display = "block";
    }
}

// Loading Age Groups
function loadAgeGroups() {
    const ageGroupsContainer = document.getElementById("age-groups");
    ageGroupsContainer.innerHTML = ""; 

    for (let age = 6; age <= 20; age++) {
        const button = document.createElement("button");
        button.textContent = `Age ${age}`;
        button.className = "btn";
        button.onclick = () => goToAgeGroup(age);
        ageGroupsContainer.appendChild(button);
    }
}

function goToAgeGroup(age) {
    document.getElementById("home-page").classList.add("hidden");
    document.getElementById("drag-drop-section").classList.remove("hidden");
}

// Drag and Drop Functions
function allowDrop(event) {
    event.preventDefault();
}

function drag(event) {
    event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
    event.preventDefault();
    const playerId = event.dataTransfer.getData("text");
    const player = document.getElementById(playerId);
    event.target.appendChild(player);
}

// Loading Players from File
function loadPlayers(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const lines = e.target.result.split("\n");
            const playerList = document.getElementById("player-list");
            playerList.innerHTML = ""; 
            lines.forEach((line, index) => {
                const trimmed = line.trim();
                if (trimmed) {
                    addPlayer(trimmed, index);
                }
            });
        };
        reader.readAsText(file);
    }
}

// Adding Players Manually
function addPlayerManually() {
    const playerName = document.getElementById("new-player-name").value.trim();
    if (playerName) {
        addPlayer(playerName);
        document.getElementById("new-player-name").value = "";
    }
}

// Adding a Player to the List
function addPlayer(name, index = Date.now()) {
    const playerList = document.getElementById("player-list");
    const player = document.createElement("div");
    player.textContent = name;
    player.id = `player-${index}`;
    player.className = "draggable";
    player.draggable = true;
    player.ondragstart = drag;
    playerList.appendChild(player);
}

// Function to show gender selection
function showGenderSelection() {
    document.getElementById('gender-selection').classList.remove('hidden');
}

// Function to handle gender selection
function selectGender(gender) {
    sessionStorage.setItem('selectedGender', gender);
    document.getElementById('gender-selection').classList.add('hidden');
    document.getElementById('login-section').classList.remove('hidden');
}
