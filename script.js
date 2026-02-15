// Choosing random pokemon
let secretPokemonId = Math.floor(Math.random() * 1025) + 1;
document.getElementById('target-number').innerText = secretPokemonId;

// Fetching ID from PokeAPI
async function getPokemonId(name) {
    try {
        
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase().trim()}`);
        
        if (!response.ok) {
            alert(`Could not find "${name}". Check your spelling!`);
            return null;
        }

        const data = await response.json();
        return data.id;
    } catch (error) {
        console.error("Connection error:", error);
        return null;
    }
}

// 1v1 game mechanic
document.getElementById('guess-btn').addEventListener('click', async () => {
    // Player input values
    const p1Name = document.getElementById('p1-input').value;
    const p2Name = document.getElementById('p2-input').value;

    if (!p1Name || !p2Name) {
        alert("Both players must enter a Pokemon name!");
        return;
    }

    // Fetch individual pokemon ID from PokeAPI
    const id1 = await getPokemonId(p1Name);
    const id2 = await getPokemonId(p2Name);

    // Calculate winner if valid IDs
    if (id1 !== null && id2 !== null) {
        const diff1 = Math.abs(secretPokemonId - id1);
        const diff2 = Math.abs(secretPokemonId - id2);

        const winnerText = document.getElementById('winner-text');
        const detailsText = document.getElementById('details-text');

        if (diff1 < diff2) {
            winnerText.innerText = "🏆 Player 1 Wins!";
        } else if (diff2 < diff1) {
            winnerText.innerText = "🏆 Player 2 Wins!";
        } else {
            winnerText.innerText = "🤝 It's a Tie!";
        }

        detailsText.innerText = `The secret ID was #${secretPokemonId}. Player 1 guessed #${id1}, Player 2 guessed #${id2}.`;
    }
});