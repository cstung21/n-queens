// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var board = this.rows();
      var row = board[rowIndex];
      var count = 0;

      //for each column in rowIndex
      for (var i = 0; i < row.length; i++) {
        //if column === 1
        if (row[i] === 1) {
          //count++;
          count++;
        }  
      }      
      //return count >= 2;
      return count >= 2;
      
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      let board = this.rows();
 
      for (var i = 0; i < board.length; i++) {
        if (this.hasRowConflictAt(i)) {
          return true;
        }
      }
      return false;
      // return false;
      // let board = this.rows();
      // //for each row in board
      // for (var i = 0; i < board.length; i++) {
      //   //let count=0
      //   let count = 0;
      //   //for each column in row
      //   for (var j = 0; j < board[i].length; j++) {
      //     //check if current column === 1
      //     if (board[i][j] === 1) {
      //       //if so, count++
      //       count++;
      //     }
      //   }
      //   //if count >= 2
      //   if (count >= 2) {
      //     //return true;
      //     return true;
      //   }

      // }
      // // return false 
      // return false; 
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      let col = [];
      let board = this.rows();
      //initialize array to store count of occurrences per column
      for (var i = 0; i < board.length; i++) {
        col[i] = 0;
      }
 
      //for each row
      for (var i = 0; i < board.length; i++) {
        //for each column in row
        for (var j = 0; j < board[i].length; j++) {
          //if column === 1
          if (board[i][j] === 1) {
            //if so, update col[i] by 1
            col[j]++;
          }
          //if col[j] >=2;
          if (col[j] >= 2) {
            //return true; 
            return true;
          }
        }
        
      }
      //return false

      return false;
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      let board = this.rows();
      let points = [];
      
      //grab points and store their locations in points array
      //for each row
      for (var i = 0; i < board.length; i++) {
        //for each column in row
        for (var j = 0; j < board[i].length; j++) {
          //if board[i][j] === 1
          if (board[i][j] === 1) {
            //push [i, j] into points array
            points.push([i, j]);
          }
        }
      }

      //for each point coordinate in points array, not including the last point in the array
      for (var k = 0; k < points.length; k++) {
        //for each subsequent coordinate
        for (var l = k + 1; l < points.length; l++) {
          //if the 2 points' difference in i value === difference in j value
          if (points[l][0] - points[k][0] === points[l][1] - points[k][1]) {
            //return true;
            return true;
          }
        }
      }

      return false; 
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      // create board var
      var board = this.rows();
      //create points array to store coordinates
      var points = [];
      //loop through rows
      for (var i = 0; i < board.length; i++) {
        //loop through columns
        for (var j = 0; j < board[i].length; j++) {
        //check if column value is 1
          if (board[i][j] === 1) {
        //add coordinates to points array
            points.push([i, j]);
          }
        }
      }
      // loop through points array
      for (var k = 0; k < points.length; k++) {
      //   compare values of each coordinate
        for (var l = k + 1; l < points.length; l++) {
      //   if absolute value of difference between indices are equal, return true
          if (points[k][0] - points[l][0] === (points[k][1] - points[l][1]) * -1) {
            return true;
          }
        }
      }
      // return false
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
