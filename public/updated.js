let dealerSum = 0;
let playerSum = 0;
let dealerAce = 0;
let playerAce = 0;
let hidden;
let deck;
let canHit = true;

window.onload = function () {
    document.getElementById("reset-game").addEventListener("click", startNewGame);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
    startNewGame();
}

function startNewGame() {
    fetch('game.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'start_game'
        })
    })
    .then(response => response.json())
    .then(data => {
        dealerSum = 0;
        playerSum = 0;
        dealerAce = 0;
        playerAce = 0;
        canHit = true;
        document.getElementById("results").innerText = "";
        document.getElementById("dealer_cards").innerHTML = "";
        document.getElementById("player_cards").innerHTML = "";
        document.getElementById("dealer_sum").innerText = "";
        document.getElementById("player_sum").innerText = "";

        drawInitialCards(data);
    })
    .catch(error => console.error('Error:', error));
}

function drawInitialCards(data) {
    dealerSum = data.dealer_sum;
    playerSum = data.player_sum;
    dealerAce = data.dealer_ace;
    playerAce = data.player_ace;

    data.dealer_cards.forEach(function(card, index) {
        if (index === 0) {
            document.getElementById("dealer_cards").innerHTML += `<img id="hidden" src="./cards/BACK.png" alt="Hidden Card">`;
        } else {
            document.getElementById("dealer_cards").innerHTML += `<img src="./cards/${card}.png" alt="Card">`;
        }
    });

    data.player_cards.forEach(function(card) {
        document.getElementById("player_cards").innerHTML += `<img src="./cards/${card}.png" alt="Card">`;
    });

    document.getElementById("dealer_sum").innerText = dealerSum;
    document.getElementById("player_sum").innerText = playerSum;
}

function hit() {
    if (canHit) {
        fetch('game.php', {
            method: 'POST',
            body: new URLSearchParams({
                action: 'hit'
            })
        })
        .then(response => response.json())
        .then(data => {
            playerSum = data.player_sum;
            playerAce = data.player_ace;
            document.getElementById("player_cards").innerHTML += `<img src="./cards/${data.player_cards[data.player_cards.length - 1]}.png" alt="Card">`;
            document.getElementById("player_sum").innerText = playerSum;

            if (playerSum > 21 && playerAce > 0) {
                stand();
            }
        })
        .catch(error => console.error('Error:', error));
    }
}

let consecutiveWins = 0;

