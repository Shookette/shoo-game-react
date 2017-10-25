import React, { Component } from 'react';
import LogRow from '../log-row/log-row';
import './game-log.css';

class GameLog extends Component {
  render() {
    var logsRows = [];

    this.props.logs.forEach((log, key) => {
      logsRows.push(<LogRow key={key} log={log} />);
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
