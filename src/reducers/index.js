// import {CHECK, CALL, BET, RAISE, FOLD, UPDATE_MODE, INCREASE_STACK_SIZE, DECREASE_STACK_SIZE, INCREASE_POT_SIZE, DECREASE_POT_SIZE,
//   ROTATE_PLAYER, ROTATE_ROUND, END_HAND, ROTATE_DEALER} as actions from '../actions';
  import * as actions from '../actions';
  const initialState = {
      playerCount: 2,
      toPlay: 1,
      // mode: 'Small Blind',
      raised: false,
      headsUp: true,
      streets: ['Preflop', 'Flop', 'Turn', 'River'],
      street: 'Preflop',
      playerInfo: [
        {
          name: 'Player 1',
          stackSize: 100,
          inHand: true,
          playerTurn: true,
          playerIndex: 0,
          smallBlind: true,
          bigBlind: false
        },
        {
          name: 'Player 2',
          stackSize: 100,
          inHand: true,
          playerTurn: false,
          playerIndex: 1,
          smallBlind: false,
          bigBlind: true
        }
      ],
      potSize: 0,
      // we'll figure out how to add more positions later
      positions: ["Dealer", "Big Blind"],
      position: "Dealer",
      dealer: 'Player 1',
      maxBuyIn: 100
      // playerTurn: 'Player 1',
  };

  // only for heads up dealer preflop right now
  export const hatterReducer = (state=initialState, action) => {
    if (action.type === actions.BEGIN_GAME) {
      let newState = state;
      newState.playerInfo[0].stackSize = newState.playerInfo[0].stackSize - .5;
      newState.playerInfo[1].stackSize = newState.playerInfo[1].stackSize - 1;
      newState.potSize = 1.5;
      return Object.assign({}, state, {
        newState
      });

    }
      else if(action.type === actions.BEGIN_HAND) {
        console.log('Begin hand working');
        console.log('begin hand state', state);
      }
      else if (action.type === actions.CHECK) {
        // can't check when small blind or dealer preflop heads up.  can only complete
        if (state.headsUp === true && state.raised === false && state.position === 'Dealer' ) {
          console.log('Game is broken');
        } else {
          let newIndex = action.playerIndex + 1;

          return Object.assign({}, state, {
            // playerInfo[action.playerIndex].playerTurn: false,
            // playerInfo[newIndex].playerTurn: true

            playerInfo: state.playerInfo.map(player => {
              console.log(player);
              if(player.playerIndex === action.playerIndex) {
                player.playerTurn = false;
              }
              else if (player.playerIndex === newIndex) {
                player.playerTurn = true;
              }
              // console.log(player);
              return player;
            }),
            position: state.positions[newIndex]
          });
        }

     }
      else if (action.type === actions.CALL) {
        if (state.headsUp === true && state.raised === false && state.position === 'Dealer' ) {
          let newIndex = action.playerIndex + 1;

            return Object.assign({}, state, {

              playerInfo: state.playerInfo.map(player => {
                console.log(player);
                if(player.playerIndex === action.playerIndex) {
                  player.playerTurn = false;
                  player.stackSize = player.stackSize - (state.maxBuyIn/200);
                }
                else if (player.playerIndex === newIndex) {
                  player.playerTurn = true;
                }
                return player;
              }),
              position: state.positions[newIndex]
            });
        }
      }
      else if (action.type === actions.FOLD) {
        console.log('fold working');
        // console.log(action.playerIndex);
        // return Object.assign({}, state, {
        //   playerInfo: state.playerInfo.forEach(player => {
        //     if (player.playerTurn === true) {
        //       player.playerTurn = false;
        //     }
        //   })
        // });
        // if (state.headsUp === true && state.raised === false && state.position === 'Dealer' ) {
        //   let newIndex = action.playerIndex + 1;
        //     return Object.assign({}, state, {
        //
        //       playerInfo: state.playerInfo.map(player => {
        //         // console.log(player);
        //         if(player.playerIndex === action.playerIndex) {
        //           player.playerTurn = false;
        //         }
        //         else if (player.playerIndex === newIndex) {
        //           player.playerTurn = true;
        //           // player.stackSize = player.stackSize + (state.maxBuyIn / 200);
        //           player.stackSize = player.stackSize + state.potSize;
        //
        //         }
        //         console.log(state);
        //         return player;
        //       }),
        //       position: state.positions[newIndex]
        //     });
        //   }
      }
      else if (action.type === actions.RAISE) {
          // console.log('index', action.playerIndex);
          // console.log('amount', action.amount);
          if(action.amount < (state.toPlay * 2)) {
            console.log("Must raise at least twice the big blind or twice the" +
            "bet or raise.");
          }
          if (state.headsUp === true && state.raised === false && state.position === 'Dealer' ) {
            let newIndex = action.playerIndex + 1;

              return Object.assign({}, state, {

                playerInfo: state.playerInfo.map(player => {
                  console.log(player);
                  if(player.playerIndex === action.playerIndex) {
                    state.toPlay = action.amount;
                    player.stackSize = player.stackSize - action.amount;
                    player.playerTurn = false;
                  }
                  else if (player.playerIndex === newIndex) {
                    player.playerTurn = true;
                  }
                  return player;
                }),
                position: state.positions[newIndex]
              });
          }
      }
      // else if (action.type === actions.BET) {
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
