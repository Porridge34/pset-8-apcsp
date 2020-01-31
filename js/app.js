///////////////////// CONSTANTS /////////////////////////////////////
const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];
///////////////////// APP STATE (VARIABLES) /////////////////////////
let board;
let turn;
let win;
let aIXorO;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

///////////////////// EVENT LISTENERS ///////////////////////////////
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;
document.getElementById("ai-button").onclick = stupidAI;
///////////////////// FUNCTIONS /////////////////////////////////////
function getWinner() {
  let winner = null;
  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
    }
  });
  return winner ? winner : board.includes("") ? null : "T";
}
function init() {
  board = [
    "", "", "",
    "", "", "",
    "", "", ""
  ];
  turn = "X";
  win = null;
  stupidAIIsTrue = false;
  render();
}
function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });
  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}
function takeTurn(e) {
  if (!win && !stupidAIIsTrue) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    console.log(index);
    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      render();
    }
  }else if(!win && stupidAIIsTrue){
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });
    console.log(index);
    if (board[index] === "" && turn !== aIXorO) {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();
      render();
      stupidAI();
    }
  }
}
function stupidAI(){
  stupidAIIsTrue = true;
  if (!win) {
    let index = getBestMove();
    console.log(index);
    board[index] = turn;
    aIXorO = turn;
    turn = turn === "X" ? "O" : "X";
    win = getWinner();
    render();
  }
}
function getBestMove(){
  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]]
    ) {
      return board[condition[2]];
    }else if(board[condition[0]] && board[condition[1]] === board[condition[0]]){
        return board[condition[0]];
      }
    )else if(board[condition[0]] === board[condition[2]]){
      return board[condition[1]];
    }else{
      let index = getRandomIndex(board.length);
      while(board[index] !== ""){
        index = getRandomIndex(board.length);
      }
      return index;
    }
  });
}
function getRandomIndex(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
