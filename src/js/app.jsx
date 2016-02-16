import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Board from './components/Board.jsx';
import Login from './components/Login.jsx';
import '../css/style.css';

let socket = io.connect('/');

// utility functions
const backRowPieces = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
function emptyBoard() {
  let board = Array(8).fill(undefined);
  return board.map(row => Array(8).fill(''));
}
function gameStart() {
  let board = emptyBoard();
  board[0] = backRowPieces.map(piece => 'b' + piece);
  board[1] = Array(8).fill('bp');
  board[6] = Array(8).fill('wp');
  board[7] = backRowPieces.map(piece => 'w' + piece);
  return board;
}
function rotate(board) {
  return board.map(row => row.reverse()).reverse();
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      username: '',
      opponent: null,
      myColor: '',
      myTurn: false,
      board: emptyBoard(),
      onlineUsers: [],
    };
  }

  componentDidMount() {
    socket.on('onlineUsers', (data) => this.setState({ onlineUsers: data }));
    socket.on('updateOpponent', this._updateOpponent.bind(this));
    socket.on('colorAssignment', this._assignColor.bind(this));
    socket.on('boardUpdate', this._updateBoard.bind(this));
  }

  _updateOpponent(data) {
    this.setState({ opponent: data });
    if (data) {
      socket.emit('hazOpponent', data);
    } else {
      socket.emit('noHazOpponent');
      this.setState({ myColor: '' });
    }
  }

  _assignColor(data) {
    this.setState({
      myColor: data,
      board: gameStart(),
    });
    if (data === 'w') {
      this.setState({ myTurn: true });
    }
  }

  _updateBoard(data) {
    this.setState({ board: data, myTurn: true });
  }

  _logout() {
    this.setState({ username: '' });
    socket.emit('logout');
  }

  _chooseName(username) {
    this.setState({ username: username });
    socket.emit('login', username);
  }

  _makeMove(newBoard) {
    if (this.state.myTurn) {
      if (this.state.myColor === 'b') {
        newBoard = rotate(newBoard);
      }
      this.setState({ board: newBoard, myTurn: false });
      socket.emit('makeMove', newBoard);
    }
  }

  render() {
    let navbar   = []
      , main     = <Login chooseName={this._chooseName.bind(this)} />
      , username = this.state.username;

    if (username) {
      navbar = <Navbar myColor={this.state.myColor}
                       username={this.state.username}
                       opponent={this.state.opponent}
                       onlineUsers={this.state.onlineUsers}
                       logout={this._logout.bind(this)} />;
      let board = this.state.myColor === 'b' ? rotate(this.state.board) : this.state.board;
      main   = <Board myColor={this.state.myColor}
                      myTurn={this.state.myTurn}
                      board={board}
                      opponent={this.state.opponent}
                      makeMove={this._makeMove.bind(this)}
                      updateBoard={this._updateBoard.bind(this)} />;
    }

    return (
      <div>
        {navbar}
        <h1 id="title">Play Chess Like Paul</h1>
        <hr/>
        {main}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('React'));
