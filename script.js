const board = document.querySelector(".board");
const start = document.querySelector(".btn-start");
const reset = document.querySelector(".btn-reset");
let health = 3;
let points = 0;
let timeLeft = 59;
let amountSquare = 5;
let elementClicked = false;
let lastNumber;

function renderSquare() {
  x = Math.pow(amountSquare, 2);

  for (let i = 0; i < x; i++) {
    const div = document.createElement("button");
    div.value = i;
    div.classList.add("square");
    board.appendChild(div);
  }
}
renderSquare();

function getRandomNumber() {
  const number = Math.floor(Math.random() * x);

  if (lastNumber === number) return getRandomNumber();
  lastNumber = number;
  return number;
}

function initialSquare() {
  const squareValue = getRandomNumber();
  const squares = document.querySelectorAll(".board button");

  squares.forEach((e) => {
    e.classList.contains("active") ? e.classList.remove("active") : "";
    Number(e.value) === squareValue ? e.classList.add("active") : "";
  });
  setTimeout(check, 2000);
}

function gameTimer() {
  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      alert(`Świetnie! Twój wynik to: ${points}!`);
      window.location.reload();
    }
    document.querySelector(".btn-time").innerHTML = `Czas: ${timeLeft} sek`;
    timeLeft = timeLeft - 1;
  }, 1000);
}

function gameLogic() {
  board.addEventListener("click", (e) => {
    elementClicked = true;

    if (e.target.classList.contains("active")) {
      points++;
    } else {
      health--;
      if (health === 0) {
        alert(`Game over! Twój wynik to ${points}!`);
        window.location.reload();
        return;
      }
      alert("straciłeś życie");
    }
    updateData();
  });
}

function check() {
  if (!elementClicked) {
    health--;
    if (health === 0) {
      alert(`Game over! Twój wynik to ${points}!`);
      window.location.reload();
      return;
    }
    alert("straciłeś życie");
  }
  updateData();
  elementClicked = false;
}

function updateData() {
  document.querySelector(".btn-health").innerHTML = `Życia: ${health}`;
  document.querySelector(".btn-points").innerHTML = `Punkty: ${points}`;
}

start.addEventListener("click", () => {
  startGame();
  gameTimer();
  gameLogic();
});

reset.addEventListener("click", () => {
  window.location.reload();
});

function startGame() {
  do_this = setInterval(initialSquare, 3000);
}

function stopGame() {
  do_this = clearInterval(do_this);
}
