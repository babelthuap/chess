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
let activeUsers = {};


// handle a client connection
function clientConnection(socket) {
  let userId;

  socket.on('login', (username) => {
    do {
      userId = username + Date.now().toString().slice(-7);
    } while (activeUsers[userId]);
    console.log(userId + ' connected');
    activeUsers[userId] = 'waiting';
    console.log('activeUsers:', activeUsers);
  });

  socket.on('logout', () => {
    delete activeUsers[userId];
    console.log('activeUsers:', activeUsers);
  });

  socket.on('disconnect', () => {
    delete activeUsers[userId];
    console.log(userId + ' disconnected');
    console.log('activeUsers:', activeUsers);
  });
}





// start socket io
var server = require('http').Server(app);
var io = require('socket.io')(server);
io.on('connection', clientConnection);

server.listen(process.env.PORT || 3000);

// catch error
app.use(function(req, res, next) {
  let err = new Error('Not Found');
  res.status(404).render('error', {
    message: err.message,
    error: err
  });
});
