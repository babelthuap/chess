import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Square';
  }

  handleClick() {
    console.log('position', this.props.coordinates)
  }

  render() {
    // console.log(this.props.coordinates)
    return (
      <div className={`${this.props.color} square`} onClick={this.handleClick.bind(this)}>
        <span className="piece">{this.props.piece}</span>
      </div>
    );
  }
}

export default Square;
