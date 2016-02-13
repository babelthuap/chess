// rotate board 180 degrees
function rotate(board) {
  return board.map(row => row.reverse()).reverse();
}

function amIInCheck(board, myColor) {
  board = rotate(board);
  let theirColor = (myColor === 'w') ? 'b' : 'w';

  let threatened = new Set();

  let threaten = (y, x) => {
    if (board[y][x] && board[y][x][0] === myColor) {
      threatened.add(board[y][x]);
    }
  }

  let threatenVertical = (y, x) => {
    for (let i = 1; y + i < 8; i++) {
      if (board[y + i][x]) {
        threaten(y + i, x);
        break;
      }
    }
    for (let i = 1; y - i >= 0; i++) {
      if (board[y - i][x]) {
        threaten(y - i, x);
        break;
      }
    }
  };

  let threatenHorizontal = (y, x) => {
    for (let i = 1; x + i < 8; i++) {
      if (board[y][x + i]) {
        threaten(y, x + i);
        break;
      }
    }
    for (let i = 1; x - i >= 0; i++) {
      if (board[y][x - i]) {
        threaten(y, x - i);
        break;
      }
    }
  };

  let threatenDiagonal = (y, x) => {
    for (let i = 1; (y + i < 8) && (x + i < 8); i++) {
      if (board[y + i][x + i]) {
        threaten(y + i, x + i);
        break;
      }
    }
    for (let i = 1; (y + i < 8) && (x - i >= 0); i++) {
      if (board[y + i][x - i]) {
        threaten(y + i, x - i);
        break;
      }
    }
    for (let i = 1; (y - i >= 0) && (x - i >= 0); i++) {
      if (board[y - i][x - i]) {
        threaten(y - i, x - i);
        break;
      }
    }
    for (let i = 1; (y - i >= 0) && (x + i < 8); i++) {
      if (board[y - i][x + i]) {
        threaten(y - i, x + i);
        break;
      }
    }
  };

  let threatenDeltas = (y, x, deltas) => {
    deltas.forEach(delta => {
      let yd = y + delta[0]
        , xd = x + delta[1];
      if (yd < 0 || yd > 7 || xd < 0 || xd > 7) return;
      threaten(yd, xd);
    });
  }

  let addThreatsFor = {
    p(y, x) { // pawn
      if (y === 0) return;
      threaten(y - 1, x - 1);
      threaten(y - 1, x + 1);
    },
    r(y, x) { // rook
      threatenVertical(y, x);
      threatenHorizontal(y, x);
    },
    n(y, x) { // knight
      threatenDeltas(y, x, [[2, 1], [2, -1], [1, -2], [-1, -2], [-2, -1], [-2, 1], [-1, 2], [1, 2]]);
    },
    b(y, x) { // bishop
      threatenDiagonal(y, x);
    },
    q(y, x) { // queen
      threatenVertical(y, x);
      threatenHorizontal(y, x);
      threatenDiagonal(y, x);
    },
    k(y, x) { // king
      threatenDeltas(y, x, [[0, 1], [1, 1], [1, 0], [-1, 1], [-1, 0], [-1, -1], [0, -1], [1, -1]])
    },
  }

  for (let y = 0; y < 8; y++) {
    for (let x = 0; x < 8; x++) {
      if (board[y][x][0] === theirColor) {
        addThreatsFor[board[y][x][1]](y, x);
      }
    }
  }

  return threatened.has(myColor + 'k');
}

export default amIInCheck;
