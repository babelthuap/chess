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



// game logic
let games = {};
let halfFullGame = '';

function waitForOpponent(cb) {

}

function player(socket) {
  let userId;

  socket.on('login', (username) => {
    userId = username + Date.now()
    console.log(userId);


    if (halfFullGame) {
      let players = `${halfFullGame} ${userId}`;
      halfFullGame = '';
      games[players] = game.gameStart();

      console.log(games[players])

      socket.emit('boardUpdate', games[players]);
    } else {
      halfFullGame = userId;
    }
  });


  socket.on('logout', () => {

  });

}





// start socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', player);

server.listen(process.env.PORT || 3000);

// catch error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  res.status(404).render('error', {
    message: err.message,
    error: err
  });
});
