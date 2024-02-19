function createCards() {
    const deckElement = document.getElementById('deck');
    const suits = ['C', 'D', 'H', 'S']; 
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];

    suits.forEach(suit => {
        values.forEach(value => {
            const cardElement = document.createElement('div');
            cardElement.classList.add('card');
            cardElement.style.backgroundImage = `url(cards/${value}${suit}.jpg)`;
            deckElement.appendChild(cardElement);
        });
    });
}
window.onload = createCards;
