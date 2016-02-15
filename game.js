'use strict';

const backRowPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

let game = {
  emptyBoard: function() {
    let board = Array(8).fill(undefined);
    return board.map(row => Array(8).fill(''));
  },

  gameStart: function() {
    let board = this.emptyBoard();
    board[0] = backRowPieces.map(piece => 'b' + piece);
    board[1] = Array(8).fill('bp');
    board[6] = Array(8).fill('wp');
    board[7] = backRowPieces.map(piece => 'w' + piece);
    return board;
  },
}

module.exports = game;
