//TODO: Add a timer which lets players know how long it took them to win (or lose).
//TODO: Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
//TODO: Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.

export class Board {
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
    if ((this.playerBoard[rowIndex][columnIndex] !== ' ')) {
      console.log('This tile has already been flipped!.');
      return;
    } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
      this.playerBoard[rowIndex][columnIndex] = 'B';
    } else {
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      this._numberOfTiles--;
    }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex) {
    const neighborOffsets = [
      [-1, -1],
      [-1, 0],
      [-1, 1],
      [0, 1],
      [1, 1],
      [1, 0],
      [1, -1],
      [0, -1]
    ];

    const numberOfRows = this.bombBoard.length;
    const numberOfColumns = this.bombBoard[0].length;
    let numberOfBombs = 0;
    neighborOffsets.forEach(offset => {
      const neighborRowIndex = offset[0] + rowIndex;
      const neighborColumnIndex = offset[1] + columnIndex;
      if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
        if (this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
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
    console.log(this.playerBoard.map(row => row.join(' | ')).join('\n'));
  }

  static generateBoard(numberOfRows, numberOfColumns, initializerValue) {
    const board = [];
    for (let i = 0; i < numberOfRows; i++) {
      const rowArray = [];
      for (let j = 0; j < numberOfColumns; j++) {
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
    const numOfTiles = numberOfRows * numberOfColumns;
    if (numOfTiles < numberOfBombs) {
      console.log('Error: attempting to add more number of bombs than tiles.');
      return;
    }
    const board = Board.generateBoard(numberOfRows, numberOfColumns, null);
    // If we have a big enough board, then place as many numberOfBombs
    if (numberOfRows > 0 && numberOfColumns > 0) {
      let numberOfBombsPlaced = 0;
      while (numberOfBombsPlaced < numberOfBombs) {
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        // Do not place bombs on top of already existing bombs
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
          board[randomRowIndex][randomColumnIndex] = 'B';
          numberOfBombsPlaced++;
        }
      }
    }
    return board;
  }
}