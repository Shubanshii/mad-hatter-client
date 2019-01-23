  import React, { Component } from 'react';
  import PlayerCircle from './PlayerCircle';
  import PlayerDecision from './PlayerDecision';

  class Game extends Component {
    render() {
      return (
        <div className="App">
          <main role="main">
            <header>
              <h1>Table Name</h1>
            </header>
            <PlayerCircle />
            <PlayerDecision potSize={1.50} smallPlayer={1} playerTurn={1} />
          </main>
        </div>
      );
    }
  }

  export default Game;
