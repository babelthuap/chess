import React from 'react';
import ReactDOM from 'react-dom';
import '../css/style.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'App';
  }
  render() {
    return (
      <div>
        <h1>Chess for Paul</h1>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('React'));
