import React, { Component } from 'react';
import './char-stat.css';

class CharStat extends Component {
  render() {
    return (
      <div className="char-stat">
        <div className="stat-level">
          Level : <span className="stat-value">{this.props.level}</span>
        </div>
        <div className="stat-hp">
          HP : <span className="stat-value">{this.props.hp.actual + '/' + this.props.hp.max}</span>
        </div>
        <div className="stat-money">
          Money : <span className="stat-value">{this.props.money}</span>
        </div>
      </div>
    );
  }
}

export default CharStat;
