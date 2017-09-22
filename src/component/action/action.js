import React, { Component } from 'react';
import './action.css';

class Action extends Component {
  render() {
    let disabled = !this.props.canAction ? 'disabled': '';
    return (
      <button className="action" onClick={this.props.action} disabled={disabled}>
        {this.props.type}
      </button>
    );
  }
}

export default Action;
