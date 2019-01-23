import React, { Component } from 'react';

class PlayerCircle extends Component {
  render() {
    return (
      <div className="App">
        <ul class='circle-container'>
          <li>
            <h3>Player 1</h3>
            <h5>100</h5>

          </li>
          <li>
            <h3>Player 2</h3>
            <h5>100</h5>
          </li>
        </ul>
      </div>
    );
  }
}

export default PlayerCircle;
