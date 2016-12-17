const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('button');
const bonkSound = document.querySelector('audio');

let score = 0;
let lastHole;
let timeUp = false;

function timer() {
  // let timer = setInterval();
}

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole(holes) {
  const idx = Math.floor(Math.random() * holes.length);
  const hole = holes[idx];

  if (hole === lastHole) {
    return randomHole(holes);
  }
  lastHole = hole;
  return hole;
}

function peep() {
  const time = randomTime(300, 1000);
  const hole = randomHole(holes);

  hole.classList.add('up');

  setTimeout(() => {
    hole.classList.remove('up');
    scoreBoard.classList.remove('add');
    if (!timeUp) peep();
  }, time);
}


function start() {
  score = 0;
  scoreBoard.textContent = score;
  timeUp = false;
  btnStart.classList.add('hide');
  scoreBoard.classList.remove('add');

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
    btnStart.classList.remove('hide');
  }, 10000);
}

function bonk(e) {
  bonkSound.currentTime = 0;
  if (!timeUp) {
    bonkSound.play();
    scoreBoard.classList.add('add');
    score++;
    scoreBoard.textContent = score;
  }
}

moles.forEach(mole => {
  mole.addEventListener('click', bonk);
});

btnStart.addEventListener('click', start);
