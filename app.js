const animals = [
    { name: 'Deer / Reh', points: 2 },
    { name: 'Fox / Fuchs', points: 5 },
    { name: 'Mouse / Maus', points: 1 },
    { name: 'Moose / Elch', points: 25 },
    { name: 'Beaver / Biber', points: 5 }
];

const standings = [];

document.addEventListener('DOMContentLoaded', () => {
    const animalListDiv = document.getElementById('animal-list');
    animals.forEach(animal => {
        const button = document.createElement('button');
        button.textContent = animal.name;
        button.addEventListener('click', () => awardPoints(animal));
        animalListDiv.appendChild(button);
    });

    document.getElementById('view-standings').addEventListener('click', viewStandings);
});

function awardPoints(animal) {
    let user = prompt('Enter your username:');
    if (!user) return;

    let userStanding = standings.find(s => s.username === user);
    if (!userStanding) {
        userStanding = { username: user, points: 0 };
        standings.push(userStanding);
    }
    userStanding.points += animal.points;
    alert(`${animal.name} clicked! ${user} awarded ${animal.points} points.`);
}

function viewStandings() {
    const standingsTableDiv = document.getElementById('standings-table');
    standingsTableDiv.innerHTML = '';
    const table = document.createElement('table');
    const headerRow = document.createElement('tr');
    headerRow.innerHTML = '<th>Username</th><th>Points</th>';
    table.appendChild(headerRow);

    standings.sort((a, b) => b.points - a.points);
    standings.forEach(s => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${s.username}</td><td>${s.points}</td>`;
        table.appendChild(row);
    });

    standingsTableDiv.appendChild(table);
}
