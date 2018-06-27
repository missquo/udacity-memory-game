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

// Declare function to create each card
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

// Declare function to create list of cards
function createDeck() {
	let deck = [];
	let i = 0;
	while (i < 16) {
		deck[i] = createCard(i);
		i++;
	}
	return deck;
}

// Declare function to display deck
function displayCards(displayShuffled) {
	const board = document.querySelector('.deck');
	let newCard;
	board.innerHTML = '';
	for (let i = 0; i < displayShuffled.length; i++) {
		newCard = displayShuffled[i];
		board.appendChild(newCard);
 } 
}

// Declare function to display card
function showCard (card) {
	card.classList.add('open', 'show');
}

// Declare function to hide card
function hideCard (card) {
	card.classList.remove('open','show','match');	
}

// Declare function to lock matched cards
function matchCard(card) {
	card.classList.remove('open', 'show');
	card.classList.add('match');
}

// Declare list for created cards
const allCards = createDeck();

// Declare list for shuffled cards
const shuffledCards = shuffle(allCards);

// Create board
displayCards(shuffledCards);

// Declare list of showing cards
let showingCards = [];

//List of matched cards
let matchedCards = [];

// Declare function to see if cards match
function isMatch(card1, card2) {
	const card1Classes = card1.firstElementChild.classList;
	const card2Classes = card2.firstElementChild.classList;
	const match = card2Classes.contains(card1Classes[1]);
	return match;
}


let clicks = 0;

// Listens for card clicks
document.querySelector('.deck').addEventListener('click', function (evt) {
	if (evt.target.nodeName === 'LI') {
		let currentCard = evt.target;
		if (currentCard.classList.contains('match') || currentCard.classList.contains('show')) {
			return false;
		} else {
			showCard(currentCard);
			if (showingCards.length === 1) {
				if (isMatch(currentCard, showingCards[0])) {
					matchCard(currentCard);
					matchCard(showingCards[0]);
				} else {
					setTimeout(function(){ hideCard(currentCard); }, 1000);
					// setTimeout(hideCard(currentCard), 2000);
					setTimeout(function(){ hideCard(showingCards[0]); }, 1000);
				}
				setTimeout(function() { showingCards = []; }, 1000);
			} else{
				showingCards[0] = currentCard;
			}
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

 