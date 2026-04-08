let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

const winPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

function createBoard() {
  const boardDiv = document.getElementById("board");
  boardDiv.innerHTML = "";

  board.forEach((cell, index) => {
    const div = document.createElement("div");
    div.classList.add("cell");
    div.innerText = cell;
    div.onclick = () => playerMove(index);
    boardDiv.appendChild(div);
  });
}

function playerMove(index) {
  if (board[index] !== "" || !gameActive) return;

  board[index] = "❌";
  createBoard();

  if (checkWinner("❌")) {
    endGame("🎉 فزت!");
    return;
  }

  if (!board.includes("")) {
    endGame("🤝 تعادل!");
    return;
  }

  setTimeout(computerMove, 500);
}

function computerMove() {
  let emptyCells = board
    .map((val, idx) => (val === "" ? idx : null))
    .filter((v) => v !== null);

  let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "⭕";
  createBoard();

  if (checkWinner("⭕")) {
    endGame("💻 الكمبيوتر فاز!");
    return;
  }

  if (!board.includes("")) {
    endGame("🤝 تعادل!");
  }
}

function checkWinner(player) {
  return winPatterns.some((pattern) => {
    return pattern.every((index) => board[index] === player);
  });
}

function endGame(message) {
  document.getElementById("status").innerText = message;
  gameActive = false;
}

function restartGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  document.getElementById("status").innerText = "دورك (❌)";
  createBoard();
}

createBoard();
