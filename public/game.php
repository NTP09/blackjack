<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'start_game') {
    startGame();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'hit') {
    playerHits();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['action']) && $_POST['action'] === 'stand') {
    playerStands();
}

function startGame() {
    $_SESSION['blackjack'] = [
        'dealer_cards' => [],
        'player_cards' => [],
        'dealer_sum' => 0,
        'player_sum' => 0,
        'dealer_ace' => 0,
        'player_ace' => 0
    ];

    distributeCards();
    echo json_encode($_SESSION['blackjack']);
}

function playerHits() {
    drawCard('player');
    echo json_encode($_SESSION['blackjack']);
}

function playerStands() {
    while ($_SESSION['blackjack']['dealer_sum'] < 17) {
        drawCard('dealer');
    }
    echo json_encode($_SESSION['blackjack']);
}

function distributeCards() {
    drawCard('player');
    drawCard('dealer');
    drawCard('player');
}

function drawCard($target) {
    $deck = ["A-C", "2-C", "3-C", "4-C", "5-C", "6-C", "7-C", "8-C", "9-C", "10-C", "J-C", "Q-C", "K-C",
             "A-D", "2-D", "3-D", "4-D", "5-D", "6-D", "7-D", "8-D", "9-D", "10-D", "J-D", "Q-D", "K-D",
             "A-H", "2-H", "3-H", "4-H", "5-H", "6-H", "7-H", "8-H", "9-H", "10-H", "J-H", "Q-H", "K-H",
             "A-S", "2-S", "3-S", "4-S", "5-S", "6-S", "7-S", "8-S", "9-S", "10-S", "J-S", "Q-S", "K-S"];
    $randomIndex = array_rand($deck); 
    $card = $deck[$randomIndex]; 
    unset($deck[$randomIndex]); 
    $value = getValue($card);
    $_SESSION['blackjack'][$target.'_cards'][] = $card;
    $_SESSION['blackjack'][$target.'_sum'] += $value;
    $_SESSION['blackjack'][$target.'_ace'] += checkAce($card);
}

function getValue($card) {
    $data = explode("-", $card)[0];
    $value = $data;

    if (!is_numeric($value)) {
        if ($value === "A") {
            return 11;
        }
        return 10;
    }
    return intval($value);
}

function checkAce($card) {
    if ($card[0] === "A") {
        return 1;
    }
    return 0;
}

?>