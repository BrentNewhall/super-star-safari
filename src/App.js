import React, { Component } from 'react';
import './App.css';

const ACTION_FRAME_TIME = 10;
const SHIP_SPEED = 1;

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
    this.shipLocation = { x: 240, y: 240 };
    this.shipMoving = false;
    this.shipDestination = { x: 0, y: 0 };
    this.spaceClicked = this.spaceClicked.bind( this );
    this.movePlayerShip = this.movePlayerShip.bind( this );
  }

  spaceClicked( event ) {
    console.log( event.pageX + ", " + event.pageY );
    this.shipDestination.x = event.pageX - 65;
    this.shipDestination.y = event.pageY - 65;
    this.shipMoving = true;
    setTimeout( this.movePlayerShip, ACTION_FRAME_TIME );
  }

  movePlayerShip() {
    if( this.shipLocation.x < this.shipDestination.x ) {
      this.shipLocation.x += SHIP_SPEED;
      this.setState( { energy: this.state.energy - 1 } );
    }
    else if( this.shipLocation.x > this.shipDestination.x ) {
      this.shipLocation.x -= SHIP_SPEED;
      this.setState( { energy: this.state.energy - 1 } );
    }
    if( this.shipLocation.y < this.shipDestination.y ) {
      this.shipLocation.y += SHIP_SPEED;
      this.setState( { energy: this.state.energy - 1 } );
    }
    else if( this.shipLocation.y > this.shipDestination.y ) {
      this.shipLocation.y -= SHIP_SPEED;
      this.setState( { energy: this.state.energy - 1 } );
    }
    if( this.shipDestination.x === this.shipLocation.x  &&
        this.shipDestination.y === this.shipLocation.y ) {
      this.shipMoving = false;
    }
    else {
      //this.forceUpdate();
      setTimeout( this.movePlayerShip, ACTION_FRAME_TIME );
    }
  }

  render() {
    const shieldState = (this.state.shieldsUp) ? 'UP' : 'DOWN';
    const shipState = {
      left: this.shipLocation.x,
      top: this.shipLocation.y,
    }
    let ship = <img src='/images/bgbattleship.png' alt='player'
        className='playerShip' style={shipState} />;
    return (
      <div className="App" onClick={(event) => this.spaceClicked(event)}>
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
