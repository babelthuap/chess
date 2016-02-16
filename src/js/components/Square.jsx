import React from 'react';

class Square extends React.Component {
  constructor(props) {
    super(props);
    this.displayName = 'Square';
  }

  render() {
    let piece = this.props.piece;
    let img = piece ? <img src={`pieces/${piece}.svg`} width="64" alt={piece}/> : [];
    return (
      <div className={`${this.props.bgColor} square${this.props.highlight ? " highlight" : ""}`}
           onClick={this.props.click}>
        <span className="piece">
          {img}
        </span>
      </div>
    );
  }
}

export default Square;
