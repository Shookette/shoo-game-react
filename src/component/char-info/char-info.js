import React, { Component } from 'react';
import CharLogo from '../char-logo/char-logo';
import CharStat from "../char-stat/char-stat";
import './char-info.css';

class CharInfo extends Component {
  render() {
    return (
      <div className="char-info">
        <CharLogo class={this.props.char.class} name={this.props.char.name} />
        <CharStat
          level={this.props.char.level}
          hp={this.props.char.hp}
          money={this.props.char.money}
        />
      </div>
    );
  }
}

export default CharInfo;
