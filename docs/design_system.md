# System de Design - Jeux de Blackjack 

#### Composants Structurels:
- **En-tête (Header):**
  - Le titre du jeu ("Black Jack") constitue l'en-tête principal de la page.
  - Un bouton "New Game" est placé en haut à gauche de la page pour permettre de réinitialiser le jeu.

- **Corps du Jeu:**
  - Le jeu est centré sur la page.
  - Le corps du jeu comprend les éléments suivants :
    - La zone du Dealer avec les cartes du Dealer.
    - La zone du joueur avec les cartes du joueur.
    - Deux boutons interactifs ("Hit" et "Stand") pour les actions du joueur.
    - Un paragraphe pour afficher les résultats du jeu.
    - Une boutton "Blackjack Rules" qui inclue une courte explication des réglements du jeux blackjack.

- **Pied de Page (Footer):**
  - Un bouton "Leaderboard" est placé en bas a gauche de la page pour permettre de voir le score de chaque joueur et combien de partie consicutive qu'ils on gagné. 
    
| Palette de Couleurs         |                                     |
|-----------------------------|-------------------------------------|
| **Fond de Page:**           | Le fond de la page est une image de fond représentant une table de blackjack, ce qui crée une ambiance visuelle appropriée pour le jeu. |
| **Couleurs Principales:**   | Blanc (#FFFFFF) pour le texte et les éléments interactifs. ![image](https://github.com/NTP09/blackjack/assets/114021910/8654398a-b974-433c-b91e-e253baad64ee)<br>Rouge (#FF0000) pour le bouton "Stand" au survol. ![image](https://github.com/NTP09/blackjack/assets/114021910/3bd93bcc-b715-47df-9a74-6255e3032a7a)<br>Vert (#00FF00) pour le bouton "Hit" au survol. ![image](https://github.com/NTP09/blackjack/assets/114021910/acd402bc-d964-45c3-b7c4-f50f79ef4967)<br>Les cartes elles-mêmes apportent de la couleur à l'interface avec leurs dessins variés.</div> |


| Polices et Tailles          |                                     |
|-----------------------------|-------------------------------------|
| **Police Principale:**      | Arial, une police sans-serif qui assure une lisibilité sur différents appareils. |
| **Tailles de Police:**      | Les titres utilisent une taille de police plus grande pour attirer l'attention et clairement identifier les zones du joueur et du croupier. Les boutons "Hit" et "Stand" utilisent une taille de police plus grande pour faciliter leur sélection par l'utilisateur. Le texte des résultats utilise une taille de police plus grande pour mettre en évidence le resultat final du jeu. |

### Fonctions JavaScript Principales

- **Variables**: 
    - `dealerSum`, `playerSum`, `dealerAce`, `playerAce`, `hidden`, `deck`: Stockent des valeurs liées au jeu de blackjack.
    - `canHit`: Contrôle si le joueur peut demander une carte supplémentaire.

- **Initialisation**: 
    - `window.onload`: Appelle les fonctions nécessaires pour démarrer le jeu.

- **Création du Jeu**:
    - `buildDeck()`: Construit un jeu de cartes.
    - `shuffleDeck()`: Mélange les cartes du jeu.

- **Début de la Partie**:
    - `startGame()`: Distribue les cartes initiales et ajoute des écouteurs d'événements.

- **Distribution des Cartes**:
    - `deal(target)`: Distribue une carte au joueur ou au dealer et met à jour les compteurs de valeurs.

- **Actions du Joueur**:
    - `hit()`: Permet au joueur de demander une carte supplémentaire.
    - `stand()`: Termine le tour du joueur et détermine le résultat de la partie.

- **Calcul des Valeurs des Cartes**:
    - `getValue(card)`: Retourne la valeur d'une carte en points.
    - `checkAce(card)`: Vérifie si une carte est un as.
    - `reduceAce(sum, aceCount)`: Réduit la valeur des as si nécessaire pour éviter de dépasser 21 points.


### Aspect Visuel
![image](https://github.com/NTP09/blackjack/assets/114021910/69fefe28-9553-4817-a000-c994cb1b59c4)

![image](https://github.com/NTP09/blackjack/assets/114021910/755c076f-bc98-46a5-9635-30634c091c39)

![image](https://github.com/NTP09/blackjack/assets/114021910/eca629a7-887a-4075-bb03-36dffd792d57)

![image](https://github.com/NTP09/blackjack/assets/114021910/8ede49dd-fd0f-4c13-8725-df247fd8604d)
