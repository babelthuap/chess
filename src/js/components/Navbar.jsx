import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }
  render() {
    return (
      <div className="navbar">
        <div className="button" onClick={this.props.logout}>Log out</div>
      </div>
    )
  }
}

export default Navbar;
