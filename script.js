const cells = document.querySelectorAll('.cell');
const statusDisplay = document.getElementById('status');
const startButton = document.getElementById('startButton');
const restartButton = document.getElementById('restartButton');

let isXTurn = true;
let board = Array(9).fill(null);
let gameActive = false;

function checkWinner() {
    const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6]             // diagonals
    ];

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return board.includes(null) ? null : 'Draw';
}

function handleClick(event) {
    if (!gameActive) return;

    const cell = event.target;
    const cellIndex = Array.from(cells).indexOf(cell);

    if (board[cellIndex]) return;

    board[cellIndex] = isXTurn ? 'X' : 'O';
    cell.classList.add(isXTurn ? 'x' : 'o');
    cell.textContent = isXTurn ? 'X' : 'O';

    const winner = checkWinner();
    if (winner) {
        gameActive = false;
        statusDisplay.textContent = winner === 'Draw' ? "It's a Draw!" : `${winner} Wins!`;
        restartButton.style.display = "inline";
    } else {
        isXTurn = !isXTurn;
        statusDisplay.textContent = `It's ${isXTurn ? 'X' : 'O'}'s turn`;
    }
}

function startGame() {
    gameActive = true;
    board.fill(null);
    isXTurn = true;
    statusDisplay.textContent = "It's X's turn";
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('x', 'o');
    });
    startButton.style.display = "none";
    restartButton.style.display = "none";
}

function resetGame() {
    startGame();
    statusDisplay.textContent = "New game started! It's X's turn.";
}

startButton.addEventListener('click', startGame);
restartButton.addEventListener('click', resetGame);
cells.forEach(cell => cell.addEventListener('click', handleClick));
