//Minimax Function to calculate score based on current position
function minimax(board, depth, isMaximizing) {
    let result = checkWinner();
    if (result !== null) {
      return scores[result];
    }
    
      //Check for AI turn and try to maximize score
    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          //Checks for available spot
          if (board[i][j] == '') {
            board[i][j] = ai;
            
                      let score = minimax(board, depth + 1, false);
            board[i][j] = '';
                      //Maximize the score
            bestScore = max(score, bestScore);
          }
        }
      }
      return bestScore;
    } 
      
      //Check for human turn and try to minimize score
      else {
      let bestScore = Infinity;
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
          //Checks for available spot
          if (board[i][j] == '') {
            board[i][j] = human;
            let score = minimax(board, depth + 1, true);
            board[i][j] = '';
                      //Minimize the Score
            bestScore = min(score, bestScore);
          }
        }
      }
      return bestScore;
    }
  }
  