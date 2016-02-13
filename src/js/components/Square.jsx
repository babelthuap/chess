import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Square';
  }
  render() {
    // console.log(this.props.coordinates)
    return (
      <div className={`${this.props.color} square`}>
        <span className="piece">{this.props.piece}</span>
      </div>
    );
  }
}

export default Square;
