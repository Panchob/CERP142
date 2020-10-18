import React, { Component } from 'react';
import { SameStatus } from './SameStatus';

export class Popup extends Component {
  handleClick = () => {
    this.props.toggle();
  };

  render() {
    return (
      <div className="modal">
        <div className="modal-content">
          <button className="close-popup" onClick={this.handleClick}></button>
          <p>I'm a pop up!</p>
          <SameStatus status={this.props.status}/>
        </div>
      </div>
    )
  }
}