'use strict';

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
const btnStart = document.querySelector('button');
const bonkSound = document.querySelector('#bonk');
const music = document.querySelector('#music');
const startScreen = document.querySelector('.start-screen');
const showScore = document.querySelector('.show-score');
const musicOnBtn = document.querySelector('#on');

let score = 0;
let lastHole;
let timeUp = false;

music.play();
music.volume = 0.2;
music.loop = true;

function musicOff() {
  if (music.currentTime === 0) {
    music.play();
    musicOnBtn.textContent = 'OFF';
  } else {
    music.pause();
    music.currentTime = 0;
    musicOnBtn.textContent = 'ON';
  }
}

musicOnBtn.addEventListener('click', musicOff);

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
  scoreBoard.classList.remove('add');
  startScreen.classList.add('hide');

  // start peep
  peep();

  setTimeout(() => {
    timeUp = true;
    startScreen.classList.remove('hide');

    if (score > 0) {
      showScore.classList.add('show');
      const message = 'Your score: ' + score + (score >= 10 ? " GREAT!" : '');
      showScore.textContent = message;
    }
  }, 10000);
}

function bonk(e) {
  if (!e.isTrusted) return;
  bonkSound.currentTime = 0;
  this.classList.add('wow');
  setTimeout(() => {
    this.classList.remove('wow');  
  }, 300);
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
