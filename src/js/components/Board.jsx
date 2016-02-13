import React from 'react';
import Square from './Square.jsx';

// create 8x8 matrix filled with empty strings
function initializeBoard() {
  let board = Array(8).fill(undefined);
  return board.map(row => Array(8).fill(''));
}

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Board';
    this.state = {
      positions: initializeBoard()
    }
  }

  render() {
    let board = this.state.positions.map((row, i) => {
      return row.map((piece, j) => {
        return <Square key={i + '' + j}
                       color={(i + j) % 2 === 0 ? "white" : "tan"}
                       coordinates={i + '' + j}
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
