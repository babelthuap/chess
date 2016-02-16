'use strict';

const express      = require('express')
    , path         = require('path')
    , favicon      = require('serve-favicon')
    , logger       = require('morgan')
    , cookieParser = require('cookie-parser')
    , compression  = require('compression')
    , bodyParser   = require('body-parser')
    , game         = require('./game');

let app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// favicon & middleware
app.use(compression());
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// routes
app.use('/', require('./routes/index'));




// start socket io
let server = require('http').Server(app);
let io = require('socket.io')(server);
io.on('connection', clientConnection);


// game logic
let onlineUsers = {};
let waitingUser = null;


function broadcastUsers() {
  let usernames = Object.keys(onlineUsers).map(user => {
    return user.split(' ')[0];
  });
  io.emit('onlineUsers', usernames);
}


function lookForGame(userId) {
  if (waitingUser) {
    // start game!
    // tell each player who their opponent is
    onlineUsers[userId].emit('newOpponent', waitingUser);
    onlineUsers[waitingUser].emit('newOpponent', userId);

    // choose who is black/white
    let coinToss = Math.floor(Math.random() * 2);
    if (coinToss === 1) {

    }

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

  socket.on('makeMove', (newBoard) => {
    onlineUsers[opponent].emit(newBoard);
  });

  socket.on('logout', () => {
    delete onlineUsers[userId];
    if (waitingUser === userId) waitingUser = null;
    broadcastUsers();
  });

  socket.on('disconnect', () => {
    delete onlineUsers[userId];
    if (waitingUser === userId) waitingUser = null;
    broadcastUsers();
  });
}




server.listen(process.env.PORT || 3000);

// catch error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  res.status(404).render('error', {
    message: err.message,
    error: err
  });
});
