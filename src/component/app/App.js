import React, { Component } from 'react';
import CharInfo from '../char-info/char-info';
import GameDisplay from '../game-display/game-display';
import GameAction from '../game-action/game-action';
import GameLog from '../game-log/game-log';
import { RoomType } from '../../Entities/room-type';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    let mapNumber = Math.floor((Math.random() * 10) + 1);
    let maps = [];
    for (let i= 0; i<mapNumber; i++) {
      let mapType = RoomType[Math.floor((Math.random() * 2))]
      console.log('prout::mapType::', mapType);
      maps.push(mapType)
    }

    let canContinue = (maps[0] === RoomType[2]);

    this.state = {
      class: {
        name: 'poop'
      },
      name: 'toto',
      level: 1,
      hp: {
        max:125,
        actual: 65
      },
      money:5,
      logs: [
        'toto',
        'tests',
        'fdsfdfgf',
        'gfdgfd'
      ],
      mapLevel: 1,
      mapRoom: mapNumber,
      maps: maps,
      currentRoom: 0,
      actualRoomType: maps[0],
      canOpen: true,
      canAttack: true,
      canRest: true,
      canContinue: canContinue
    };
  }

  /**
   *
   */
  actionAttack = () => {
    // create an monster entity and rnd damage until this life is destroyyyyl
    console.log('this.state.logs::', this.state.logs);
    this.setState((prevState, props) => ({
      currentRoom: prevState.currentRoom++,
      actualRoomType: prevState.maps[prevState.currentRoom],
      canAttack: false,
      logs: [...prevState.logs, 'Vous avez changé de pièce']
    }));
  };

  /**
   *
   */
  actionRest = () => {
    // random nb hp point gain (min = 1 max = max HP / 2)
    this.setState((prevState, props) => {
      let gainHP = Math.floor((Math.random() * (prevState.hp.actual / 2)) + 1);
      let isMaxHP = (prevState.hp.actual === prevState.hp.max);
      let newHP = (prevState.hp.actual + gainHP) > prevState.hp.max ? prevState.hp.max : prevState.hp.actual + gainHP;
      let log = '';
      if (isMaxHP) {
        log = 'Vous êtes déjà au maximum de vos points de vie';
      } else if ((prevState.hp.actual + gainHP) >= prevState.hp.max) {
        log = `Vous vous êtes soigné de : ${prevState.hp.max - prevState.hp.actual}`;
      }else {
        log = `Vous vous êtes soigné de : ${gainHP}`;
      }

      return {
        hp: {
          actual: newHP,
          max: prevState.hp.max
        },
        logs: [...prevState.logs, log],
        canRest: false
      }
    });
  };

  /**
   *
   */
  actionContinue = () => {
    console.log('this.state.logs::', this.state.logs);
    this.setState((prevState, props) => {
      let actualRoomType = prevState.maps[prevState.currentRoom];
      let canContinue = (actualRoomType === RoomType[2]);
      let nextRoom = (prevState.currentRoom + 1) < prevState.maps.length ? prevState.currentRoom + 1: prevState.currentRoom;
      let toto = {
        currentRoom: nextRoom,
        actualRoomType: actualRoomType,
        logs: [...prevState.logs, `Vous êtes entré dans une pièce contenant ${actualRoomType}`],
        canOpen: true,
        canAttack: true,
        canContinue: canContinue
      }
      console.log('prout::toto::', toto);
      return toto;
    });
  };

  /**
   *
   */
  actionOpen = () => {
    // random nb money gain (min 1 * level max 20 * level)
    console.log('this.state.logs::', this.state.logs);
    this.setState((prevState, props) => {
      let gainMoney = Math.floor((Math.random() * (20 * prevState.level)) + (1 * prevState.level));

      return {
        money: prevState.money + gainMoney,
        logs: [...prevState.logs, `Vous avez gagné ${gainMoney} pièce(s)`],
        canOpen: false
      }
    });
  };


  render() {
    return (
      <div className="App">
        <div className="left-info">
          <CharInfo
            class={this.state.class}
            name={this.state.name}
            level={this.state.level}
            hp={this.state.hp}
            money={this.state.money}
          />
          <GameLog logs={this.state.logs}/>
        </div>
        <div className="right-game">
          <GameDisplay
            level={this.state.mapLevel}
            nbRoom={this.state.mapRoom}
            currentRoom={this.state.currentRoom}
            roomType={this.state.actualRoomType}
          />
          <GameAction
            roomType={this.state.actualRoomType}
            restAction={this.actionRest}
            openAction={this.actionOpen}
            attackAction={this.actionAttack}
            continueAction={this.actionContinue}
          />
        </div>
      </div>
    );
  }
}

export default App;
