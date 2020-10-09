// TicTacToe AI using Minimax Algorithm
// Author : Adarsh Pal
// Version : 1.0

//Create canvas for TictacToe board
function setup() {
	let intro = createP('');
  intro.style('font-size', '28pt');
	intro.html('I play \'X\', you play \'O\'!');
  createCanvas(400, 400);
  w = width / 3;
  h = height / 3;
  //Calculate the Best Move for AI
	bestMove();
}

//Draw function to continously draw the Board
function draw() {
  background(255);
  strokeWeight(4);

  line(w, 0, w, height);
	line(0, h, width, h);
  line(w * 2, 0, w * 2, height);
  line(0, h * 2, width, h * 2);

  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];
      textSize(32);
      let r = w / 4;
      
			if (spot == human) {
        noFill();
        ellipse(x, y, r * 2);
      } 
			else if (spot == ai) {
        line(x - r, y - r, x + r, y + r);
        line(x + r, y - r, x - r, y + r);
      }
    }
  }
	
	//Keeps Checking for winner everytime the board is drawn
  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resultP = createP('');
    resultP.style('font-size', '28pt');
    
		if (result == 'tie') {
      resultP.html('Its a Tie! Not Bad');
    } 
		else {
      resultP.html(`${result} won!`);
    }
  }
}


function bestMove() {
  // AI to make its turn
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      //Checks for available spot
      if (board[i][j] == '') 
			{
				//Temporarily assigns a spot to check
        board[i][j] = ai;
        let score = minimax(board, 0, false);
        board[i][j] = '';
        if (score > bestScore) 
				{
          bestScore = score;
          move = { i, j };
        }
      }
    }
  }
  board[move.i][move.j] = ai;
  currentPlayer = human;
}

let scores = {
  X: 10,
  O: -10,
  tie: 0
};

//Initialize board with null values
let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let w; // = width / 3;
let h; // = height / 3;

let ai = 'X';
let human = 'O';
let currentPlayer = human;


//Function to check if winning pattern is occupied by same symbol
function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

//Check Winner with all possible winning cases
function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // Vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // Diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

	//Calculate openSpots for checking Tie 
  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

	//Condition for Tie
  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

//Capture Mouse input by User
function mousePressed() {
  if (currentPlayer == human) {
    // Human make turn
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    // If valid turn
		if(i<3 && j<3){
			if (board[i][j] == '') {
      	board[i][j] = human;
      	currentPlayer = ai;
				//Call to bestMove for AI to play again
      	bestMove();
			}
    }
  }
}

