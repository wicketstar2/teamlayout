document.getElementById("front-row").style.fontSize = "x-large"; 
document.getElementById("middle-row").style.fontSize = "x-large"; 
document.getElementById("back-row").style.fontSize = "x-large"; 

        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            const targetZone = ev.target;

            // Append the dragged player to the drop zone
            targetZone.appendChild(draggedElement);
        }

        function loadPlayers(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const names = e.target.result.split(/\r?\n/).filter(name => name.trim() !== "");
                    const playerList = document.getElementById('player-list');
                    playerList.innerHTML = ""; // Clear existing players

                    names.forEach((name, index) => {
                        createPlayer(name, index);
                    });
                };
                reader.readAsText(file);
            }
        }

        function addPlayerManually() {
            const playerNameInput = document.getElementById('new-player-name');
            const playerName = playerNameInput.value.trim();

            if (playerName) {
                const playerList = document.getElementById('player-list');
                const index = playerList.children.length;
                createPlayer(playerName, index);
                playerNameInput.value = ''; // Clear the input field
            }
        }

        function createPlayer(name, index) {
            const playerDiv = document.createElement('div');
            playerDiv.id = `player-${index}`;
            playerDiv.className = 'draggable';
            playerDiv.draggable = true;
            playerDiv.ondragstart = drag;

            const playerName = document.createElement('span');
            playerName.textContent = name;

            const options = document.createElement('span');
            options.className = 'options';
            options.textContent = '...';
            options.onclick = function() {
                toggleMenu(playerDiv.id);
            };

            const menu = document.createElement('div');
            menu.className = 'menu';

            const removeItem = document.createElement('div');
            removeItem.className = 'menu-item';
            removeItem.textContent = 'Remove';
            removeItem.onclick = function() {
                removePlayer(playerDiv);
            };

            menu.appendChild(removeItem);
            playerDiv.appendChild(playerName);
            playerDiv.appendChild(options);
            playerDiv.appendChild(menu);
            document.getElementById('player-list').appendChild(playerDiv);
        }

        function toggleMenu(playerId) {
            const playerDiv = document.getElementById(playerId);
            const menu = playerDiv.querySelector('.menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }

        function removePlayer(playerDiv) {
            const playerList = document.getElementById('player-list');
            const parentZone = playerDiv.parentElement;

            // If the player is inside a drop zone, move them back to the player list
            if (parentZone && parentZone.classList.contains('zone')) {
                playerList.appendChild(playerDiv);
            } else {
                // If the player is in the player list already, just remove it
                playerList.removeChild(playerDiv);
            }

            // Hide the menu after removal
            const menu = playerDiv.querySelector('.menu');
            menu.style.display = 'none';
        }

        window.addEventListener('click', function(event) {
            const menus = document.querySelectorAll('.menu');
            menus.forEach(menu => {
                if (!menu.parentElement.contains(event.target)) {
                    menu.style.display = 'none';
                }
            });
        });

      
        function allowDrop(ev) {
            ev.preventDefault();
        }

        function drag(ev) {
            ev.dataTransfer.setData("text", ev.target.id);
        }

        function drop(ev) {
            ev.preventDefault();
            var data = ev.dataTransfer.getData("text");
            const draggedElement = document.getElementById(data);
            const targetZone = ev.target;

            // Append the dragged player to the drop zone
            targetZone.appendChild(draggedElement);
        }

        function loadPlayers(event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    const names = e.target.result.split(/\r?\n/).filter(name => name.trim() !== "");
                    const playerList = document.getElementById('player-list');
                    playerList.innerHTML = ""; // Clear existing players

                    names.forEach((name, index) => {
                        createPlayer(name, index);
                    });
                };
                reader.readAsText(file);
            }
        }

        function addPlayerManually() {
            const playerNameInput = document.getElementById('new-player-name');
            const playerName = playerNameInput.value.trim();

            if (playerName) {
                const playerList = document.getElementById('player-list');
                const index = playerList.children.length;
                createPlayer(playerName, index);
                playerNameInput.value = ''; // Clear the input field
            }
        }

        function createPlayer(name, index) {
            const playerDiv = document.createElement('div');
            playerDiv.id = `player-${index}`;
            playerDiv.className = 'draggable';
            playerDiv.draggable = true;
            playerDiv.ondragstart = drag;

            const playerName = document.createElement('span');
            playerName.textContent = name;

            const options = document.createElement('span');
            options.className = 'options';
            options.textContent = '...';
            options.onclick = function() {
                toggleMenu(playerDiv.id);
            };

            const menu = document.createElement('div');
            menu.className = 'menu';

            const removeItem = document.createElement('div');
            removeItem.className = 'menu-item';
            removeItem.textContent = 'Remove';
            removeItem.onclick = function() {
                removePlayer(playerDiv);
            };

            menu.appendChild(removeItem);
            playerDiv.appendChild(playerName);
            playerDiv.appendChild(options);
            playerDiv.appendChild(menu);
            document.getElementById('player-list').appendChild(playerDiv);
        }

        function toggleMenu(playerId) {
            const playerDiv = document.getElementById(playerId);
            const menu = playerDiv.querySelector('.menu');
            menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
        }

        function removePlayer(playerDiv) {
            const playerList = document.getElementById('player-list');
            const parentZone = playerDiv.parentElement;

            // If the player is inside a drop zone, move them back to the player list
            if (parentZone && parentZone.classList.contains('zone')) {
                playerList.appendChild(playerDiv);
            } else {
                // If the player is in the player list already, just remove it
                playerList.removeChild(playerDiv);
            }

            // Hide the menu after removal
            const menu = playerDiv.querySelector('.menu');
            menu.style.display = 'none';
        }

        function addDropZone() {
            const zoneContainer = document.getElementById('zone-container');
            const newZone = document.createElement('div');
            newZone.className = 'zone';
            newZone.setAttribute('ondrop', 'drop(event)');
            newZone.setAttribute('ondragover', 'allowDrop(event)');
            newZone.style.width = '150px'; // Adjust size as needed
            newZone.style.height = '150px'; // Adjust size as needed
            newZone.style.border = '2px solid black';
            newZone.style.margin = '10px';
            newZone.style.position = 'relative';
            zoneContainer.appendChild(newZone);
        }

        window.addEventListener('click', function(event) {
            const menus = document.querySelectorAll('.menu');
            menus.forEach(menu => {
                if (!menu.parentElement.contains(event.target)) {
                    menu.style.display = 'none';
                }
            });
        });
  
        // Set Item
localStorage.setItem("player-list");
// Retrieve
document.getElementById("player-list").innerHTML = localStorage.getItem("player-list");