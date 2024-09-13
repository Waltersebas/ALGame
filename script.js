// Jogo da Velha
let currentPlayer = 'X';
let board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

function makeMove(cell, row, col) {
    if (cell.innerHTML === '') {
        cell.innerHTML = currentPlayer;
        board[row][col] = currentPlayer;

        if (checkWinner()) {
            setTimeout(() => {
                alert(`Jogador ${currentPlayer} venceu!`);
                resetGame();
            }, 100);
        } else if (isBoardFull()) {
            setTimeout(() => {
                alert("Empate!");
                resetGame();
            }, 100);
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        }
    }
}

function resetGame() {
    const cells = document.querySelectorAll('td');
    cells.forEach(cell => cell.innerHTML = '');

    board = [
        ['', '', ''],
        ['', '', '']
    ];
    currentPlayer = 'X';
}

function checkWinner() {
    // Verifica linhas
    for (let i = 0; i < 3; i++) {
        if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
            return true;
        }
    }

    // Verifica colunas
    for (let i = 0; i < 3; i++) {
        if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
            return true;
        }
    }

    // Verifica diagonais
    if (board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) {
        return true;
    }

    if (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer) {
        return true;
    }

    return false;
}

function isBoardFull() {
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            if (board[i][j] === '') {
                return false;
            }
        }
    }
    return true;
}

// Jogo da Cobrinha
let canvas = document.getElementById('snakeGame');
let context = canvas.getContext('2d');
let box = 20;
let snake = [{ x: 5 * box, y: 5 * box }];
let direction = 'right';
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
};
let score = 0;
const maxScore = 20;

function drawGame() {
    if (score >= maxScore) {
        alert("Você atingiu a pontuação máxima!");
        clearInterval(game);
        return;
    }

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < snake.length; i++) {
        context.fillStyle = 'green';
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }

    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction === 'right') snakeX += box;
    if (direction === 'left') snakeX -= box;
    if (direction === 'up') snakeY -= box;
    if (direction === 'down') snakeY += box;

    if (snakeX === food.x && snakeY === food.y) {
        food = {
            x: Math.floor(Math.random() * 15 + 1) * box,
            y: Math.floor(Math.random() * 15 + 1) * box
        };
        score++;
    } else {
        snake.pop();
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    if (snakeX < 0 || snakeY < 0 || snakeX >= canvas.width || snakeY >= canvas.height || collision(newHead, snake)) {
        clearInterval(game);
        alert("Game Over!");
    }

    snake.unshift(newHead);
}

function collision(newHead, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (newHead.x === snake[i].x && newHead.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

function startGame() {
    direction = 'right';
    snake = [{ x: 5 * box, y: 5 * box }];
    score = 0;
    game = setInterval(drawGame, 100);
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'ArrowRight' && direction !== 'left') direction = 'right';
    if (event.key === 'ArrowLeft' && direction !== 'right') direction = 'left';
    if (event.key === 'ArrowUp' && direction !== 'down') direction = 'up';
    if (event.key === 'ArrowDown' && direction !== 'up') direction = 'down';
});
