<!DOCTYPE html>
<html lang="en-US">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Black Jack</title>
    <link rel="stylesheet" href="blackjack.css">
    <script src="updated.js"></script>
</head>

<body>
    <button id="reset-game" onclick="window.location.reload()" alt="New Game">New Game</button>
    <h2>Dealer: <span id="dealer_sum"></span></h2>
    <div id="dealer_cards">
        <img id="hidden" src="./cards/BACK.png" alt="Hidden Card">
    </div>

    <h2>Player: <span id="player_sum"></span></h2>
    <div id="player_cards"></div>

    <a href="leaderboard.php" class="button">Leaderboard</a>

    <br>
    <button type="button" id="hit">Hit</button>
    <button type="button" id="stand">Stand</button>
    <p id="results"></p>
    <div id="Blackjack_Rules">
        <details>
            <summary>Blackjack Rules</summary>
            <p>
                Blackjack is a card game where players compete against the dealer. The goal is to get a hand total
                closer to 21 than the dealer's hand without going over 21. Here are the basic rules:
            </p>
            <ul>
                <li>Face cards (Jack, Queen, King) are worth 10 points.</li>
                <li>Aces are worth 1 or 11 points, whichever is more favorable.</li>
                <li>Players are dealt two cards initially.</li>
                <li>Players can choose to "hit" to receive another card, or "stand" to stop receiving cards.</li>
                <li>If a player's hand exceeds 21 points, they bust and lose the game.</li>
                <li>The dealer must hit until their hand totals 17 or more.</li>
                <li>If the dealer busts, the player wins. If the player and dealer have the same total, it's a push.
                </li>
            </ul>
        </details>
    </div>
</body>
</html>