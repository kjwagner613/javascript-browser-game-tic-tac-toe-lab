//-------------------------------- Constants --------------------------------

const winningCombos = [
    [0, 1, 2], //row
    [3, 4, 5], //row
    [6, 7, 8], //row
    [0, 3, 6], //column
    [1, 4, 7], //column
    [2, 5, 8], //column
    [0, 4, 8], //diag
    [2, 4, 6]  //diag
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

    console.log(board[3], board[4], board[5]);
    
    turn = 'X';
    winner = null;
    tie = "";
        render();
    }

    function render() {
        for (let pos = 0; pos < board.length; pos++) {
            squares[pos].textContent = board[pos]; //updates each square with corrsponding array value
        }
        if (winner) {
            document.getElementById('message').textContent = winner + " wins!"; // if winner updates message on index
        } else if (tie) {
            document.getElementById('message').textContent = "It's a tie!"; // is tie updates index etc.
        } else {
            document.getElementById('message').textContent = "It's " + turn + "'s turn!";
        }
    }   

    function handleMove(index) {
        if (!board[index] && !winner) {
            board[index] = turn;  // Update the board state
            winner = getWinner();  // Check for a winner
            tie = !board.includes('') && !winner;  // Check for a tie
            if (turn === 'X') {
                turn = 'O';
            } else {
                turn = 'X';
            }
            render();  // Render the updated game state
        }
    }

    function getWinner() {
        for (let pos = 0; pos < winningCombos.length; pos++) {  //apply evalutation to each winning combination in array
            const combo = winningCombos[pos];  // Retrieve current winning combination from the winningCombos array
            const a = combo[0]; //first value of winning combiation
            const b = combo[1]; //first value of winning combiation 
            const c = combo[2]; // etc.
            if (board[a] && board[a] === board[b] && board[a] === board[c]) { //checks to see if all three have same move X or O
                return board[a]; // if they do, get the winning player symbol X or O
            }
        }
        return null;
    }

// ----------------------------- Event Listeners --------------------------------

squares.forEach((square, index) => {   // when square is 'clicked' update the game based on player symbol
    square.addEventListener('click', () => handleMove(index));
});

resetBtn.addEventListener('click', init);


init();