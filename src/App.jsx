'use strict';

// Dependencies
import React, { Component } from 'react';

// Components
import Fullscreen from 'react-fullscreen';

class App extends Component {
  constructor (props) {
    super(props);

    // Default state
    this.state = {};
  }

  render () {
    return (
      <div className="wrapper">
        <Fullscreen contentEnter="Go fullscreen" contentExit="Exit fullscreen" target="body" />
      </div>
    );
  }
}

export default App;
