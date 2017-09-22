import React, { Component } from 'react';
import CharLogo from '../char-logo/char-logo';
import CharStat from "../char-stat/char-stat";
import './char-info.css';

class CharInfo extends Component {
  render() {
    return (
      <div className="char-info">
        <CharLogo class={this.props.class} name={this.props.name} />
        <CharStat
          level={this.props.level}
          hp={this.props.hp}
          money={this.props.money}
        />
      </div>
    );
  }
}

export default CharInfo;
