'use strict';

//Selecting ELements
const player1 = document.querySelector('.player-1');
const player2 = document.querySelector('.player-2');
const playerCurrentScore1 = document.querySelector('#player-current-score-1');
const playerCurrentScore2 = document.querySelector('#player-current-score-2');
const playerFinalScore1 = document.querySelector('#player-final-score-1');
const playerFinalScore2 = document.querySelector('#player-final-score-2');
const setWinningScore = document.querySelector('#win-score');
const dice = document.querySelector('.dice');
const rollDice = document.querySelector('.btn-roll');
const holdDice = document.querySelector('.btn-hold');
const resetGame = document.querySelector('.btn-new');

//let isGameOver, scoreToWin, activePlayer, score, finalScore;
let isGameOver = false;
let scoreToWin = 0;
let activePlayer = 1;
let score = 0;
let finalScore = 0;

const initGame = () => {
  playerCurrentScore1.textContent = 0;
  playerCurrentScore2.textContent = 0;
  playerFinalScore1.textContent = 0;
  playerFinalScore2.textContent = 0;
  setWinningScore.selectedIndex = 4;
  setWinningScore.removeAttribute('disabled');
  dice.classList.add('hidden');
  player1.classList.add('player-active');
  player1.classList.remove('player-winner');
  player2.classList.remove('player-active', 'player-winner');

  if (document.contains(document.querySelector('.winner'))) {
    document.querySelector('.winner').remove();
  }

  scoreToWin = parseInt(setWinningScore.value);
};

initGame();

setWinningScore.addEventListener('change', function () {
  scoreToWin = Number(this.value);
  this.setAttribute('disabled', true);
});

const switchPlayer = () => {
  if (!isGameOver) {
    //reset current score to 0
    document.querySelector(`#player-current-score-${activePlayer}`).textContent = 0;
    //toggle background color
    player1.classList.toggle('player-active');
    player2.classList.toggle('player-active');

    //add score to final score
    finalScore = parseInt(document.querySelector(`#player-final-score-${activePlayer}`).textContent);

    document.querySelector(`#player-final-score-${activePlayer}`).textContent = finalScore + score;

    updateFinalScore();

    activePlayer = activePlayer === 1 ? 2 : activePlayer === 2 ? 1 : activePlayer;
    score = 0;
  }
};

const updateFinalScore = () => {
  if (finalScore + score >= scoreToWin) {
    isGameOver = true;
    dice.classList.add('hidden');
    document.querySelector(`#player-final-score-${activePlayer}`).textContent = finalScore + score;
    document.querySelector(`#player-current-score-${activePlayer}`).textContent = 0;
    document.querySelector(`.player-${activePlayer}`).classList.add('player-winner');
    document.querySelector(`#player-final-score-${activePlayer}`).insertAdjacentHTML('afterend', '<p class ="winner">⭐You Win! ✨</p>');
  }
};

rollDice.addEventListener('click', function () {
  if (!isGameOver) {
    const activeScore = Math.floor(Math.random() * 6) + 1;
    setWinningScore.setAttribute('disabled', true);
    dice.classList.remove('hidden');
    dice.src = `./img/dice-${activeScore}.png`;

    if (activeScore !== 1) {
      score += activeScore;
      document.querySelector(`#player-current-score-${activePlayer}`).textContent = score;

      finalScore = parseInt(document.querySelector(`#player-final-score-${activePlayer}`).textContent);
      updateFinalScore();
    } else {
      switchPlayer();
    }
  }
});

holdDice.addEventListener('click', switchPlayer);

resetGame.addEventListener('click', function () {
  isGameOver = false;
  scoreToWin = 0;
  activePlayer = 1;
  score = 0;
  finalScore = 0;
  initGame();
});
