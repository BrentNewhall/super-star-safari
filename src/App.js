import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    let ship = <img src='/images/bgbattleship.png' alt='player'
        className='playerShip' />;
    return (
      <div className="App">
        <header className="App-header">
          Super Star Safari
        </header>
        <div className="sidebar">
          Condition: GREEN<br />
          Life Support: GREEN<br />
          Energy: 5000<br />
          Torpedoes: 10<br />
          Shields: UP, 100%<br />
          Enemies left: 20<br />
          Date: 2300<br />
          Time Left: 20<br />
        </div>
        {ship}
      </div>
    );
  }
}

export default App;
