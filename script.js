'use strict';
//selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

score0El.textContent = 0;
score1El.textContent = 0;

//image
const diceEl = document.querySelector('.dice');
diceEl.classList.add('hidden');

//buttons
const rollDice = document.querySelector('.btn--roll');
const rollNew = document.querySelector('.btn--new');
const rollHold = document.querySelector('.btn--hold');

const current0El = document.querySelector('#current--0');
const current1El = document.querySelector('#current--1');

let playing, scores, currentScore, activePlayer;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  diceEl.classList.add('hidden');

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;

  // notActivePlayer = activePlayer === 0 ? activePlayer + 1 : 0;

  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

//RollDice
rollDice.addEventListener('click', function () {
  if (playing) {
    //   document.querySelector('#current--0').value = '';
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switching to next player
      switchPlayer();
    }
  }
});

//RollHold
rollHold.addEventListener('click', function () {
  if (playing) {
    //add currentscore to player
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    //   currentScore = 0;
    if (scores[activePlayer] >= 100) {
      playing = false;
      //dice
      diceEl.classList.add('hidden');

      //winner background
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      //winner name
      document.getElementById(`name--${activePlayer}`).classList.add('name');
      document.getElementById(`score--${activePlayer}`).textContent = 'you won';
    } else {
      //switching to next player
      switchPlayer();
    }
  }
});

//RollNew;
rollNew.addEventListener('click', init);
