import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Square';
  }
  render() {
    return (
      <div className="square">
        <span className="piece">{this.props.piece}</span>
      </div>
    );
  }
}

export default Square;
