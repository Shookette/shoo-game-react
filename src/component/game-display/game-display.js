import React, { Component } from 'react';
import './game-display.css';

class GameDisplay extends Component {
  render() {
    return (
      <div className="game-display">
        <h1>Etage : {this.props.level} - Salle {this.props.currentRoom + 1} / {this.props.nbRoom}</h1>
        <h2>{this.props.roomType}</h2>
      </div>
    );
  }
}

export default GameDisplay;
