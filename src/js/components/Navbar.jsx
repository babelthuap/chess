import React from 'react';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Navbar';
  }
  render() {
    return (
      <div className="navbar">
        <h3>position</h3>
        <hr/>
        {this.props.move}
      </div>
    )
  }
}

export default Navbar;
