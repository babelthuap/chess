import React from 'react';
import Square from './Square.jsx';

const backRowPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

// create 8x8 matrix filled with empty strings
function emptyBoard() {
  let board = Array(8).fill(undefined);
  return board.map(row => Array(8).fill(''));
}

// create a "new game" board
function gameStart() {
  let board = emptyBoard();
  board[0] = backRowPieces.map(piece => 'b' + piece);
  board[1] = Array(8).fill('bp');
  board[6] = Array(8).fill('wp');
  board[7] = backRowPieces.map(piece => 'w' + piece);
  return board;
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Board';
    this.state = {
      positions: gameStart()
    }
  }

  makeMove(move) {
    this.props.makeMove(move);
  }

  render() {
    let board = this.state.positions.map((row, i) => {
      return row.map((piece, j) => {
        return <Square key={i + '' + j}
                       color={(i + j) % 2 === 0 ? "white" : "tan"}
                       coordinates={i + '' + j}
                       click={this.makeMove.bind(this)}
                       piece={piece} />
      });
    });

    return (
      <div className="board">
        {board}
      </div>
    )
  }
}

export default Board;
