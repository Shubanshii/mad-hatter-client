import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fold} from './actions';


export class PlayerDecision extends Component {
  fold() {
    // console.log(playerCount);
    // this.props.dispatch(fold(playerIndex));

    // console.log(this.props.playerInfo);
    console.log('button working');
    this.props.dispatch(fold());
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
          <button type="button" name="check">Check</button>
          <button type="button" name="call">Call</button>
          <button onClick={() => this.fold()} type="button" name="fold">Fold</button>
          <div>
            <label htmlFor="raise">Raise</label>
            <input type="number" name="amount" placeholder="12" />
          </div>
        </div>
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
  potSize: state.potSize
});

export default connect(mapStateToProps)(PlayerDecision);
