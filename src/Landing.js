import React, { Component } from 'react';
import SignUp from './SignUp';

class Landing extends Component {
  render() {
    return (
      <div className="App">
        <main role="main">
          <header role="banner">
            <h1>The Mad HATter</h1>
            <h2>Poker. It's more fun with(out) cards</h2>
          </header>
          <section>
            <header>
              <h3>Track the action, amounts and stack size of your Texas Hold'Em poker game.</h3>
            </header>
            <p>[<em>placeholder for screenshot of poker game.</em>]</p>
            <p>The Mad HATter is a Hold'Em action tracker that tracks the action, amounts and stack size of your Texas Hold'Em poker game.  Get a deck of cards.  Take out the jokers.  Start a game on The Mad HATter.  Have your friends join it.  Deal the cards.  Then bet, call, raise, check, and fold your way to good times.  The app will keep track of who won each hand, how much was bet, what decisions were made, etc.

            So basically ... it's an app for people who want to play Texas Hold'Em, but dont't have poker chips or a decent substitute, ya dig?
            </p>
          </section>
          <section>
            <header>
                <h3>Start Playing Now</h3>
            </header>
            <SignUp />
          </section>
        </main>
      </div>
    );
  }
}

export default Landing;
