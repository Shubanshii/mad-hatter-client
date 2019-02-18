import React, { Component } from 'react';
import {connect} from 'react-redux';
import {call, fold, raise, check} from './actions';


export class PlayerDecision extends Component {
  fold() {
    this.props.dispatch(fold());
    // if(this.props.inHand.length === 1) {
    //   console.log('1 in hand');
    // }
    //check if hand is over
    // console.log(playerCount);
    // this.props.dispatch(fold(playerIndex));

    // console.log(this.props.playerInfo);
    // console.log('button working');
    // let playerInfo = this.props.playerInfo;
    // console.log(playerInfo);
    // console.log('fold working');
    // let inHandCount = 0;

    // for (var i = 0; i < playerInfo.length; i++) {
    //   if(playerInfo[i].inHand === true) {
    //     inHandCount++;
    //   }
    // }
    // console.log(inHandCount);
    //
    // if(inHandCount === 2) {
    //   function switchBlinds(player) {
    //     if(player.smallBlind) {
    //       player.smallBlind = false;
    //       player.bigBlind = true;
    //     }
    //     else if (player.bigBlind) {
    //       player.smallBlind = true;
    //       player.bigBlind = false;
    //     }
    //   }
    //   console.log('heads up fold working');
    //   playerInfo = playerInfo.map(player => {
    //     if(player.playerTurn === true) {
    //       player.playerTurn = false;
    //       player.inHand = false;
    //       switchBlinds(player);
    //       inHandCount--;
    //     }
    //     else if(player.playerTurn === false && player.inHand === true && inHandCount === 1) {
    //       switchBlinds(player);
    //       player.stackSize += this.props.potSize;
    //     }
    //     return player;
    //   });
    //
    //   if(inHandCount === 1) {
    //     console.log(playerInfo);
    //     console.log('handcount is one');
    //     this.props.dispatch(beginHand(playerInfo));
    //
    //   }
    // }

  }

  call() {
    this.props.dispatch(call());
  }

  raise(e) {
    e.preventDefault();
    const value = this.input.value;
    this.props.dispatch(raise(value));
  }

  check() {
    this.props.dispatch(check());
  }

  render() {
    // const playerCount = this.props.playerCount;
    // const player = this.props.playerInfo.find(player => player.playerTurn === true);

    return (
      <div className="App">
        {/*<h2>Your Stack Size:</h2>
        <h6>100</h6>*/}
        <h2>Pot Size: {this.props.potSize}</h2>
        <form>
        {/*<h2>Player {this.props.playerTurn} act</h2>*/}
        <div className="form-section">
          <button onClick={() => this.check()} type="button" name="check">Check</button>
          <button onClick={() => this.call()} type="button" name="call">Call</button>
          <button onClick={() => this.fold()} type="button" name="fold">Fold</button>
          {/*<div>
              <label>
                Raise:
                <input className="amount" type="number" name="amount" placeholder="12" />
              </label>
              <input onClick={(e) => this.raise(e)} type="submit"/>
            <label htmlFor="raise">Raise</label>
            <input onClick={() => this.raise()} type="number" name="amount" placeholder="12" />

          </div>*/}
        </div>
        </form>
        <form onSubmit={e => this.raise(e)}>
          <input
            type="number"
            step="0.01"
            name="raiseAmount"
            id="raiseAmount"
            className="text"
            min={this.props.toPlay * 2}
            /*max="100"*/
            placeholder={this.props.toPlay * 2}
            autoComplete="off"
            /*aria-labelledby="feedback"*/
            ref={input => (this.input = input)}
            required
          />
          <button
            type="submit"
            name="submit"
            id="raiseButton"
            className="button"
          >
            Raise
          </button>
        </form>
      </div>
    );
  }
}

PlayerDecision.defaultProps = {
    // title: 'Board'
};

const mapStateToProps = state => ({
  playerInfo: state.playerInfo,
  potSize: state.potSize,
  handOver: state.handOver,
  headsUp: state.headsUp,
  inHand: state.inHand,
  toPlay: state.toPlay
});

export default connect(mapStateToProps)(PlayerDecision);
