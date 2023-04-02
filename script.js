const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('#score');
const timeLeft = document.querySelector('#time');
let score = 0;
let currentTime = 30;
let moleTimerId, countDownTimerId;

function randomTime(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function randomHole() {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  return hole;
}

function moveMole() {
  const time = randomTime(500, 2000);
  const hole = randomHole();
  hole.appendChild(createMole());

  moleTimerId = setTimeout(() => {
    hole.removeChild(hole.lastChild);
    moveMole();
  }, time);
}

function createMole() {
  const mole = document.createElement('div');
  mole.classList.add('mole');
  mole.addEventListener('click', () => {
    mole.parentElement.removeChild(mole);
    score++;
    scoreBoard.textContent = score;
  });
  return mole;
}

function countDown() {
  currentTime--;
  timeLeft.textContent = currentTime;

  if (currentTime === 0) {
    clearInterval(countDownTimerId);
    clearTimeout(moleTimerId);
    alert(`Game over! Your final score is ${score}.`);
    reset();
  }
}

function reset() {
    score = 0;
    scoreBoard.textContent = score;
    currentTime = 30;
    timeLeft.textContent = currentTime;
  }
  
  function startGame() {
    reset();
    moveMole();
    countDownTimerId = setInterval(countDown, 1000);
  }
  
  startGame();
  