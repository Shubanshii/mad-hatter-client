  import React, { Component } from 'react';
  import PlayerCircle from './PlayerCircle';
  import PlayerDecision from './PlayerDecision';
  import Notification from './Notification';

  class Game extends Component {
    render() {
      return (
        <div className="App">
          <main role="main">
            <header>
              <h1>Table Name</h1>
            </header>
            <Notification />
            <PlayerCircle />
            <PlayerDecision potSize={1.50} smallPlayer={1} playerTurn={1} />
          </main>
        </div>
      );
    }
  }

  export default Game;
