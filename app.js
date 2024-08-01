const animals = [
    { name: 'Deer / Reh', points: 2 },
    { name: 'Fox / Fuchs', points: 5 },
    { name: 'Mouse / Maus', points: 1 },
    { name: 'Moose / Elch', points: 25 },
    { name: 'Beaver / Biber', points: 5 },
    { name: 'Bison / Bison', points: 1 },
    { name: 'Wolf / Wolf', points: 10 },
    { name: 'Coyote / Kojote', points: 2 },
    { name: 'Skunk / Stinktier', points: 1 },
    { name: 'Porcupine / Stachelschwein', points: 3 },
    { name: 'Black Bear / Schwarz Bär', points: 15 },
    { name: 'Chipmunk / Streifenhörnchen', points: 1 },
    { name: 'Squirrel / Eichhörnchen', points: 1 },
    { name: 'Elk / Wapiti Hirsch', points: 3 },
    { name: 'Gopher / Ziesel', points: 1 }
];

const standingsKey = 'standings';

document.addEventListener('DOMContentLoaded', () => {
    const animalListDiv = document.getElementById('animal-list');
    animals.forEach(animal => {
        const button = document.createElement('button');
        button.textContent = animal.name;
        button.addEventListener('click', () => awardPoints(animal));
        animalListDiv.appendChild(button);
    });

    document.getElementById('view-standings').addEventListener('click', viewStandings);

    // Load standings from local storage
    loadStandings();
});

function awardPoints(animal) {
    let user = prompt('Enter your username:');
    if (!user) return;

    // Load current standings from local storage
    let standings = JSON.parse(localStorage.getItem(standingsKey)) || [];

    let userStanding = standings.find(s => s.username === user);
    if (!userStanding) {
        userStanding = { username: user, points: 0 };
        standings.push(userStanding);
    }
    userStanding.points += animal.points;

    // Save updated standings to local storage
    localStorage.setItem(standingsKey, JSON.stringify(standings));

    alert(`${animal.name} clicked! ${user} awarded ${animal.points} points.`);
}

function viewStandings() {
    const standingsTableDiv = document.getElementById('standings-table');
    standingsTableDiv.innerHTML = '';
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Username</th><th>Points</th>';
    table.appendChild(headerRow);

    // Load standings from local storage
    let standings = JSON.parse(localStorage.getItem(standingsKey)) || [];

    standings.sort((a, b) => b.points - a.points);
    standings.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${s.username}</td><td>${s.points}</td>`;
        table.appendChild(row);
    });

    standingsTableDiv.appendChild(table);
}

function loadStandings() {
    const standingsTableDiv = document.getElementById('standings-table');
    standingsTableDiv.innerHTML = '';
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Username</th><th>Points</th>';
    table.appendChild(headerRow);

    // Load standings from local storage
    let standings = JSON.parse(localStorage.getItem(standingsKey)) || [];

    standings.sort((a, b) => b.points - a.points);
    standings.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${s.username}</td><td>${s.points}</td>`;
        table.appendChild(row);
    });

    standingsTableDiv.appendChild(table);
}
