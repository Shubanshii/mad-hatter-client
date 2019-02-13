import React, { Component } from 'react';

class NewGame extends Component {
  render() {
    return (
      <div className="App">
      <form id="record-dream">
          <div className="form-section">
            <label htmlFor="table-name">Table Name</label>
            <input type="text" name="table-name" placeholder="DeNiro's Dragon" required />
          </div>
          <div className="form-section">
            <label htmlFor="table-password">Table Password</label>
            <input type="text" name="table-password" placeholder="Must be at least 12 characters" required />
          </div>
          <div className="player-count-container" class="form-section">
            <label htmlFor="max-players">Maximum # of players</label>
            <input type="number" name="max-players" placeholder="12" />
          </div>
          <div className="big-blind-container" class="form-section">
            <label htmlFor="big-blind">Amount of Big Blind</label>
            <input type="number" name="big-blind-amount" placeholder="1" />
          </div>
          <button type="submit">Submit</button>
          <button type="reset">Reset</button>
        </form>

      </div>
    );
  }
}

export default NewGame;
