const play = document.getElementById("play");
const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("reset");
const endButton = document.getElementById("end");

let summary = document.getElementById("summary");
let result = document.getElementById("result");

let currentPlayer = ""; // 'X' or 'O'
let cells = document.querySelectorAll("td");
let board = ["", "", "", "", "", "", "", "", ""];

resetButton.addEventListener("click", resetGame);

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

let countXWins = 0;
let countOLosses = 0;

let countOWins = 0;
let countXLosses = 0;

function updateSummaryTable() {
  return `
        <tr>
          <td></td>
          <td id="wins">WINS</td>
          <td id="loses">LOSES</td>
        </tr>
        <tr>
          <td>X</td>
          <td>${countXWins}</td>
          <td>${countXLosses}</td>
        </tr>
        <tr>
          <td>O</td>
          <td>${countOWins}</td>
          <td>${countOLosses}</td>
        </tr>
`;
}

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
    gameBoard.style.display = "table";
    reset.style.display = "block";
    endButton.style.display = "block";
    summary.style.display = "table";
    play.style.display = "none";
  });
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerHTML = ""));
  // result.innerHTML = "";
  currentPlayer = "X";
  gameBoard.style.display = "table";
  reset.style.display = "block";
  endButton.style.display = "block";
  summary.style.display = "none";
  play.style.display = "none";
}

function playAgain() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach((cell) => (cell.innerHTML = ""));
  result.innerHTML = "";
  currentPlayer = "X";
}

function endGame() {
  endButton.addEventListener("click", function () {
    result.innerHTML = "";
    summary.innerHTML = updateSummaryTable();
    summary.style.display = "table";
  });
}

function setupGameBoard() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (cell.innerHTML === "") {
        cell.innerHTML = currentPlayer;
        board[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
          result.innerHTML = `PLAYER "${currentPlayer}" WINS!`;
          if (currentPlayer === "X") {
            countXWins++;
            countOLosses++;
          } else {
            countOWins++;
            countXLosses++;
          }
        } else if (checkDraw()) {
          result.innerHTML = "DRAW";
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }

        console.log(board);
      }
    });
  });
}

function playGame() {
  playButton();
  setupGameBoard();
  endGame();
}

playGame();
