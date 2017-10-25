import React, { Component } from 'react';
import Action from '../action/action';
import { ActionType } from '../../Entities/action-type';
import './game-action.css';

class GameAction extends Component {

  render() {
    let actions = {
      Treasure: [
        <Action key={ActionType.open} type={ActionType.open} action={this.props.openAction} canAction={this.props.canOpen}/>,
        <Action key={ActionType.rest} type={ActionType.rest} action={this.props.restAction} canAction={this.props.canRest}/>,
        <Action key={ActionType.continue} type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>
      ],
      Monster: [
        <Action key={ActionType.attack} type={ActionType.attack} action={this.props.attackAction} canAction={this.props.canAttack}/>,
        <Action key={ActionType.skip} type={ActionType.skip} action={this.props.skipAction} canAction={this.props.canSkip}/>,
        <Action key={ActionType.continue} type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>
      ],
      Nothing: [
        <Action key={ActionType.rest} type={ActionType.rest} action={this.props.restAction} canAction={this.props.canRest}/>,
        <Action key={ActionType.continue} type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>
      ]
    };

    return (
      <div className="game-action">
        {actions[this.props.roomType]}
      </div>
    );
  }
}

export default GameAction;
