class Game {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  
  playMove(rowIndex, columnIndex) {    
    this._board.flipTile(rowIndex, columnIndex);
    if(this._board.playerBoard[rowIndex][columnIndex] === 'B') {
      console.log('GAME OVER! You have flipped a Bomb tile.');
      this._board.print();
    }
    else if(!this._board.hasSafeTiles()) {
      console.log('CONGRATULATIONS! You have flipped all safe tiles and have won the game!');
      this._board.print();
    }
    else {
      console.log('Current Board:');
      this._board.print();
    }
  }
}

class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs) {
    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  
  get numberOfRows() {
    return this._numberOfRows;
  }
  
  get numberOfColumns() {
    return this._numberOfColumns;
  }
  
  get playerBoard() {
    return this._playerBoard;
  }
  
  get bombBoard() {
    return this._bombBoard;
  }
  
  flipTile(rowIndex, columnIndex) {
    if((this.playerBoard[rowIndex][columnIndex] !== ' ')) {
      console.log('This tile has already been flipped!.');
      return;
    }
    else if(this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';  
    }
    else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._numberOfTiles--;
    }
  }
  
  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
    
    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfBombs = 0;  
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = offset[0] + rowIndex;
      const neighborColumnIndex = offset[1] + columnIndex;
      if(neighborRowIndex >=0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if(this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
          numberOfBombs++;
        }
      }
    });
    return numberOfBombs;
  }
  
  hasSafeTiles() {
    return this._numberOfTiles !== this.numberOfBombs;
  }
  
  print() { 
    console.log(this.playerBoard.map( row => row.join(' | ')).join('\n'));
  } 
  
  static generateBoard(numberOfRows, numberOfColumns, initializerValue) {
    const board = [];
    for(let i = 0; i < numberOfRows; i++) {
      const rowArray = [];
      for(let j = 0; j < numberOfColumns; j++) {
        rowArray.push(initializerValue);
      }
      board.push(rowArray);
    }
    return board;
  }  
  
  static generatePlayerBoard(numberOfRows, numberOfColumns) {
    return Board.generateBoard(numberOfRows, numberOfColumns, ' ');
  }   
  
  static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    const board = Board.generateBoard(numberOfRows, numberOfColumns, null);
    // If we have a big enough board, then place as many numberOfBombs
    if(numberOfRows > 0 && numberOfColumns > 0){
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        // Do not place bombs on top of already existing bombs
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if(board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }    
      }
    }
    return board;
  }  
}