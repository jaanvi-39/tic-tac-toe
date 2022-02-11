const cells = document.querySelectorAll(".cell");
const cellArray = [...cells];
const cross = "x";
const circle = "o";
let currentCircle;
const board = document.querySelector("#main");
const winPage = document.querySelector(".win-page");
const winMessage = document.querySelector(".winner");
const contBtn = document.querySelector(".continue");
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

startGame();
function startGame() {
  winPage.style.display = "none";
  cells.forEach((cell) => {
    cell.classList.remove(circle);
    cell.classList.remove(cross);
  });
  currentCircle = false;
  cells.forEach((cell) => {
    cell.addEventListener("click", markCell, { once: true });
  });
  cellTurnHover();
}
function markCell(e) {
  //placeMark
  const cell = e.target;
  let currentClass = currentCircle ? circle : cross;
  placeMark(cell, currentClass);

  //check win
  let result = checkWin(currentClass);
  check(result);

  //check Draw
  //swapMark
  swapTurns();
  cellTurnHover();
}

contBtn.addEventListener("click", startGame);

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}
function swapTurns() {
  currentCircle = !currentCircle;
}
function cellTurnHover() {
  board.classList.remove(circle);
  board.classList.remove(cross);
  if (currentCircle) {
    board.classList.add(circle);
  } else {
    board.classList.add(cross);
  }
}
function checkWin(currentClass) {
  return winningCombinations.some((combination) => {
    return combination.every((index) => {
      return cells[index].classList.contains(currentClass);
    });
  });
}
function check(result) {
  if (result) {
    checkDraw(false);
  } else if (isDraw()) {
    checkDraw(true);
  }
}
function displayWinPage() {
  winPage.style.display = "flex";
}
function isDraw() {
  return cellArray.every((cell) => {
    return cell.classList.contains(circle) || cell.classList.contains(cross);
  });
}
function checkDraw(draw) {
  if (draw) {
    displayWinPage();
    winMessage.innerText = `Draw`;
  } else {
    displayWinPage();
    winMessage.innerText = `${(currentCircle ? circle : cross).toUpperCase()}`;
  }
}
