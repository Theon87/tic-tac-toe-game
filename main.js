const play = document.getElementById("play");
const table = document.getElementById("table");
const resetButton = document.getElementById("reset");
let result = document.getElementById("result");

let currentPlayer = ""; // 'X' or 'O'
let cells = document.querySelectorAll("td");
let board = ["", "", "", "", "", "", "", "", ""];

const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(player) {
  return winningCombos.some((combo) => {
    return combo.every((index) => board[index] === player);
  });
}

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function playButton() {
  play.addEventListener("click", function () {
    currentPlayer = "X";
    table.style.display = "table";
    reset.style.display = "block";
  });
}

resetButton.addEventListener("click", resetGame);

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerHTML = ""));
  resetButton.style.display = "none";
  result.style.display = "none";
  currentPlayer = "X";
}

function setupGameBoard() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (cell.innerHTML === "") {
        cell.innerHTML = currentPlayer;
        board[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
          result.innerHTML = currentPlayer + " WINS!";
        } else if (checkDraw()) {
          result.innerHTML = "DRAW";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X"; // switch turn
        }

        console.log(board);
      }
    });
  });
}

function playGame() {
  playButton();
  setupGameBoard();
}

playGame();
