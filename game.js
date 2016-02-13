function game(app) {
  'use strict';

  const http = require('http')
      , server = http.Server(app)
      , io = require('socket.io')(server);


  console.log('in game function, waiting for connections');


  io.on('connection', (socket) => {
    console.log('connected');

    socket.on('message', (data) => {
      console.log('GOT A MESSAGE:', data);
    });

  });
}

module.exports = game;
