//-------------------------------- Constants --------------------------------

const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]
//---------------------------- Variables (state) ----------------------------
let board = ""; //state of the board
let turn = '';  // whose turn it is to play
let winner = '';   // winner of game
let tie = ''; // tell is tie, otherwise empty string

//------------------------ Cached Element References ------------------------
const msg = document.getElementById('message');
const squares = document.querySelectorAll('.sqr');
const resetBtn = document.getElementById('reset-btn');


//-------------------------------- Functions --------------------------------
function init() {
    board = [
        '', '', '',
        '', '', '',
        '', '', ''
    ];
    turn = 'X';
    winner = null;
    tie = "";
        render();
    }

    function render() {   // displays whose turn or if tie or winner
        for (let pos = 0; pos < board.length; pos++) {
            squares[pos].textContent = board[pos];
        }
        if (winner) {
            msg.textContent = winner + " wins!";
        } else if (tie) {
            msg.textContent = "It's a tie!";
        } else {
            msg.textContent = "It's " + turn + "'s turn!";
        }
    }    

    function handleMove(index) {  // handles players move, updates game state, checks for winner, 
                                // and tells players whose turn
        if (!board[index] && !winner) {
            board[index] = turn;  // Update the board state
            winner = getWinner();  // Check for a winner
            tie = !board.includes('') && !winner;  // Check for a tie
            if (turn === 'X') {
                turn = 'O';
            } else {
                turn = 'X';
            }
            render();  // prints to screen state or whose turn
        }
} 

function getWinner() {
    for (let pos = 0; pos < winningCombos.length; pos++) {
        const combo = winningCombos[pos];
        const a = combo[0];
        const b = combo[1];
        const c = combo[2];
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
          return board[a];
         } else {
            }
        }
    return null;
}

// ----------------------------- Event Listeners --------------------------------

squares.forEach((square, index) => {
    square.addEventListener('click', () => handleMove(index));
});

resetBtn.addEventListener('click', init);


init();