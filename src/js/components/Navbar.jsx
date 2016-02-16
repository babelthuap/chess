import React from 'react';
import '../../css/navbar.css';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }

  render() {
    let opponent = this.props.opponent ? this.props.opponent.split(' ')[0] : '- - -';

    return (
      <div>
        <div className="logout button" onClick={this.props.logout}>Log out</div>
        <div className="playerInfo">
          <div className={this.props.myColor}>
            <h3>You:</h3>
            <span className={(this.props.myTurn && this.props.myColor) ? ' currentTurn' : ''}>
              {this.props.username}
            </span>
          </div>
          <div className="divider"></div>
          <div className={this.props.myColor === 'w' ? 'b' : 'w'}>
            <h3>Opponent:</h3>
            <span className={this.props.myTurn ? '' : (this.props.myColor && ' currentTurn')}>
              {opponent}
            </span>
          </div>
        </div>
      </div>
    )
  }
}

export default Navbar;
