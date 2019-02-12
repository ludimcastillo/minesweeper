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
  // place as many numberOfBombs
  if(numberOfRows > 0 && numberOfColumns > 0){
    let numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced < numberOfBombs) {
      let randomRowIndex = Math.floor(Math.random() * numberOfRows);
      // Do not place bombs on top of already existing bombs
      let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
      if(board[randomRowIndex][randomColumnIndex] === null) {
        board[randomRowIndex][randomColumnIndex] = 'B';
        numberOfBombsPlaced++;
      }    
    }
  }
  return board;
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