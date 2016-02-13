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
      user: {}
    }
  }
  render() {
    return (
      <div>
        <Navbar />
        <h1>Play Chess Like Paul!</h1>
        <Board />
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('React'));
