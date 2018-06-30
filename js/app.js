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

// Declare function to toggle click event availability
function lockPointer(everyCard) {
	let i = 0;
	while (i < 16) {
		everyCard[i].classList.toggle('lock');
		i++;
	}
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
	let starmessage;
	if (num > 29) {
		two.classList.remove('fa-star-half-o');
		two.classList.add('fa-star-o');
		starmessage = 'one star';
	} else if (num > 24) {
		two.classList.remove('fa-star');
		two.classList.add('fa-star-half-o');
		starmessage = 'one and a half stars';
	} else if (num > 19) {
		three.classList.remove('fa-star-half-o');
		three.classList.add('fa-star-o'); 
		starmessage = 'two stars';
	} else if (num > 14) {
		three.classList.remove('fa-star');
		three.classList.add('fa-star-half-o');
		starmessage = 'two and a half stars';
	} else {
		three.classList.remove('fa-star-half-o', 'fa-star-o');
		three.classList.add('fa-star');
		two.classList.remove('fa-star-half-o', 'fa-star-o');
		two.classList.add('fa-star');
		starmessage = 'three stars';
	} 	
	//Returns final number of stars to  winGame function
	return starmessage;
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
	document.querySelector('.timer').innerHTML = "00:00";
	board.style.justifyContent = 'space-between';
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

// Declare function to display winning message
function winGame() {
	stopTimer();
	let gameTime = document.querySelector('.timer').innerText;
	board.innerHTML = "<li class='win'><h1>Congratulations!</h1><h1>You win!</h1></li>";
	board.style.justifyContent = 'center';
	const winningStats = document.createElement('span');
	//Collects winning data and creates message
	winningStats.textContent = "with " + moves + " moves in a time of " + gameTime + " with " + starRating(moves) + "!";
	let winMessage = document.querySelector('.win');
	const button = document.createElement('span');
	button.textContent = "Play again?";
	button.classList.add('button');
	const fragment = document.createDocumentFragment()
	fragment.appendChild(winningStats);
	fragment.appendChild(button);
	//Adds fragment containing message to DOM
	winMessage.appendChild(fragment);
	document.querySelector('.button').addEventListener('click', function() {
		resetGame();
	});
}

// Declare variable for board
const board = document.querySelector('.deck');

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
		//Checks to see if card is already displayed
		if (currentCard.classList.contains('match') || currentCard.classList.contains('show')) {
			return false;
		} else {
			showCard(currentCard);
			//Checks to see if two cards are now visible
			if (showingCards.length === 1) {
				let allCards = document.querySelectorAll('.card');
				lockPointer(allCards);
				// Checks to see if both cards match
				if (isMatch(currentCard, showingCards[0])) {
					matchCard(currentCard);
					matchCard(showingCards[0]);
				} else {
					setTimeout(function(){ 
						hideCard(currentCard);
						hideCard(showingCards[0]);}, 1000);
				}
				setTimeout(function() { 
					showingCards = [];
					lockPointer(allCards);}, 1000);
				moves ++;
				showMoves(moves);
				starRating(moves);
				//Checks to see if all cards have been matched
				if (matchedCards.length === 16) {
					setTimeout(function() { winGame(); }, 1000);
				}
			} else {
				showingCards[0] = currentCard;
				//Starts timer on first card click
				if (moves === 0) {
					interval = setInterval(startTimer, 1000);
				}
			}
		}		
	}
});

// Listens for game restart click
document.querySelector('.restart').addEventListener('click', function() {
	resetGame();
});