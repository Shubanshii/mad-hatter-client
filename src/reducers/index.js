// import {CHECK, CALL, BET, RAISE, FOLD, UPDATE_MODE, INCREASE_STACK_SIZE, DECREASE_STACK_SIZE, INCREASE_POT_SIZE, DECREASE_POT_SIZE,
//   ROTATE_PLAYER, ROTATE_ROUND, END_HAND, ROTATE_DEALER} as actions from '../actions';
  import * as actions from '../actions';
console.log(actions);
  const initialState = {
      playerCount: 2,
      mode: 'Small Blind',
      headsUp: true,
      playerInfo: [
        {
          name: 'Player 1',
          stackSize: 100,
          inHand: true,
          playerTurn: true,
          playerIndex: 0
        },
        {
          name: 'Player 2',
          stackSize: 100,
          inHand: true,
          playerTurn: false,
          playerIndex: 1
        }
      ],
      potSize: 0,
      position: "Dealer",
      dealer: 'Player 1',
      // playerTurn: 'Player 1',
      round: 'Pre-Flop'
  };

  export const hatterReducer = (state=initialState, action) => {
      if (action.type === actions.CHECK) {
        console.log(action.playerIndex);
        if(action.playerIndex < state.playerInfo.length) {
          let newIndex = action.playerIndex + 1;
          console.log(newIndex);
          return Object.assign({}, state, {
            // playerInfo[action.playerIndex].playerTurn: false,
            // playerInfo[newIndex].playerTurn: true

            playerInfo: state.playerInfo.map(player => {
              console.log(player);
              if(player.playerIndex === action.playerIndex) {
                player.playerTurn = false;
              }
              console.log(player);
              return player;
            })

          });
        }
      //   return Object.assign({}, state, {
      //     items: [...state.items, action.item]
      // });
          // return newState;
     }
      // else if (action.type === actions.CALL) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.BET) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.RAISE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.FOLD) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.UPDATE_MODE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.INCREASE_STACK_SIZE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.DECREASE_STACK_SIZE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.INCREASE_POT_SIZE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.DECREASE_POT_SIZE) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.ROTATE_PLAYER) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.ROTATE_ROUND) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.END_HAND) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      // else if (action.type === actions.ROTATE_DEALER) {
      //     // ... do something to generate new state
      //     // return newState;
      // }
      return state;
  };
