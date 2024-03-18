<?php
session_start();

if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_SERVER["CONTENT_TYPE"]) && $_SERVER["CONTENT_TYPE"] == "application/json") {
    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['name']) && isset($data['score'])) {
        if (!isset($_SESSION['leaderboard'])) {
            $_SESSION['leaderboard'] = [];
        }
        $_SESSION['leaderboard'][] = [
            'name' => $data['name'],
            'score' => $data['score'],
        ];
    }
    echo var_dump($_SESSION['leaderboard']);
}
