import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Board from './components/Board.jsx';
import Login from './components/Login.jsx';
import '../css/style.css';

let socket = io.connect('/');

function emptyBoard() {
  let board = Array(8).fill(undefined);
  return board.map(row => Array(8).fill(''));
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      username: '',
      opponent: null,
      myColor: 'w',
      board: emptyBoard(),
      onlineUsers: [],
    };
  }

  componentDidMount() {
    socket.on('onlineUsers', (data) => this.setState({ onlineUsers: data }));
    socket.on('updateOpponent', this._updateOpponent.bind(this));
    socket.on('boardUpdate', this._updateBoard.bind(this));
  }

  _updateOpponent(data) {
    this.setState({ opponent: data });
    if (data) {
      socket.emit('hazOpponent', data);
    } else {
      socket.emit('noHazOpponent');
    }
  }

  _updateBoard(data) {
    this.setState({ board: data });
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
    this.setState({ board: newBoard });
    socket.emit('makeMove', newBoard);
  }

  render() {
    let navbar   = []
      , main     = <Login chooseName={this._chooseName.bind(this)} />
      , username = this.state.username;

    if (username) {
      navbar = <Navbar username={this.state.username}
                       opponent={this.state.opponent}
                       onlineUsers={this.state.onlineUsers}
                       logout={this._logout.bind(this)} />;
      main   = <Board myColor={this.state.myColor}
                      board={this.state.board}
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
