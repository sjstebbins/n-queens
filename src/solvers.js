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
  var solution = undefined; //fixme



  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};





// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

var makeEmptyMatrix1 = function(n) {
  return _(_.range(n)).map(function() {
    return _(_.range(n)).map(function() {
      return 0;
    });
  });
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  // create empty matrix based on dimensions
  if ( n === 2 ) return [[0,0],[0,0]];
  if ( n === 3 ) return [[0,0,0],[0,0,0],[0,0,0]];

  var matrixObj = new Board(makeEmptyMatrix1(n));
  //var matrix = matrixObj.rows();


  var recursion = function(matrixObj, row){



    if (row === n ){
      return matrixObj.rows();
    }

    //iterate over first row
    for (var column = 0;column < n; column++){

      // Toggle piece
      //console.log('matrixObj BEFORE TOGGLE ON', matrixObj)

      matrixObj.togglePiece(row, column)
      //console.log('matrixObj AFTER TOGGLE ON', matrixObj)



      if (matrixObj.hasAnyRowConflicts() || matrixObj.hasAnyColConflicts() || matrixObj.hasAnyMajorDiagonalConflicts() || matrixObj.hasAnyMinorDiagonalConflicts()){

        // If in conflict toggle back to no queen

        matrixObj.togglePiece(row, column)


      } else {

        // else store new board


        var route = recursion( matrixObj, row + 1)

        if ( route !== undefined) {

          return route;

        } else {

          matrixObj.togglePiece(row, column);
        }
      }
    }
  };
  //check on second row for which points are available

  // use recursion on these points

  //when we get n # of queens on board
  //return matrix solution
  var result = recursion(matrixObj, 0);


  solution = result;




  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;

};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions1 = function(n) {
  var solutionCount = 0;
  if ( n === 0 ) return 1;
  if ( n === 1 ) return 1;
  if ( n === 2 ) return 0;
  if ( n === 3 ) return 0;
  //fixme
  // create empty matrix based on dimensions

  var board1 = new Board(makeEmptyMatrix1(n));



  // begin a new row (first time this will be row 0)
  var findSols = function (board, row){

    //start on the first column of row and iterate through
    for (var column = 0; column < n; column++){

      //Put a queen on the square
      board.togglePiece(row, column);

      // Check if the queen has any conflicts
      if (board.hasAnyRowConflicts() || board.hasAnyColConflicts() || board.hasAnyMajorDiagonalConflicts() || board.hasAnyMinorDiagonalConflicts()){

        // If she does, remove her and check next column ^138
        board.togglePiece(row, column);


      // If not:
      }else{

        // If shes on the last row incement solution count ^138
        if (row === n - 1){

          solutionCount++;

        // If she's not on the last row peform findSols on next row
        }else{

          findSols(board, row + 1)

        }

        //Then remove queen and move on to next iteration
        board.togglePiece(row, column);

      }

    }

  }

  findSols(board1, 0);

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
}
//Now we will attempt two other impletmentations. The first is based designed for brevity and lower time complexity (mainly through math based conflict detection)
//The second is purely for improved time complexity


// In this solution there are several time complexity improvements
// Instead of using an array of arrays, an array of numbers is employed to store the board, with the number being the column index and the position in array being the row index
// The various helper functions that iterate multiple times through the board are refactored and done mathematically, so that only one linear loop through the array is required for each conflict check
// Only the rows and of the array that have already been written on to are examined for conflicts and anything above max column i

window.countNQueensSolutions = function(n) {
  // create counter
  var count = 0;
  //recursion function
  var recur = function (rows){
    //if the # of rows is equal to number of queens
    if (rows.length === n){
      //add to counter
      count++;

    }else{
      //iterate n times, adding a new chess board square
      for ( var i = 0; i < n; i++){

        var len = rows.length;
        //if index is less than number of rows, iterate
        for (var rowInd = 0; rowInd < len; rowInd++){

          var colInd = rows[rowInd];
          //if column conflict, break to V 216
          if ( colInd === i ) break;
          //if Major diagonal conflict, break to V 216
          if ( colInd - (len - rowInd) === i ) break;
          //if Minor diagonal conflict, break to V 216
          if ( colInd + (len - rowInd) === i ) break;
        }
        // if last row
        if ( rowInd === len){
          //recur and add i to rows
          recur(rows.concat([i]))

        }

      }

    }

  }
  //recur
  recur([]);
  //return count
  return count;

}

/*

//A different implemation with less time complexity
window.countNQueensSolutionsFast = function(n) {

  /*

  This implementation will store the queens as objects in an array.
  Each queen will have a column and row property.
  To check for conflicts the method will use these properties.
  Diagonal conflicts will be tested using a mathmatical equation.
  Should cut out a lot of time complexity and hopefully make it faster.

  The first helper function will check for column and diagonal conflicts

  The second helper function will store all the available spaces on the next line, using the first function.
  These available places will be stored in an array of arrays

  The main body will then

  */

  //STEPS IN PSUEDO

  //1. Create a function that checks for conflict with other Qs (only on diagonal and columns)

  //2. Initiate row and col to 0;

  //2. Start a while loop that hold true as long as the row is less than "n"

    //A. check if point is available

      //B. If available, add queen with current row and col properties then...

        //If on last row:

          //increment solution count

          //if not on last column, try next column

          //If on last column, tell the item before to try

        //increment row variable and go to next iter

      //C. If not available, increment col variable and go to next iter


//}



