  import React, { Component } from 'react';
  import PlayerCircle from './PlayerCircle';
  import PlayerDecision from './PlayerDecision';
  import Notification from './Notification';
  import {connect} from 'react-redux';
  import {beginGame} from './actions';

  export class Game extends Component {
    render() {
      this.props.dispatch(beginGame());
      //this.props.dispatch(beginHand());
      return (
        <div className="App">
          <main role="main">
            <header>
              <h1>Table Name</h1>
            </header>
            <Notification />
            <PlayerCircle />
            <PlayerDecision />
          </main>
        </div>
      );
    }
  }

  Game.defaultProps = {
      // title: 'Board'
  };

  const mapStateToProps = state => ({
    playerCount: state.playerCount
  });

  export default connect(mapStateToProps)(Game);
