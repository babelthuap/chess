function game(server) {
  'use strict';

  let io = require('socket.io')(server);
  io.on('connection', clientConnection);


  let onlineUsers = {};
  let waitingUser = null;


  function broadcastUsers() {
    let usernames = Object.keys(onlineUsers).map(user => {
      return user.split(' ')[0];
    });
    io.emit('onlineUsers', usernames);
  }


  // match players and start a game
  function lookForGame(userId) {
    if (waitingUser) {
      // tell each player who their opponent is
      onlineUsers[userId].emit('updateOpponent', waitingUser);
      onlineUsers[waitingUser].emit('updateOpponent', userId);

      // choose who is black/white
      onlineUsers[waitingUser].emit('colorAssignment', 'w');
      onlineUsers[userId].emit('colorAssignment', 'b');


      waitingUser = null;
    } else {
      waitingUser = userId;
    }
    console.log('waitingUser:', waitingUser);
  }


  // handle a client connection
  function clientConnection(socket) {
    let userId
      , opponent;

    socket.on('login', (username) => {
      do {
        userId = username + ' ' + Math.floor(Math.random() * 1000000);
      } while (onlineUsers.hasOwnProperty(userId));
      onlineUsers[userId] = socket;
      broadcastUsers();
      // socket.emit('boardUpdate', game.gameStart());
      lookForGame(userId);
    });

    socket.on('hazOpponent', (data) => {
      opponent = data;
    });

    socket.on('noHazOpponent', (data) => {
      opponent = undefined;
      lookForGame(userId);
    });

    socket.on('makeMove', (newBoard) => {
      onlineUsers[opponent].emit(newBoard);
    });

    socket.on('logout', () => {
      delete onlineUsers[userId];
      if (waitingUser === userId) waitingUser = null;
      if (opponent) onlineUsers[opponent].emit('updateOpponent', null);
      broadcastUsers();
    });

    socket.on('disconnect', () => {
      delete onlineUsers[userId];
      if (waitingUser === userId) waitingUser = null;
      if (opponent) onlineUsers[opponent].emit('updateOpponent', null);
      broadcastUsers();
    });
  }


  // utility functions
  const backRowPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
  function emptyBoard() {
    let board = Array(8).fill(undefined);
    return board.map(row => Array(8).fill(''));
  }
  function gameStart() {
    let board = this.emptyBoard();
    board[0] = backRowPieces.map(piece => 'b' + piece);
    board[1] = Array(8).fill('bp');
    board[6] = Array(8).fill('wp');
    board[7] = backRowPieces.map(piece => 'w' + piece);
    return board;
  }
};

module.exports = game;
