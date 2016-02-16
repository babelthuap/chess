import React from 'react';
import Square from './Square.jsx';
import validMoves from '../validMoves.js';
import '../../css/loadingCube.css';

const backRowPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];

// create 8x8 matrix filled with empty strings
function emptyBoard() {
  let board = Array(8).fill(undefined);
  return board.map(row => Array(8).fill(''));
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
      board: emptyBoard(),
      validMoves: new Set(),
      selected: [],
      waiting: false, // set to true to enable loading spinner!!!
    }
  }

  _clickSquare(y, x) {
    let piece = this.props.board[y][x];

    if (piece && piece[0] === this.props.myColor) {
      // if the user clicks one of their own pieces, toggle select it
      if (this.state.selected[0] === y && this.state.selected[1] === x) {
        this.setState({ selected: [] });
        console.log([])
      } else {
        this.setState({ selected: [y, x] });
        console.log([y, x])
      }

    } else if (this.state.selected.length) {
      // move to empty square if legal
      let selected = this.state.selected;

      let move = `${selected[0]},${selected[1]}->${y},${x}`;
      if (!validMoves(this.props.board, this.props.myColor).has(move)) return;

      let selectedPiece = this.props.board[selected[0]][selected[1]];
      let newBoard = this.props.board;
      newBoard[selected[0]][selected[1]] = '';
      newBoard[y][x] = selectedPiece;

      this.props.makeMove(newBoard);
      this.setState({ selected: [] });
    }
  }

  render() {
    let myValidMoves = validMoves(this.props.board, this.props.myColor);

    let selected = this.state.selected;

    let board = this.props.board.map((row, y) => {
      return row.map((piece, x) => {

        let move = `${selected[0]},${selected[1]}->${y},${x}`;
        let highlight = (y === selected[0] && x === selected[1]) ||
                        myValidMoves.has(move);

        return <Square key={y + '' + x}
                       bgColor={(y + x) % 2 === 0 ? "white" : "tan"}
                       highlight={highlight}
                       click={this._clickSquare.bind(this, y, x)}
                       piece={piece} />
      });
    });

    let waitingMessage = [];
    if (this.state.waiting) {
      waitingMessage = (
        <h1 id="waitingMessage">
          Waiting<br/>for<br/>opponent...
          <div className="cssload-thecube">
            <div className="cssload-cube cssload-c1"></div>
            <div className="cssload-cube cssload-c2"></div>
            <div className="cssload-cube cssload-c4"></div>
            <div className="cssload-cube cssload-c3"></div>
          </div>
        </h1>
      )
    }

    return (
      <div className="board">
        {board}
        {waitingMessage}
      </div>
    )
  }
}

export default Board;
