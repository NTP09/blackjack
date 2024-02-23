var dealerSum = 0;
var playerSum = 0;

var dealerAce = 0;
var playerAce = 0;

var hidden;
var deck;

var canHit = true; //allows player to draw while sum is lower than 21

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
            deck.push(values[j] + types[i]);
        }
    }
    console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length);
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame(){
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAce += checkAce(hidden);
    while (dealerSum < 17){
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".jpg";
        dealerSum += getValue(card);
        dealerAce += checkAce(card);
        document.getElementById("dealer_cards").append(cardImg);
    }
    console.log(dealerSum);
}

function getValue(card){
    let data = card;
    let value = data[0];

    if(isNaN(value)){
        if (value == "A"){
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card){
    if(card[0] == "A"){
        return 1;
    }
}