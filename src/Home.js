import React, { Component } from 'react';
import NewGame from './NewGame';
import JoinGame from './JoinGame';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <main role="main">
          <header>
            <h1>New Game</h1>
          </header>
          <section>
            <NewGame />
          </section>
          <header>
            <h1>Join Game</h1>
          </header>
          <section>
            <JoinGame />
          </section>
        </main>
      </div>
    );
  }
}

export default Home;
