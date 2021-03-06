import React from 'react';
import '../../css/login.css';

const MAX_USERNAME_LENGTH = 12;

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Login';
    this.state = { username: '' };
  }

  componentDidMount() {
    this.refs.usernameInput.focus();
  }

  _join() {
    if (this.state.username) {
      this.props.chooseName(this.state.username);
    }
  }

  _handleKeyPress(e) {
    if (e.key === 'Enter') this._join.call(this);
  }

  _usernameInput(e) {
    let newName = e.target.value.replace(/\s/g, '');
    if (newName.length > MAX_USERNAME_LENGTH) return;
    this.setState({ username: newName });
  }

  render() {
    return (
      <div className="login">
        <div>
          <img src="pieces/bk.svg"/>
          <img src="pieces/wk.svg"/>
          <h1>Welcome!</h1>
          <p>&bull; &bull; &bull;</p>
          <h2>Please choose a username:</h2>
          <input type="text"
                 ref="usernameInput"
                 placeholder='e.g. "paul"'
                 value={this.state.username}
                 onKeyPress={this._handleKeyPress.bind(this)}
                 onChange={this._usernameInput.bind(this)} />
          <div className="button" onClick={this._join.bind(this)}>Join a game!</div>
        </div>
      </div>
    )
  }
}

export default Login;
