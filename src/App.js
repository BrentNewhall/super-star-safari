import React, { Component } from 'react';
import './App.css';

const FRAME_TIME = 10;
const SHIP_SPEED = 1;
const ACTION_NONE = 0;
const ACTION_LASERS = 1;
const ACTION_TORPEDOES = 2;
const ACTION_WARP = 3;

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
      lasersDisabled: false,
      torpedoesDisabled: false,
    }
    this.enemies = [
      { x: 500, y: 500, qx: 2, qy: 2, shields: 300 },
      { x: 500, y: 500, qx: 1, qy: 1, shields: 300 },
    ]
    this.action = ACTION_NONE;
    this.shipLocation = { x: 240, y: 240, qx: 1, qy: 1 };
    this.shipMoving = false;
    this.shipDestination = { x: 0, y: 0 };
    this.spaceClicked = this.spaceClicked.bind( this );
    this.lasersClicked = this.lasersClicked.bind( this );
    this.torpedoesClicked = this.torpedoesClicked.bind( this );
    this.quadrantClicked = this.quadrantClicked.bind( this );
    this.movePlayerShip = this.movePlayerShip.bind( this );
  }

  spaceClicked( event ) {
    // Ignore if clicking on sidebar or action is pending
    if( event.pageX < 250  &&  event.pageY < 250 )
      return;
    if( this.action !== ACTION_NONE )
      return;
    console.log( event.pageX + ", " + event.pageY );
    this.shipDestination.x = event.pageX - 65;
    this.shipDestination.y = event.pageY - 65;
    this.shipMoving = true;
    setTimeout( this.movePlayerShip, FRAME_TIME );
  }

  lasersClicked(e) {
    this.action = ACTION_LASERS;
    this.setState( { lasersDisabled: true } );
  }

  torpedoesClicked(e) {
    this.action = ACTION_TORPEDOES;
    this.setState( { torpedoesDisabled: true } );
  }

  warpClicked(e) {
    this.action = ACTION_WARP;
    this.setState( { warpDisabled: true } );
  }

  quadrantClicked( row, col ) {
    this.action = ACTION_NONE;
    //this.setState( { warpDisabled: false } );
  }

  enemyClicked(e) {
    if( this.action === ACTION_LASERS ) {
      let laserAmount = 200;
      if( this.state.energy < laserAmount ) {
        laserAmount = this.state.energy;
        this.setState( { energy: 0 } );
      }
      else {
        this.setState( { energy: this.state.energy - laserAmount } );
      }
      this.enemies.forEach( (enemy) => {
        if( enemy.qx === this.shipLocation.qx  &&  enemy.qy === this.shipLocation.qy ) {
          enemy.shields -= laserAmount;
        }
      })
      this.setState( { lasersDisabled: false } );
    }
    else if( this.action === ACTION_TORPEDOES ) {
      if( this.state.torpedoes > 0 ) {
        this.setState( { torpedoes: this.state.torpedoes - 1 } );
        this.enemies.forEach( (enemy) => {
          if( enemy.qx === this.shipLocation.qx  &&  enemy.qy === this.shipLocation.qy ) {
            enemy.shields -= 500;
          }
        })
      }
      this.setState( { torpedoesDisabled: false } );
    }
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
      setTimeout( this.movePlayerShip, FRAME_TIME );
    }
  }

  render() {
    const shieldState = (this.state.shieldsUp) ? 'UP' : 'DOWN';
    const shipState = {
      left: this.shipLocation.x,
      top: this.shipLocation.y,
    }
    let warpState = { visibility: 'hidden' };
    if( this.state.warpDisabled ) {
      warpState = { visibility: 'visible' };
    }
    let enemies = this.enemies.map( (enemy) => {
      if( enemy.qx === this.shipLocation.qx  &&
          enemy.qy === this.shipLocation.qy  &&  enemy.shields > 0 ) {
        const enemyState = {
          left: enemy.x,
          top: enemy.y,
        }
        return <img src='/images/speedship.png' alt='enemy' className='enemyShip' style={enemyState} onClick={(e) => this.enemyClicked(e)} />
      }
    })
    let ship = <img src='/images/bgbattleship.png' alt='player'
        className='playerShip' style={shipState} />;
    return (
      <div className="App" onClick={(event) => this.spaceClicked(event)}>
        <header className="App-header">
          Super Star Safari
        </header>
        <div className="starmap" style={warpState}>
          <div className="flex-container">
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Antares I</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Antares II</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Antares III</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Antares IV</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Sirius I</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Sirius II</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Sirius III</button></div>
            <div className="col"><button onClick={this.quadrantClicked(1,1)}>Sirius IV</button></div>
          </div>
        </div>
        <div className="sidebar">
          Condition: {this.state.shipCondition}<br />
          Life Support: {this.state.lifeSupport}<br />
          Energy: {this.state.energy}<br />
          Torpedoes: {this.state.torpedoes}<br />
          Shields: {shieldState}, {this.state.shields}%<br />
          Enemies left: {this.state.enemies}<br />
          Date: {this.state.date}<br />
          Time Left: {this.state.timeLeft}<br />
          <button onClick={(e) => this.lasersClicked(e)} disabled={this.state.lasersDisabled}>Lasers</button>
          <button onClick={(e) => this.torpedoesClicked(e)} disabled={this.state.torpedoesDisabled}>Torpedo</button>
          <button onClick={(e) => this.warpClicked(e)} disabled={this.state.warpDisabled}>Warp</button>
        </div>
        {ship}
        {enemies}
      </div>
    );
  }
}

export default App;
