const cards = document.querySelectorAll('.memory-card');

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let countMatchedPairs = 0; //counter

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;
  this.classList.add('flip');

  if (!hasFlippedCard) {
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  
  checkForMatch();
}
// if cards match, they lock /disable
function checkForMatch() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    disableCards();
    completedPairs();
    console.log(countMatchedPairs);
    return;
  }

  unflipCards();
}

//counter to know when game is finished
function completedPairs(){
  countMatchedPairs++;
  if (countMatchedPairs === 8){
    on();}
  return;
}

function disableCards() {
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);
  resetBoard();
}

//when the unmatching cards flip back over
function unflipCards() {
  lockBoard = true
    //how long it takes to flip back over
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();

  }, 700);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// 
const shuffle = function() {
  cards.forEach(card => {
    let randomPos = Math.floor(Math.random() * 16);
    card.style.order = randomPos;
  });
}
shuffle();

function on() {
  document.getElementById("overlay").style.display = "block";
}

function off() {
  document.getElementById("overlay").style.display = "none";
}
  

cards.forEach(card => card.addEventListener('click', flipCard));

document.getElementById('restartGame').addEventListener('click', gameOverState);


//restart the game in the overlay
function enableCards(){
  for(let i = 0; i < cards.length;i++){
      cards[i].addEventListener('click', flipCard);}
      
}
function gameOverState(){
      for(let i = 0; i < cards.length;i++){
      cards[i].classList.remove('flip');
      enableCards();
      shuffle();
      off();
  }
}


