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
		// hideCard(displayShuffled[i]);
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
	matchedCards.push(card);
}

// Declare function to see if cards match
function isMatch(card1, card2) {
	const card1Classes = card1.firstElementChild.classList;
	const card2Classes = card2.firstElementChild.classList;
	const match = card2Classes.contains(card1Classes[1]);
	return match;
}

// Declare function to update moves
function showMoves(num) {
	let displayMoves = document.querySelector('.moves');
	displayMoves.textContent = num;
}

// Declare function to update star rating
function starRating(num) {
	let three = document.querySelector('.threestar');
	let two = document.querySelector('.twostar');
	switch (num) {
	 case 15:
		three.classList.remove('fa-star');
		three.classList.add('fa-star-half-o');
		break; 
	 case 20:
		three.classList.remove('fa-star-half-o');
		three.classList.add('fa-star-o');
		break;
	 case 25:
		two.classList.remove('fa-star');
		two.classList.add('fa-star-half-o');
		break; 
	 case 30:
		two.classList.remove('fa-star-half-o');
		two.classList.add('fa-star-o');
		break;
	 }	 
}

// Declare function to start timer
function startTimer() {
	start++;
	let minutes = Math.floor(start / 60);
	let seconds = start - (minutes*60);
	let minzero = '';
	let seczero = '';
	if (minutes < 10) { minzero = '0'; }
	if (seconds < 10) { seczero = '0'; }
	document.querySelector('.timer').innerHTML = minzero + minutes + ":" + seczero + seconds;
	}

// Declare function to end timer
function stopTimer() {
	clearInterval(interval);
}

// Declare function to reset game
function resetGame() {
	moves = 0;
	start = 0;
	stopTimer();
	showMoves(moves);
	starRating(moves);
	allCards = createDeck();
	shuffledCards = shuffle(allCards);
	displayCards(shuffledCards);
	showingCards = [];
	matchedCards = [];
}

function winGame() {
	stopTimer();
	const board = document.querySelector('.deck');
	board.innerHTML = '';
	board.style.background = 'radial-gradient(circle, blue, black 5%, blue)';
}

// Declare list for created cards
let allCards = createDeck();

// Declare list for shuffled cards
let shuffledCards = shuffle(allCards);

// Declare variable to hold number of moves
let moves = 0;

// Declare list of showing cards
let showingCards = [];

//Declare list of matched cards
let matchedCards = [];

// Declare timer interval and start time
let start = 0;
let interval;

// Create board
displayCards(shuffledCards);

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
					setTimeout(function(){ hideCard(showingCards[0]); }, 1000);
				}
				setTimeout(function() { showingCards = []; }, 1000);
				moves ++;
				showMoves(moves);
				starRating(moves);
				if (matchedCards.length === 16) {
					winGame();
					console.log("You win!!!!!!!!!!!");
				}
				
			} else if (showingCards.length === 0) {
				showingCards[0] = currentCard;
				if (moves === 0) {
					interval = setInterval(startTimer, 1000);
				}
			} else {
				return false;
			}
			
		}		
	}
});

// Listens for game restart click
document.querySelector('.restart').addEventListener('click', function() {
	resetGame();
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

 