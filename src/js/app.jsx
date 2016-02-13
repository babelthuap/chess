import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Board from './components/Board.jsx';
import '../css/style.css';

let socket = io.connect('/');

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      user: {},
      myColor: 'w',
    }
  }

  componentWillMount() {
    socket.on('news', function(data) {
      console.log(data);
      socket.emit('my other event', { my: 'data' });
    });
  }

  makeMove(move) {
    this.setState({ move: move });
  }

  render() {
    return (
      <div>
        <Navbar move={this.state.move} />
        <h1>Play Chess Like Paul!</h1>
        <Board myColor={this.state.myColor} />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('React'));
