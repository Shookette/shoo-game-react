import React, { Component } from 'react';
import './game-end-display.css';

class GameEndDisplay extends Component {

  render() {
    return (
      <div className="game-end-display">
        <h1> Vous avez fini le jeu avec {this.props.money} pièce(s)</h1>
      </div>
    );
  }
}

export default GameEndDisplay;
