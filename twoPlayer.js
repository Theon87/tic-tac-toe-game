const onePlayer = document.getElementById("onePlayer");
const twoPlayer = document.getElementById("twoPlayer");
const gameBoard = document.getElementById("gameBoard");
const resetButton = document.getElementById("reset");
const endButton = document.getElementById("end");
const playAgainButton = document.getElementById("playAgain");
const lightDarkTheme = document.getElementById("lightDarkTheme");

let onePlayerSelected = false;
let twoPlayerSelected = false;
let playerOne = false;
let playerTwo = false;

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

function checkDraw() {
  return board.every((cell) => cell !== "");
}

function checkWin(player) {
  for (let combo of winningCombos) {
    if (combo.every((index) => board[index] === player)) {
      return combo;
    }
  }
  return null;
}

function playerTwoButton() {
  twoPlayer.addEventListener("click", function () {
    if (!twoPlayerSelected) {
      onePlayerSelected = false;
      twoPlayerSelected = true;
      playerOne = false;
      playerTwo = true;
      gameOver = false;
      currentPlayer = "X";
      gameBoard.style.display = "table";
      onePlayer.style.display = "none";
      twoPlayer.style.display = "none";
      endButton.style.display = "block";
      playAgainButton.style.display = "block";
      setupGameBoardForTwoPlayer();
    }
    console.log("one-player-selected: ", onePlayerSelected);
    console.log("two-player-selected: ", twoPlayerSelected);
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
    onePlayer.style.display = "none";
    twoPlayer.style.display = "none";
    playAgainButton.style.display = "block";
    cells.forEach((cell) => {
      cell.classList.remove("winningCell");
    });
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
    onePlayer.style.display = "none";
    twoPlayer.style.display = "none";
    playAgainButton.style.display = "block";
    cells.forEach((cell) => {
      cell.classList.remove("winningCell");
    });
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

console.log("one-player-selected: ", onePlayerSelected);
console.log("two-player-selected: ", twoPlayerSelected);

function setupGameBoardForTwoPlayer() {
  if (twoPlayerSelected) {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", function () {
        if (cell.innerHTML === "" && !gameOver) {
          cell.innerHTML = currentPlayer;
          board[index] = currentPlayer;

          const winningCombo = checkWin(currentPlayer);
          if (winningCombo) {
            result.innerHTML = `PLAYER "${currentPlayer}" WINS!`;
            gameOver = true;

            winningCombo.forEach((index) => {
              cells[index].classList.add("winningCell");
            });

            currentPlayer === "X" ? countXWins++ : countOWins++;
            return true;
          } else if (checkDraw()) {
            result.innerHTML = "DRAW";
            gameOver = true;
            return true;
          } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
          }
        }
      });
    });
  }
  console.log("one-player-selected: ", onePlayerSelected);
  console.log("two-player-selected: ", twoPlayerSelected);
}

function playGame() {
  playerTwoButton();
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
