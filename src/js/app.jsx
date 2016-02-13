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
    }
  }

  componentWillMount() {
    socket.on('news', function(data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  _logout() {
    this.setState({ username: '' });
  }

  _chooseName(username) {
    this.setState({ username: username });
  }

  render() {
    console.log('this.state.username:', this.state.username)

    let navbar = this.state.username ? <Navbar logout={this._logout.bind(this)} /> : [];
    let main = this.state.username ? <Board myColor={this.state.myColor} />
                                   : <Login chooseName={this._chooseName.bind(this)} />;
    return (
      <div>
        {navbar}
        <h1>Play Chess Like Paul!</h1>
        <hr/>
        {main}
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('React'));
