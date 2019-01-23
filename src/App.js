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
        {ship}
      </div>
    );
  }
}

export default App;
