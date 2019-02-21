'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfRows = numberOfRows;
    this._numberOfColumns = numberOfColumns;
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (this.playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!.');
        return;
      } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
        this.playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
        this._numberOfTiles--;
      }
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var _this = this;

      var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];

      var numberOfRows = this.bombBoard.length;
      var numberOfColumns = this.bombBoard[0].length;
      var numberOfBombs = 0;
      neighborOffsets.forEach(function (offset) {
        var neighborRowIndex = offset[0] + rowIndex;
        var neighborColumnIndex = offset[1] + columnIndex;
        if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
          if (_this.bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
            numberOfBombs++;
          }
        }
      });
      return numberOfBombs;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfTiles !== this.numberOfBombs;
    }
  }, {
    key: 'print',
    value: function print() {
      console.log(this.playerBoard.map(function (row) {
        return row.join(' | ');
      }).join('\n'));
    }
  }, {
    key: 'numberOfRows',
    get: function get() {
      return this._numberOfRows;
    }
  }, {
    key: 'numberOfColumns',
    get: function get() {
      return this._numberOfColumns;
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'bombBoard',
    get: function get() {
      return this._bombBoard;
    }
  }], [{
    key: 'generateBoard',
    value: function generateBoard(numberOfRows, numberOfColumns, initializerValue) {
      var board = [];
      for (var i = 0; i < numberOfRows; i++) {
        var rowArray = [];
        for (var j = 0; j < numberOfColumns; j++) {
          rowArray.push(initializerValue);
        }
        board.push(rowArray);
      }
      return board;
    }
  }, {
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      return Board.generateBoard(numberOfRows, numberOfColumns, ' ');
    }
  }, {
    key: 'generateBombBoard',
    value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var numOfTiles = numberOfRows * numberOfColumns;
      if (numOfTiles < numberOfBombs) {
        console.log('Error: attempting to add more number of bombs than tiles.');
        return;
      }
      var board = Board.generateBoard(numberOfRows, numberOfColumns, null);
      // If we have a big enough board, then place as many numberOfBombs
      if (numberOfRows > 0 && numberOfColumns > 0) {
        var numberOfBombsPlaced = 0;
        while (numberOfBombsPlaced < numberOfBombs) {
          var randomRowIndex = Math.floor(Math.random() * numberOfRows);
          // Do not place bombs on top of already existing bombs
          var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
          if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            board[randomRowIndex][randomColumnIndex] = 'B';
            numberOfBombsPlaced++;
          }
        }
      }
      return board;
    }
  }]);

  return Board;
}();