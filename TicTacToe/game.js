let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let resetScoreBtn = document.querySelector("#reset-score");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

// Score elements
let playerScoreElem = document.querySelector("#player-score");
let aiScoreElem = document.querySelector("#ai-score");
let drawsElem = document.querySelector("#draws");

// Initialize scores
let scores = {
    player: 0,
    ai: 0,
    draws: 0
};

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [3, 4, 5],
    [1, 4, 7],
    [2, 4, 6],
    [6, 7, 8],
    [2, 5, 8]
];

const resetGame = () => {
    enableBoxes();
    msgContainer.classList.add("hide");
};

const resetScore = () => {
    scores.player = 0;
    scores.ai = 0;
    scores.draws = 0;
    updateScoreDisplay();
};

const updateScoreDisplay = () => {
    playerScoreElem.textContent = scores.player;
    aiScoreElem.textContent = scores.ai;
    drawsElem.textContent = scores.draws;
};

// Minimax algorithm implementation
function minimax(board, depth, isMaximizing) {
    const scores = {
        X: 1,
        O: -1,
        tie: 0
    };

    let result = checkWinner(board);
    if (result !== null) {
        return scores[result];
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'X';
                let score = minimax(board, depth + 1, false);
                board[i] = '';
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') {
                board[i] = 'O';
                let score = minimax(board, depth + 1, true);
                board[i] = '';
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function getBestMove(board) {
    let bestScore = -Infinity;
    let bestMove;
    
    for (let i = 0; i < board.length; i++) {
        if (board[i] === '') {
            board[i] = 'X';
            let score = minimax(board, 0, false);
            board[i] = '';
            if (score > bestScore) {
                bestScore = score;
                bestMove = i;
            }
        }
    }
    return bestMove;
}

function getCurrentBoard() {
    return Array.from(boxes).map(box => box.innerText || '');
}

function checkWinner(board) {
    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }

    // Check for tie
    if (board.every(cell => cell !== '')) {
        return 'tie';
    }

    return null;
}

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;
    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";
    }
};

const showWinner = (winner) => {
    if (winner === 'tie') {
        msg.innerText = "It's a Draw!";
        scores.draws++;
    } else if (winner === 'O') {
        msg.innerText = 'You Won! 🎉';
        scores.player++;
    } else {
        msg.innerText = 'AI Wins!';
        scores.ai++;
    }
    updateScoreDisplay();
    msgContainer.classList.remove("hide");
    disableBoxes();
};

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (!box.innerText) {
            // Human player's move (O)
            box.innerText = "O";
            box.disabled = true;
            
            let currentBoard = getCurrentBoard();
            let result = checkWinner(currentBoard);
            
            if (result) {
                showWinner(result);
                return;
            }

            // Bot's move (X)
            const bestMove = getBestMove(currentBoard);
            
            if (bestMove !== undefined) {
                setTimeout(() => {
                    boxes[bestMove].innerText = "X";
                    boxes[bestMove].disabled = true;
                    
                    currentBoard = getCurrentBoard();
                    result = checkWinner(currentBoard);
                    
                    if (result) {
                        showWinner(result);
                    }
                }, 300);
            }
        }
    });
});

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
resetScoreBtn.addEventListener("click", resetScore);