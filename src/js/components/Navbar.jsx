import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }
  render() {
    return (
      <div className="navbar">
        <h3>White's turn</h3>
        <hr/>
      </div>
    )
  }
}

export default Navbar;
