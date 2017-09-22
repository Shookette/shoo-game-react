import React, { Component } from 'react';
import { RoomType } from '../../Entities/room-type';
import Action from '../action/action';
import { ActionType } from '../../Entities/action-type';
import './game-action.css';

class GameAction extends Component {

  getActions() {
    let actions = [];
    switch (this.props.roomType) {
      case RoomType[0]:
        actions.push(<Action type={ActionType.open} action={this.props.openAction} canAction={this.props.canOpen}/>);
        actions.push(<Action type={ActionType.rest} action={this.props.restAction} canAction={this.props.canRest}/>);
        actions.push(<Action type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>);
        break;
      case RoomType[1]:
        actions.push(<Action type={ActionType.attack} action={this.props.attackAction} canAction={this.props.canAttack}/>);
        actions.push(<Action type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>);
        break;
      case RoomType[2]:
        actions.push(<Action type={ActionType.rest} action={this.props.restAction} canAction={this.props.canRest}/>);
        actions.push(<Action type={ActionType.continue} action={this.props.continueAction} canAction={this.props.canContinue}/>);
        break;
    }

    return actions;
  }

  render() {
    return (
      <div className="game-action">
        {this.getActions()}
      </div>
    );
  }
}

export default GameAction;
