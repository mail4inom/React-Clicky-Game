import React, { Component } from 'react';
import './App.css';
import ClickyGame from './components/ClickyGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <ClickyGame/>
      </div>
    );
  }
}

export default App;