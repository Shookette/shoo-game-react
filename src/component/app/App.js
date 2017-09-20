import React, { Component } from 'react';
import CharInfo from '../char-info/char-info';
import GameDisplay from '../game-display/game-display';
import GameAction from '../game-action/game-action';
import GameLog from '../game-log/game-log';
import './App.css';

const char = {
  class: {
    name: 'poop'
  },
  name: 'toto',
  level: 1,
  hp: {
    max:125,
    actual: 65
  },
  money:5
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="left-info">
          <CharInfo char={char} />
          <GameLog/>
        </div>
        <div className="right-game">
          <GameDisplay/>
          <GameAction/>
        </div>
      </div>
    );
  }
}

export default App;
