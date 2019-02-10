import React, { Component } from 'react';
import {connect} from 'react-redux';

export class Notification extends Component {
  render() {
    // const player = this.props.playerInfo.find(player => player.playerTurn === true);
    // console.log(this.props.playerInfo);
    // console.log('playerturn', player.name);
    return (
      <div className="App">
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
  street: state.street
});

export default connect(mapStateToProps)(Notification);
