<?php session_start();?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="leaderboard.css">
</head>
<body>
    <div>
    <h1>Leaderboard</h1>
    <table>
        <tr>
            <th>Username</th>
            <th>Consecutive Wins</th>
        </tr>
        <?php

if (isset($_SESSION['leaderboard'])) {
            usort($_SESSION['leaderboard'], function ($a, $b) {
                return $b['score'] - $a['score'];
            });

            $counter = 0;
            foreach ($_SESSION['leaderboard'] as $player) {
                if ($counter < 10) {
                    echo "<tr><td>{$player['name']}</td><td>{$player['score']}</td></tr>";
                    $counter++;
                } else {
                    break;
                }
            }
        } else {
            echo "<tr><td colspan='2'>No data available</td></tr>";
        }
        ?>
    </table>
    <a href="../">Play Again</a>
    </div>
</body>
</html>
