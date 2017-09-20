import React, { Component } from 'react';
import './char-logo.css';
import poop from '../../images/poop.png';

function charName(name, className) {
  return name + ' ' + className;
}

function altLogo(className) {
  return 'logo-' + className
}

const images = {
  poop: <img src={poop} className="char-logo" alt={altLogo('poop')} />,
  default: <img alt="logo" />
};


class CharLogo extends Component {
  render() {
    return (
      <div className="char-header">
        {images[this.props.class.name]}
        <h2 className="char-class-name">{charName(this.props.name, this.props.class.name)}</h2>
      </div>
    );
  }
}

export default CharLogo;
