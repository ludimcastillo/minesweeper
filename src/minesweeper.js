const generateBoard = (numberOfRows, numberOfColumns, initializerValue) => {
  const board = [];
  for(let i = 0; i < numberOfRows; i++) {
    const rowArray = [];
    for(let j = 0; j < numberOfColumns; j++) {
      rowArray.push(initializerValue);
    }
    board.push(rowArray);
  }
  return board;
};

const generatePlayerBoard = (numberOfRows, numberOfColumns) => generateBoard(numberOfRows, numberOfColumns, ' ');

// Transpile generatePlayerBoard
/*
console.log(generatePlayerBoard(0, 0));
console.log(generatePlayerBoard(1, 0));
console.log(generatePlayerBoard(1, 1));
console.log(generatePlayerBoard(2, 3));
*/

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
  const board = generateBoard(numberOfRows, numberOfColumns, null);
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

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
  const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
  
  const numberOfRows = bombBoard.length;
  const numberOfColumns = bombBoard[0].length;
  let numberOfBombs = 0;  
  neighborOffsets.forEach(offset => {
    const neighborRowIndex = offset[0] + rowIndex;
    const neighborColumnIndex = offset[1] + columnIndex;
    if(neighborRowIndex >=0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex <= numberOfColumns) {
      if(bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
        numberOfBombs++;
      }
    }
  });
  return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
  if((playerBoard[rowIndex][columnIndex] != ' ')) {
    console.log('This tile has already been flipped!.');
    return;
  }
  else if((bombBoard[rowIndex][columnIndex] === 'B')) {
    playerBoard[rowIndex][columnIndex] = 'B';  
  }
  playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
}

// Transpile generateBombBoard
/*
console.log(generateBombBoard(0, 0, 1));
console.log(generateBombBoard(1, 0, 1));
console.log(generateBombBoard(1, 1, 1));
console.log(generateBombBoard(2, 3, 1));
console.log(generateBombBoard(2, 3, 2));
console.log(generateBombBoard(3, 3, 2));
console.log(generateBombBoard(6, 6, 4));
console.log(generateBombBoard(6, 6, 0));
*/

const printBoard = board => console.log(board.map( row => row.join(' | ')).join('\n'));

const playerBoard = generatePlayerBoard(3, 4);
const bombBoard = generateBombBoard(3, 4, 5);
console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
console.log('Player Board: ');
printBoard(playerBoard);