import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div onClick={this.props.clickHandler}>This div has been clicked {this.props.clicks} times.</div>
    );
  }
}

export default App;
