let dealerSum = 0;
let playerSum = 0;
let dealerAce = 0;
let playerAce = 0;
let hidden;
let deck;
let canHit = true; //allows player to draw while sum is lower than 21

window.onload = function () {
    buildDeck();
    shuffleDeck();
    startGame();
}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]);
        }
    }
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAce += checkAce(hidden);


    let cardImg = document.createElement("img");
    cardImg.src = "./cards/BACK.png";

    for (let i = 0; i < 2; i++) {
        deal("player");
    }

    deal("dealer");
    
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stand").addEventListener("click", stand);
}

function deal(target){
    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    
    if(target === "player"){
        playerSum += getValue(card);
        playerAce += checkAce(card);
        document.getElementById("player_cards").append(cardImg);
        document.getElementById("player_sum").textContent = playerSum;
    } else if(target === "dealer"){
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer_cards").append(cardImg);
    }
}


function hit(){
    if (!canHit) {
        return;
    }

    deal("player");

    if(reduceAce(playerSum, playerAce) > 21) {
        stand();
        canHit = false;
    }
}

function stand(){

    let hiddenCardImg = document.getElementById("dealer_cards").getElementsByTagName("img")[0];
    hiddenCardImg.src = "./cards/" + hidden + ".png";

    while (dealerSum < 17) {
        deal("dealer");
    }
    dealerSum = reduceAce(dealerSum,dealerAce);
    playerSum = reduceAce(playerSum, playerAce);

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";
    
    let message = "";

    if(playerSum > 21) {
        message = "Bust, you lose";
    }

    else if (dealerSum > 21) {
        message = "Dealer bust, you win!";
    }

    else if (playerSum == dealerSum) {
        message = "Push!";
    }

    else if (playerSum > dealerSum) {
        message = "You win!";
    }

    else if (playerSum < dealerSum) {
        message = "You lose";
    }

    document.getElementById("dealer_sum").innerText = dealerSum;
    document.getElementById("player_sum").innerText = playerSum;
    document.getElementById("results").innerText = message;
}

function getValue(card) {
    let data = card.split("-")[0];
    let value = data;

    if(isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if(card[0] == "A"){
        return 1;
    }
    return 0;
}

function reduceAce (sum, aceCount) {
    while(sum > 21 && aceCount > 0) {
        sum -= 10;
        aceCount -= 1;
    }
    return sum;
}

