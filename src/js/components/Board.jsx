import React from 'react';
import Square from './Square.jsx';
import validMoves from '../validMoves.js';

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

// rotate board 180 degrees
function rotate(board) {
  return board.map(row => row.reverse()).reverse();
}


class Board extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Board';
    this.state = {
      board: gameStart(),
      validMoves: validMoves(gameStart(), this.props.myColor),
      selected: [],
    }
  }

  _clickSquare(y, x) {
    let piece = this.state.board[y][x];

    if (piece && piece[0] === this.props.myColor) {
      // if the user clicks one of their own pieces, select it
      this.setState({ selected: [y, x] });

    } else if (this.state.selected.length) {
      // move to empty square if legal
      let selected = this.state.selected;

      let move = `${selected[0]},${selected[1]}->${y},${x}`;
      if (!this.state.validMoves.has(move)) return;

      let selectedPiece = this.state.board[selected[0]][selected[1]];
      let newBoard = this.state.board;
      newBoard[selected[0]][selected[1]] = '';
      newBoard[y][x] = selectedPiece;

      this.setState({
        board: newBoard,
        validMoves: validMoves(newBoard, this.props.myColor),
        selected: [],
      });
    }
  }

  render() {
    let selected = this.state.selected;

    let board = this.state.board.map((row, y) => {
      return row.map((piece, x) => {

        let move = `${selected[0]},${selected[1]}->${y},${x}`;
        let highlight = (y === selected[0] && x === selected[1]) ||
                        this.state.validMoves.has(move);

        return <Square key={y + '' + x}
                       bgColor={(y + x) % 2 === 0 ? "white" : "tan"}
                       selected={highlight}
                       click={this._clickSquare.bind(this, y, x)}
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
