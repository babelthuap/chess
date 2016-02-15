import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }
  render() {
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
      </div>
    )
  }
}

export default Navbar;
