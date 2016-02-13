import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Square';
  }

  handleClick() {
    this.props.click(this.props.coordinates);
  }

  render() {
    let piece = this.props.piece;
    let img = piece ? <img src={`pieces/${piece}.svg`} width="64" alt={piece}/> : [];
    return (
      <div className={`${this.props.color} square`} onClick={this.handleClick.bind(this)}>
        <span className="piece">
          {img}
        </span>
      </div>
    );
  }
}

export default Square;
