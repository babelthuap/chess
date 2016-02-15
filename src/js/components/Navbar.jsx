import React from 'react';
import '../../css/navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }

  render() {
    let users = this.props.onlineUsers.map((user, i) => {
      return <em key={i}>{user}</em>
    });

    return (
      <div>
        <div className="logout button" onClick={this.props.logout}>Log out</div>
        <div className="playerInfo">
          <h3>You:</h3>
          {this.props.username}
          <div className="divider"></div>
          <h3>Opponent:</h3>
          {this.props.opponent || '- - -'}
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
