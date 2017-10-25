import React, { Component } from 'react';
import './game-ask-name.css';

class GameAskName extends Component {

  constructor(props) {
    super(props);
    this.state = {
      name: ''
    };
  }

  handleChange = event => {
    this.setState({
      name: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.nameAction(this.state.name);
  };

  render() {
    return (
      <form className="game-ask-name" onSubmit={this.handleSubmit}>
        <label>
          Name:
          <input type="text" value={this.state.name} onChange={this.handleChange}/>
        </label>
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default GameAskName;
