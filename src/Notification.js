import React, { Component } from 'react';
import {connect} from 'react-redux';
import {nextHand} from './actions';

export class Notification extends Component {
  // componentDidMount() {
  //   let inHandCount = 0;
  //   for (var i = 0; i < this.props.playerInfo.length; i++) {
  //     if(this.props.playerInfo[i].inHand === true) {
  //       inHandCount++;
  //     }
  //   }
  //   if(inHandCount === 1) {
  //     this.props.dispatch(nextHand());
  //   }
  // }

  render() {


    // const player = this.props.playerInfo.find(player => player.playerTurn === true);
    // console.log(this.props.playerInfo);
    // console.log('playerturn', player.name);
    return (
      <div className="App">
        <h3>Hand: {this.props.handIndex}</h3>
        <h3>Street: {this.props.street}</h3>
        {/*<h3>Turn: {player.name}</h3>*/}
        <h3>Decision: </h3>
      </div>
    );
  }
}

Notification.defaultProps = {
    // title: 'Board'
};

const mapStateToProps = state => ({
  street: state.street,
  handIndex: state.handIndex,
  playerInfo: state.playerInfo
});

export default connect(mapStateToProps)(Notification);
