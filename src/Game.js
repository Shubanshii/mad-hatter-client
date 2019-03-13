  import React, { Component } from 'react';
  import PlayerCircle from './PlayerCircle';
  import PlayerDecision from './PlayerDecision';
  import Notification from './Notification';
  import {connect} from 'react-redux';
  import {beginGame} from './actions';

  export class Game extends Component {
    componentDidMount() {
      this.props.dispatch(beginGame());
  }

    render() {

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
    playerCount: state.playerCount,
    playerInfo: state.playerInfo
  });

  export default connect(mapStateToProps)(Game);
