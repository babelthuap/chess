import React from 'react';
import '../../css/navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }

  render() {
    let opponent = this.props.opponent ? this.props.opponent.split(' ')[0] : '- - -';

    let myColor = this.props.myColor ? `(${this.props.myColor})` : '';
    let oppColor = (this.props.myColor === 'w') ? '(b)' : (this.props.myColor ? '(w)' : '');

    let users = this.props.onlineUsers.map((user, i) => {
      return <em key={i}>{user}</em>
    });

    return (
      <div>
        <div className="logout button" onClick={this.props.logout}>Log out</div>
        <div className="playerInfo">
          <h3>You:</h3>
          <span>{this.props.username} {myColor}</span>
          <div className="divider"></div>
          <h3>Opponent:</h3>
          <span>{opponent} {oppColor}</span>
        </div>
        <div className="onlineUsers">
          <p>Users:</p>
          {users}
        </div>
      </div>
    )
  }
}

export default Navbar;
