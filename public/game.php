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


?>