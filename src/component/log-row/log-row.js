import React, { Component } from 'react';
import './log-row.css';

class LogRow extends Component {
  render() {
    return (
      <li className="log-row">
        {this.props.log}
      </li>
    );
  }
}

export default LogRow;
