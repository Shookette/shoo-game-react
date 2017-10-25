import React, { Component } from 'react';
import CharInfo from '../char-info/char-info';
import GameDisplay from '../game-display/game-display';
import GameEndDisplay from '../game-end-display/game-end-display';
import GameAskName from '../game-ask-name/game-ask-name';
import GameDeadDisplay from '../game-dead-display/game-dead-display';
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
      let mapType = RoomType[Math.floor((Math.random() * 2))];
      maps.push(mapType)
    }

    let canContinue = this._canContinue(maps[0]);

    // @todo implemente class ?
    this.state = {
      class: {
        name: 'poop'
      },
      name: '',
      level: 1,
      hp: {
        max:125,
        actual: 125
      },
      money:0,
      logs: [],
      mapLevel: 1,
      mapMaxLevel: 10,
      mapRoom: mapNumber,
      maps: maps,
      currentRoom: 0,
      actualRoomType: maps[0],
      numberSkip: 0,
      canSkip: true,
      canOpen: true,
      canAttack: true,
      canRest: true,
      canContinue: canContinue,
      isEnd: false,
      isDead: false
    };
  }

  /**
   *
   */
  actionAttack = () => {
    // create an monster entity and rnd damage until this life is destroyyyyl

    this.setState((prevState) => {
      let gainMoney = Math.floor(Math.random() * (6 * prevState.level));
      let lossHealth = Math.floor((Math.random() * (20 * prevState.level)) + prevState.level);
      let canContinue = true;
      let dead = (prevState.hp.actual - lossHealth) < 0;
      let finalHP = dead ? 0 : prevState.hp.actual - lossHealth;
      let log = gainMoney > 0 ?
        `Vous avez perdu ${lossHealth} HP(s) et gagné ${gainMoney} en tuant le monstre de la pièce` :
        `Vous avez perdu ${lossHealth} HP(s) en tuant le monstre de la pièce`;
      if (finalHP === 0) {
        canContinue = false;
        log = `Vous avez perdu ${lossHealth} HP(s) et en êtes mort !`
      }

      return {
        hp: {
          actual: finalHP,
          max: prevState.hp.max
        },
        money: prevState.money + gainMoney,
        canAttack: false,
        canSkip: false,
        canContinue: canContinue,
        isDead: dead,
        logs: [...prevState.logs, log]
      }
    });
  };

  /**
   *
   */
  actionRest = () => {
    // random nb hp point gain (min = 1 max = max HP / 2)
    this.setState((prevState) => {
      let gainHP = Math.floor((Math.random() * (prevState.hp.max / 2)) + 1);
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
    this.setState((prevState) => {
      let nextRoom = prevState.currentRoom + 1;
      let actualRoomType = prevState.maps[nextRoom];
      let canContinue = this._canContinue(actualRoomType);
      if (nextRoom < prevState.maps.length) {
        return {
          currentRoom: nextRoom,
          actualRoomType: actualRoomType,
          logs: [...prevState.logs, `Vous êtes entré dans une pièce contenant ${actualRoomType}`],
          canOpen: true,
          canAttack: true,
          canRest: true,
          canSkip: true,
          canContinue: canContinue
        }
      } else {
        return this._nextLevel(prevState);
      }
    });
  };

  /**
   *
   * @param room
   * @returns {boolean}
   * @private
   */
  _canContinue(room) {
    return (room === RoomType[0] || room === RoomType[2]);
  }

  /**
   *
   * @param prevState
   * @returns {*}
   * @private
   */
  _nextLevel(prevState = null) {
    if (prevState !== null) {
      let newLevel = prevState.mapLevel + 1;

      if (newLevel <= prevState.mapMaxLevel) {
        let mapNumber = Math.floor((Math.random() * 10) + 1);
        let maps = [];
        for (let i = 0; i < mapNumber; i++) {
          let mapType = RoomType[Math.floor((Math.random() * 2))];
          maps.push(mapType)
        }

        let canContinue = this._canContinue(maps[0]);
        return {
          mapLevel: newLevel,
          logs: [...prevState.logs, `Vous avez changé de niveau et êtes entré dans une pièce contenant ${maps[0]}`],
          mapRoom: mapNumber,
          maps: maps,
          currentRoom: 0,
          actualRoomType: maps[0],
          canOpen: true,
          canAttack: true,
          canRest: true,
          canSkip: true,
          canContinue: canContinue
        }
      } else {
        return {
          canOpen: false,
          canAttack: false,
          canRest: false,
          canContinue: false,
          canSkip: false,
          isEnd: true
        }
      }
    } else {
      return null;
    }
  }

  /**
   *
   */
  actionOpen = () => {
    // random nb money gain (min 1 * level max 20 * level)
    this.setState((prevState) => {
      let rnd = Math.floor((Math.random() * 100) + 1);
      if (rnd < 80) {
        let gainMoney = Math.floor((Math.random() * (20 * prevState.level)) + prevState.level);

        return {
          money: prevState.money + gainMoney,
          logs: [...prevState.logs, `Vous avez gagné ${gainMoney} pièce(s)`],
          canOpen: false,
          canContinue: true
        }
      } else {
        let lossHealth = Math.floor((Math.random() * (20 * prevState.level)) + prevState.level);
        let finalHP,dead;
        dead = (prevState.hp.actual - lossHealth) < 0;
        finalHP = dead ? 0 : prevState.hp.actual - lossHealth;
        let canContinue = true;
        let log = `Vous avez perdu ${lossHealth} HP(s)`;
        if (finalHP === 0) {
          canContinue = false;
          log = `Vous avez perdu ${lossHealth} HP(s) et en êtes mort !`
        }

        return {
          hp: {
            actual: finalHP,
            max: prevState.hp.max
          },
          logs: [...prevState.logs, log],
          isDead: dead,
          canOpen: false,
          canContinue: canContinue
        }
      }
    });
  };

  /**
   *
   * @param newName
   */
  actionName = (newName) => {
    this.setState({
      name: newName
    });
  };

  actionSkipMonster = () => {
    this.setState((prevState) => {
      let actualChance = prevState.mapLevel + prevState.numberSkip;
      let remainingChance = prevState.mapMaxLevel - actualChance;
      if (remainingChance > 0) {
        // roll another rnd and see if the skip is possible or take damage + bloc the retry chance and reset the numberSkip
        let rndCanSkip = Math.floor((Math.random() * remainingChance) + 1);
        if (remainingChance - rndCanSkip > 0) {
          return {
            numberSkip: prevState.numberSkip + 1,
            canContinue: true,
            canSkip: false,
            canAttack: false
          }
        } else {
          return this._skipBadCase(prevState);
        }
      } else {
        // take damage + bloc the retry chance and reset the numberSkip
        return this._skipBadCase(prevState);
      }
    });
  };

  _skipBadCase(prevState) {
    let lossHealth = Math.floor((Math.random() * (20 * prevState.level)) + prevState.level);
    let dead = (prevState.hp.actual - lossHealth) < 0;
    let finalHP = dead ? 0 : prevState.hp.actual - lossHealth;
    let log = `Vous avez perdu ${lossHealth} HP(s) en essayant d'ésquiver le monstre`;
    if (finalHP === 0) {
      log = `Vous avez perdu ${lossHealth} HP(s) en essayant d'ésquiver le monstre et en êtes mort !`
    }

    return {
      hp: {
        actual: finalHP,
        max: prevState.hp.max
      },
      logs: [...prevState.logs, log],
      isDead: dead,
      numberSkip: 0,
      canSkip: false
    }
  }


  render() {
    if (this.state.name === '') {
      return (
        <div className="App">
          <GameAskName
            nameAction={this.actionName}
            newName={this.state.name}
          />
        </div>
      );
    } else if (this.state.isEnd) {
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
            <GameEndDisplay
              money={this.state.money}
            />
          </div>
        </div>
      )
    } else if (this.state.isDead) {
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
            <GameDeadDisplay
            level={this.state.level}
            nbRoom={this.state.currentRoom}
            money={this.state.money}
            />
          </div>
        </div>
      )
    } else {
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
              isDead={this.state.isDead}
              isEnd={this.state.isEnd}
            />
            <GameAction
              roomType={this.state.actualRoomType}
              restAction={this.actionRest}
              canRest={this.state.canRest}
              openAction={this.actionOpen}
              canOpen={this.state.canOpen}
              attackAction={this.actionAttack}
              canAttack={this.state.canAttack}
              continueAction={this.actionContinue}
              canContinue={this.state.canContinue}
              skipAction={this.actionSkipMonster}
              canSkip={this.state.canSkip}
              isDead={this.state.isDead}
              isEnd={this.state.isEnd}
            />
          </div>
        </div>
      );
    }
  }
}

export default App;
