import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor( props ) {
    super( props );
    this.state = {
      shipCondition: 'GREEN',
      lifeSupport: 'GREEN',
      energy: 5000,
      torpedoes: 10,
      shieldsUp: true,
      shields: 100,
      enemies: 20,
      date: 2300,
      timeLeft: 20,
    }
  }
  render() {
    const shieldState = (this.state.shieldsUp) ? 'UP' : 'DOWN';
    let ship = <img src='/images/bgbattleship.png' alt='player'
        className='playerShip' />;
    return (
      <div className="App">
        <header className="App-header">
          Super Star Safari
        </header>
        <div className="sidebar">
          Condition: {this.state.shipCondition}<br />
          Life Support: {this.state.lifeSupport}<br />
          Energy: {this.state.energy}<br />
          Torpedoes: {this.state.torpedoes}<br />
          Shields: {shieldState}, {this.state.shields}%<br />
          Enemies left: {this.state.enemies}<br />
          Date: {this.state.date}<br />
          Time Left: {this.state.timeLeft}<br />
        </div>
        {ship}
      </div>
    );
  }
}

export default App;
