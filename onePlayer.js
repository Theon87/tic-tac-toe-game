function playerOneButton() {
  onePlayer.addEventListener("click", function () {
    if (!onePlayerSelected) {
      onePlayerSelected = true;
      twoPlayerSelected = false;
      gameOver = false;
      currentPlayer = "X";
      gameBoard.style.display = "table";
      onePlayer.style.display = "none";
      twoPlayer.style.display = "none";
      endButton.style.display = "block";
      playAgainButton.style.display = "block";
      setupGameBoardForOnePlayer();
    }
    console.log("one-player-selected: ", onePlayerSelected);
    console.log("two-player-selected: ", twoPlayerSelected);
  });
}

function randomBox(max) {
  return Math.floor(Math.random() * max);
}

function computerTurn() {
  const computerOptions = [];

  for (let i = 0; i < cells.length; i++) {
    const box = cells[i];
    if (box.innerHTML === "") {
      computerOptions.push(i);
    }
  }

  let randomIndex = computerOptions[randomBox(computerOptions.length)];
  let turn = cells[randomIndex];

  turn.innerHTML = currentPlayer;
  board[randomIndex] = currentPlayer;

  console.log(turn);

  console.log(computerOptions);

  checkGameStatus();
}

function checkGameStatus() {
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
  }
  return false;
}

function setupGameBoardForOnePlayer() {
  if (onePlayerSelected) {
    cells.forEach((cell, index) => {
      cell.addEventListener("click", function () {
        if (cell.innerHTML === "" && !gameOver && currentPlayer === "X") {
          cell.innerHTML = currentPlayer;
          board[index] = currentPlayer;

          if (checkGameStatus()) return;

          currentPlayer = "O";
          setTimeout(() => {
            if (!gameOver) {
              computerTurn();
              if (!gameOver) {
                currentPlayer = "X";
              }
            }
          }, 500);
        }
      });
    });
  }
}

function playGame() {
  playerOneButton();
  playAgain();
  resetGame();
  endGame();
}

playGame();
