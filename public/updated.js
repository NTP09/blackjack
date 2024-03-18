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

function stand() {
    canHit = false;
    fetch('game.php', {
        method: 'POST',
        body: new URLSearchParams({
            action: 'stand'
        })
    })
    .then(response => response.json())
    .then(data => {
        dealerSum = data.dealer_sum;
        dealerAce = data.dealer_ace;
        document.getElementById("hidden").src = `./cards/${data.dealer_cards[0]}.png`;
        document.getElementById("dealer_sum").innerText = dealerSum;

        data.dealer_cards.forEach(function(card, index) {
            if (index !== 0) {
                document.getElementById("dealer_cards").innerHTML += `<img src="./cards/${card}.png" alt="Card">`;
            }
        });

    let message = "";
    if (playerSum > 21) {
        message = "Bust, you lose";
        setTimeout(function() {
            sendScore();
            sessionStorage.setItem('consecutiveWins', 0); 
        }, 1000);

    } else if (dealerSum > 21) {
        message = "Dealer bust, you win!";
        let wins = parseInt(sessionStorage.getItem('consecutiveWins')) || 0;
        sessionStorage.setItem('consecutiveWins', wins + 1); 
    
    } else if (playerSum === dealerSum) {
        message = "Push!";
        sessionStorage.setItem('consecutiveWins', wins); 
    
    } else if (playerSum > dealerSum) {
        message = "You win!";
        let wins = parseInt(sessionStorage.getItem('consecutiveWins')) || 0;
        sessionStorage.setItem('consecutiveWins', wins + 1); 
    
    } else if (playerSum < dealerSum) {
        message = "You lose";
    
        setTimeout(function() {
            sendScore();
            sessionStorage.setItem('consecutiveWins', 0); 
        }, 1000);   
    }
    document.getElementById("results").innerText = message;

    let consecutiveWins = parseInt(sessionStorage.getItem('consecutiveWins')) || 0;
    if (consecutiveWins > 0 && message !== "You lose") {
        setTimeout(function() {
            alert("You won " + consecutiveWins + " games in a row!");
        }, 1000);
    }

    setTimeout(function() {
        window.location.reload();
    }, 3000); 
    })
    .catch(error => console.error('Error:', error));
}

function sendScore() {
    let playerName = prompt("Enter your name:");
    const xhr = new XMLHttpRequest();
    const url = 'score.php';

    const data = JSON.stringify({
        score: parseInt(sessionStorage.getItem('consecutiveWins')) || 0,
        name: playerName
    });

    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(data);
}
