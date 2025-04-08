const play = document.getElementById("play");
const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("reset");
const endButton = document.getElementById("end");
const playAgainButton = document.getElementById("playAgain");
const lightDarkTheme = document.getElementById("lightDarkTheme");

let summary = document.getElementById("summary");
let result = document.getElementById("result");

let currentPlayer = "";
let cells = document.querySelectorAll("td");
let board = ["", "", "", "", "", "", "", "", ""];
let gameOver = false;
let countXWins = 0;
let countOWins = 0;

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

function updateSummaryTable() {
  return `
        <tr>
          <td></td>
          <td>WINS</td>
        </tr>
        <tr>
          <td>X</td>
          <td>${countXWins}</td>
        </tr>
        <tr>
          <td>O</td>
          <td>${countOWins}</td>
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
    gameOver = false;
    currentPlayer = "X";
    gameBoard.style.display = "table";
    play.style.display = "none";
    endButton.style.display = "block";
    playAgainButton.style.display = "block";
  });
}

function resetGame() {
  resetButton.addEventListener("click", function () {
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.innerHTML = ""));
    result.innerHTML = "";
    currentPlayer = "X";
    countXWins = 0;
    countOWins = 0;
    updateSummaryTable();
    summary.style.display = "none";
    gameBoard.style.display = "table";
    resetButton.style.display = "none";
    endButton.style.display = "block";
    play.style.display = "none";
    playAgainButton.style.display = "block";
  });
}

function playAgain() {
  playAgainButton.addEventListener("click", function () {
    gameOver = false;
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach((cell) => (cell.innerHTML = ""));
    result.innerHTML = "";
    currentPlayer = "X";
    summary.style.display = "none";
    resetButton.style.display = "none";
    gameBoard.style.display = "table";
    endButton.style.display = "block";
    play.style.display = "none";
    playAgainButton.style.display = "block";
  });
}

function endGame() {
  endButton.addEventListener("click", function () {
    result.innerHTML = "";
    summary.innerHTML = updateSummaryTable();
    summary.style.display = "table";
    gameBoard.style.display = "none";
    endButton.style.display = "none";
    resetButton.style.display = "block";
  });
}

function setupGameBoard() {
  cells.forEach((cell, index) => {
    cell.addEventListener("click", function () {
      if (cell.innerHTML === "" && !gameOver) {
        cell.innerHTML = currentPlayer;
        board[index] = currentPlayer;

        if (checkWin(currentPlayer)) {
          result.innerHTML = `PLAYER "${currentPlayer}" WINS!`;
          gameOver = true;
          if (currentPlayer === "X") {
            countXWins++;
          } else {
            countOWins++;
          }
        } else if (checkDraw()) {
          result.innerHTML = "DRAW";
          gameOver = true;
        } else {
          currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
      }
    });
  });
}

function playGame() {
  playButton();
  setupGameBoard();
  playAgain();
  resetGame();
  endGame();
}

playGame();

function loadTheme() {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.documentElement.classList.add("dark-theme");
  }
}

function changeLightDarkTheme() {
  lightDarkTheme.addEventListener("click", function () {
    // document.body.classList.toggle("dark-theme");
    document.documentElement.classList.toggle("dark-theme");

    if (document.documentElement.classList.contains("dark-theme")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  });
}

loadTheme();
changeLightDarkTheme();
