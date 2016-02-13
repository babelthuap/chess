import React from 'react';
import ReactDOM from 'react-dom';
import Navbar from './components/Navbar.jsx';
import Board from './components/Board.jsx';
import '../css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
    this.state = {
      user: {},
      myColor: 'w',
    }
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
