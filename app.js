const startBtn = document.querySelector('#start');
const screens = document.querySelectorAll('.screen');
const timeList = document.querySelector('#time-list');
const timeEl = document.querySelector('#time');
const board = document.querySelector('#board');
// const icanBetter = document.querySelector('.icanBetter');

let time = 0;
let score = 0;
let gameOver = 0;
const colors = ['rgb(193, 55, 55)', 'rgb(30, 16, 217)', 'rgb(29, 160, 66)', 'rgb(174, 197, 25)', 'rgb(230, 22, 136)', 'rgb(239, 124, 9)', 'rgb(26, 176, 186)'];

startBtn.addEventListener('click', (event) => {
  event.preventDefault();
  screens[0].classList.add('up');
});

timeList.addEventListener('click', (event) => {
  if (event.target.classList.contains('time-btn')) {
    time = parseInt(event.target.getAttribute('data-time'));
    screens[1].classList.add('up');
    startGame(time);
  }
});
board.addEventListener('click', (event) => {
  if (event.target.classList.contains('circle')) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
})
// icanBetter.addEventListener('click', winTheGame);

function startGame(time) {
  gameOver = setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
  console.log('startGame');
  // setTimeout(() => { clearInterval(gameOver); }, time + 1 * 1000);
}

function decreaseTime() {
  if (time === 0) {
    console.log('decreaseTime');
    finishGame();
  } else {
    let current = --time;
    if (current < 10) { current = `0${current}`; }
    setTime(current);
  }
}

function setTime(value) {
  timeEl.innerHTML = `00:${value}`
}

function finishGame() {
  console.log('finishGame');
  timeEl.parentNode.classList.add('hide');
  // timeEl.parentNode.remove;
  board.innerHTML = `<h1>Cчет :<span class="primary"> ${score}</span></h1><br><h1 class="repl2">Game over</h1>`;
  setTimeout(() => { clearInterval(gameOver); }, time * 1000);

}
function clearScreen() {
  console.log('clearScreen');
  timeEl.parentNode.classList.remove('hide');
  board.firstChild.innerText = '';
  board.lastChild.innerText = '';
  // board.innerHTML = '';
  screens[0].classList.remove('up');
  screens[1].classList.remove('up');
  time = 0;
  score = 0;
}

function createRandomCircle() {
  const circle = document.createElement('DIV');
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const x = getRandomNumber(0, width - size);
  const y = getRandomNumber(0, height - size);
  circle.classList.add('circle');
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  setColor(circle);
  board.append(circle);

}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function setColor(element) {
  const color = getRandomColor();
  // element.style.backgroundColor = color;
  element.style.background = color;
}

function getRandomColor() {
  const index = Math.floor(Math.random() * colors.length);
  // console.log('index=', index);
  return colors[index];
}

function winTheGame() {
  function kill() {
    const circle = document.querySelector('.circle');
    circle.click();
  }
  let timerId = setInterval(kill, 375);

  // остановить вывод через время time секунд
  // console.log(time);
  setTimeout(() => { clearInterval(timerId); }, time * 1000);
}
