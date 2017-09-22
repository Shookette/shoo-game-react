import React, { Component } from 'react';
import './game-display.css';

class GameDisplay extends Component {
  render() {
    return (
      <div className="game-display">
        {this.props.roomType}
      </div>
    );
  }
}

export default GameDisplay;
