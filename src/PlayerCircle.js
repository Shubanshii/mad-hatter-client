import React, { Component } from 'react';
import {connect} from 'react-redux';

export class PlayerCircle extends Component {
  render() {
    // console.log(this.props.stackSizes);
    return (
      <div className="App">
        <ul className='circle-container'>
          <li>
            <h3>Player 1</h3>
            <h5>{this.props.playerInfo[0].stackSize}</h5>

          </li>
          <li>
            <h3>Player 2</h3>
            <h5>{this.props.playerInfo[1].stackSize}</h5>

          </li>
        </ul>
      </div>
    );
  }
}


PlayerCircle.defaultProps = {
    // title: 'Board'
};

const mapStateToProps = state => ({
  playerInfo: state.playerInfo
});

export default connect(mapStateToProps)(PlayerCircle);
