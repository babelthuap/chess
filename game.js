'use strict';

let games = {};

function game(socket) {
  
  socket.emit('news', { hello: 'world' });
  socket.on('my other event', function(data) {
    console.log(data);
  });
  
}

module.exports = game;
