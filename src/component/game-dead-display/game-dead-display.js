import React, { Component } from 'react';
import './game-dead-display.css';

class GameDeadDisplay extends Component {

  render() {
    return (
      <div className="game-dead-display">
        <h1> Vous êtes mort à la salle {this.props.nbRoom} du niveau {this.props.level} avec {this.props.money} pièce(s)</h1>
      </div>
    );
  }
}

export default GameDeadDisplay;
