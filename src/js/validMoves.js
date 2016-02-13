import amIInCheck from './amIInCheck.js';

// generate the set of all valid moves for a given board state
function validMoves(board, myColor) {
  let validMoves = new Set();

  let addToValid = (y1, x1, y2, x2) => {
    // don't allow moving onto one of player's own pieces
    if (board[y2][x2] && board[y2][x2][0] === myColor) return;

    // provisionally make move, then see if player is in check
    let newBoard = Array(8).fill(undefined).map((_, i) => board[i].slice(0));
    newBoard[y2][x2] = board[y1][x1];
    newBoard[y1][x1] = '';
    if (amIInCheck(newBoard, myColor)) return;

    validMoves.add(`${y1},${x1}->${y2},${x2}`);
  };

  let addVertical = (y, x) => {
    for (let i = 1; y + i < 8; i++) {
      addToValid(y, x, y + i, x);
      if (board[y + i][x]) break;
    }
    for (let i = 1; y - i >= 0; i++) {
      addToValid(y, x, y - i, x);
      if (board[y - i][x]) break;
    }
  };

  let addHorizontal = (y, x) => {
    for (let i = 1; x + i < 8; i++) {
      addToValid(y, x, y, x + i);
      if (board[y][x + i]) break;
    }
    for (let i = 1; x - i >= 0; i++) {
      addToValid(y, x, y, x - i);
      if (board[y][x - i]) break;
    }
  };

  let addDiagonal = (y, x) => {
    for (let i = 1; (y + i < 8) && (x + i < 8); i++) {
      addToValid(y, x, y + i, x + i);
      if (board[y + i][x + i]) break;
    }
    for (let i = 1; (y + i < 8) && (x - i >= 0); i++) {
      addToValid(y, x, y + i, x - i);
      if (board[y + i][x - i]) break;
    }
    for (let i = 1; (y - i >= 0) && (x - i >= 0); i++) {
      addToValid(y, x, y - i, x - i);
      if (board[y - i][x - i]) break;
    }
    for (let i = 1; (y - i >= 0) && (x + i < 8); i++) {
      addToValid(y, x, y - i, x + i);
      if (board[y - i][x + i]) break;
    }
  };

  let addDeltas = (y, x, deltas) => {
    deltas.forEach(delta => {
      let yd = y + delta[0]
        , xd = x + delta[1];
      if (yd < 0 || yd > 7 || xd < 0 || xd > 7) return;
      addToValid(y, x, yd, xd);
    });
  }

  let addMovesFor = {
    p(y, x) { // pawn
      if (y === 0) return;
      // move forward
      if (!board[y - 1][x]) {
        addToValid(y, x, y - 1, x);
      }
      // first move
      if (y === 6 && !board[5][x] && !board[4][x]) {
        addToValid(y, x, y - 2, x);
      }
      // capture
      if (board[y - 1][x - 1] && board[y - 1][x - 1][0] !== myColor) {
        addToValid(y, x, y - 1, x - 1);
      }
      if (board[y - 1][x + 1] && board[y - 1][x + 1][0] !== myColor) {
        addToValid(y, x, y - 1, x + 1);
      }
      // TODO: en passant
    },
    r(y, x) { // rook
      addVertical(y, x);
      addHorizontal(y, x);
    },
    n(y, x) { // knight
      addDeltas(y, x, [[2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2]]);
    },
    b(y, x) { // bishop
      addDiagonal(y, x);
    },
    q(y, x) { // queen
      addVertical(y, x);
      addHorizontal(y, x);
      addDiagonal(y, x);
    },
    k(y, x) { // king
      addDeltas(y, x, [[0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]])
      // TODO: castling
    },
  };

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x][0] === myColor) {
        addMovesFor[board[y][x][1]](y, x);
      }
    }
  }

  return validMoves;
}

export default validMoves;
