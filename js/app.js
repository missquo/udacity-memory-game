// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

// Creates each card
function createCard(cardNumber) {
	const listItem = document.createElement('li');
	listItem.classList.add('card');

	 switch (cardNumber) {
	 case 0:
	 case 1:
		iconClass = 'fa-diamond';
		break;
	case 2:
	case 3:
		iconClass = 'fa-paper-plane-o';
		break;
	case 4:
	case 5:
		iconClass = 'fa-ship';
		break;
	case 6:
	case 7:
		iconClass = 'fa-space-shuttle';
		break;
	case 8:
	case 9:
		iconClass = 'fa-cube';
		break;
	case 10:
	case 11:
		iconClass = 'fa-leaf';
		break;
	case 12:
	case 13:
		iconClass = 'fa-bicycle';
		break;
	case 14:
	case 15:
		iconClass = 'fa-bomb';
		break;
	}
	const html = '<i class="fa ' + iconClass + '"></i>';
	listItem.innerHTML = html;
	return listItem;
}

// Creates list of cards
function createDeck() {
	let deck = [];
	let i = 0;
	while (i < 16) {
		deck[i] = createCard(i);
		i++;
	}
	return deck;
}

//Displays Deck
function displayCards(displayShuffled) {
	const board = document.querySelector('.deck');
	let newCard;
	board.innerHTML = '';
	for (let i = 0; i < displayShuffled.length; i++) {
		newCard = displayShuffled[i];
		board.appendChild(newCard);
 } 
}

// Displays card
function showCard (card) {
	card.classList.add('open', 'show');
}

//Hides card
function hideCard (card) {
	card.classList.remove('open','show','match');	
}

// Put all cards in list
const allCards = createDeck();

// Put all shuffle cards in list
const shuffledCards = shuffle(allCards);

// Create board
displayCards(shuffledCards);

let clicks = 0;

// Listens for card clicks
document.querySelector('.deck').addEventListener('click', function (evt) {
	if (evt.target.nodeName === 'LI') {
		let currentCard = evt.target;
		if (currentCard.classList.contains('match') || currentCard.classList.contains('show')) {
			return false;
		} else {
			showCard(currentCard);
		}		
	}
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */

 