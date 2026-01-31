const player1Input = document.getElementById('player1');
const player2Input = document.getElementById('player2');
const submitBtn = document.getElementById('submit');
const messageDiv = document.querySelector('.message');
const boardDiv = document.getElementById('board');
const cells = Array.from(document.querySelectorAll('.board button'));

let player1 = '';
let player2 = '';
let currentPlayer = '';
let currentSymbol = 'x';
let board = Array(9).fill(null);
let gameOver = false;

submitBtn.addEventListener('click', startGame);

function startGame() {
  player1 = player1Input.value || 'Player1';
  player2 = player2Input.value || 'Player2';

  currentPlayer = player1;
  currentSymbol = 'x';
  board = Array(9).fill(null);
  gameOver = false;

  cells.forEach(cell => {
    cell.textContent = '';
    cell.disabled = false;
  });

  messageDiv.textContent = `${player1}, you're up`;
  boardDiv.classList.remove('hidden');
}

cells.forEach(cell => {
  cell.addEventListener('click', () => handleMove(cell));
});

function handleMove(cell) {
  if (gameOver) return;
  const index = Number(cell.id) - 1;
  if (board[index]) return;

  cell.textContent = currentSymbol;
  board[index] = currentSymbol;

  if (checkWin()) {
    messageDiv.textContent = `${currentPlayer} congratulations you won!`;
    gameOver = true;
    return;
  }

  if (board.every(v => v !== null)) {
    messageDiv.textContent = `It's a draw!`;
    gameOver = true;
    return;
  }

  // switch player
  if (currentSymbol === 'x') {
    currentSymbol = 'o';
    currentPlayer = player2;
  } else {
    currentSymbol = 'x';
    currentPlayer = player1;
  }

  messageDiv.textContent = `${currentPlayer}, you're up`;
}

function checkWin() {
  const wins = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];

  return wins.some(combo =>
    combo.every(i => board[i] === currentSymbol)
  );
}
