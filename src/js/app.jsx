import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Board from './components/Board.jsx';
import Login from './components/Login.jsx';
import '../css/style.css';

let socket = io.connect('/');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      username: '',
      myColor: 'w',
      onlineUsers: [],
    };
  }

  componentDidMount() {
    socket.on('boardUpdate', function(data) {
      console.log(data);
    });

    socket.on('onlineUsers', this._updateUsers.bind(this));
  }

  _updateUsers(data) {
    console.log('users:', data);
    this.setState({ onlineUsers: data });
  }

  _logout() {
    this.setState({ username: '' });
    socket.emit('logout');
  }

  _chooseName(username) {
    this.setState({ username: username });
    socket.emit('login', username);
  }

  render() {
    let navbar   = []
      , main     = <Login chooseName={this._chooseName.bind(this)} />
      , username = this.state.username;

    if (username) {
      navbar = <Navbar username={this.state.username}
                       onlineUsers={this.state.onlineUsers}
                       logout={this._logout.bind(this)} />;
      main   = <Board myColor={this.state.myColor} />;
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
