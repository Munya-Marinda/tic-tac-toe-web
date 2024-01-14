////////////////////////////////

const statusDisplay = document.querySelector(".game--status");

let gameActive = true;

let currentPlayer = "X";

let gameState = ["", "", "", "", "", "", "", "", ""];

const winningMessage = () => `Player ${currentPlayer} has won!`;
const drawMessage = () => "Game ended in a draw!";
const currentPlayerTurn = () => {
  switch (currentPlayer) {
    case "O":
      statusDisplay.style.color = "red";
      break;

    case "X":
      statusDisplay.style.color = "blue";
      break;

    default:
      break;
  }

  return `It's ${currentPlayer}'s turn`;
};

statusDisplay.innerHTML = currentPlayerTurn();

document
  .querySelectorAll(".cell")
  .forEach((cell) => cell.addEventListener("click", handleCellClick));
document
  .querySelector(".game--restart")
  .addEventListener("click", handleRestartGame);

function handleCellClick(clickedCellEvent) {
  const clickedCell = clickedCellEvent.target;
  const clickedCellIndex = parseInt(
    clickedCell.getAttribute("data-cell-index")
  );

  if (gameState[clickedCellIndex] !== "" || !gameActive) {
    return;
  }

  handleCellPlayed(clickedCell, clickedCellIndex);
  handleResultValidation();
}

function handleCellPlayed(clickedCell, clickedCellIndex) {
  gameState[clickedCellIndex] = currentPlayer;
  //   clickedCell.innerHTML = currentPlayer;

  // select the image to display, o.png or x.png
  let backgroundImage = "";
  if (('currentPlayer === "X"', currentPlayer === "X")) {
    backgroundImage = "./assets/images/x.svg";
  } else if (('currentPlayer === "O"', currentPlayer === "O")) {
    backgroundImage = "./assets/images/o.svg";
  }
  // set the background image
  clickedCell.style.backgroundImage = "url('" + backgroundImage + "')";
}

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function handleResultValidation() {
  let roundWon = false;
  for (let i = 0; i <= 7; i++) {
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    if (a === "" || b === "" || c === "") {
      continue;
    }
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage();
    gameActive = false;
    return;
  }

  let roundDraw = !gameState.includes("");
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage();
    gameActive = false;
    return;
  }

  handlePlayerChange();
}

function handlePlayerChange() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusDisplay.innerHTML = currentPlayerTurn();
}

function handleRestartGame() {
  gameActive = true;
  currentPlayer = "X";
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.style.backgroundImage = "url('')";
  });
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusDisplay.innerHTML = currentPlayerTurn();
  document.querySelectorAll(".cell").forEach((cell) => (cell.innerHTML = ""));
}
