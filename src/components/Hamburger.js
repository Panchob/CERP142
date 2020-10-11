import React, { Component } from 'react';

export class Hamburger extends Component {
  constructor(props) {
    super();
    this.state = {
      open: false,
    }
  }


  toggleHamburger = () => {
    this.setState({open: !this.state.open})
    this.props.handleHamClick();
  }

  render() {
    return(
      <div id="ham-btn" className={`hamburger-btn ${this.state.open? " sidebar-open": ""}`}>
        <div id="menu-toggle" className={this.state.open? "open": ""} onClick={() => this.toggleHamburger()} >
          <div id="hamburger">
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div id="cross">
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
    )
  }
}