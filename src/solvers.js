/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other




window.findNRooksSolution = function(n) {
  var myBoard = new Board({n: n});
  var solution = myBoard.rows();

  for (var i = 0; i < solution.length; i++) {
    for (var j = 0; j < solution[i].length; j++) {
      if (solution[i][j] === 0) {
        myBoard.togglePiece(i, j);
      }
      if (myBoard.hasAnyRooksConflicts()) {
        myBoard.togglePiece(i, j);
      }
    }  
  } 

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var myBoard = new Board({n: n});
  var solutionCount = 0; //fixme

  var findSolution = function(startRow) {
    if (startRow === n) {
      return solutionCount++;
    }

    for (var i = 0; i < n; i++) {
      myBoard.togglePiece(startRow, i);

      if (!myBoard.hasAnyRooksConflicts()) {
        findSolution(startRow + 1);
      } 
      myBoard.togglePiece(startRow, i);
    }
  };

  findSolution(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var myBoard = new Board({n: n});
  var solution = myBoard.rows();
 

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
