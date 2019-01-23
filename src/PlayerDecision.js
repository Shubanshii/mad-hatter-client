import React, { Component } from 'react';

class PlayerDecision extends Component {
  render() {
    return (
      <div className="App">
        <h2>Your Stack Size:</h2>
        <h6>100</h6>
        <h2>Pot Size: {this.props.potSize}</h2>
        <form>
        <h2>Player {this.props.playerTurn} act</h2>
        <div class="form-section">
          <button type="button" name="check">Check</button>
          <button type="button" name="call">Call</button>
          <div >
            <label for="raise">Raise</label>
            <input type="number" name="amount" placeholder="12" />
          </div>
        </div>
        </form>
      </div>
    );
  }
}

export default PlayerDecision;
