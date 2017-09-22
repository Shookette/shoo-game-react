import React, { Component } from 'react';
import LogRow from '../log-row/log-row';
import './game-log.css';

class GameLog extends Component {
  render() {
    var logsRows = [];

    console.log('this.props.logs::', this.props.logs);

    this.props.logs.forEach((log) => {
      logsRows.push(<LogRow log={log} />);
    });

    return (
      <div className="game-log">
        <ul>
          {logsRows}
        </ul>
      </div>
    );
  }
}

export default GameLog;
