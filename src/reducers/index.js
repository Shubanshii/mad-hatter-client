// import {CHECK, CALL, BET, RAISE, FOLD, UPDATE_MODE, INCREASE_STACK_SIZE, DECREASE_STACK_SIZE, INCREASE_POT_SIZE, DECREASE_POT_SIZE,
//   ROTATE_PLAYER, ROTATE_ROUND, END_HAND, ROTATE_DEALER} as actions from '../actions';
  import * as actions from '../actions';
  const initialState = {
      playerCount: 2,
      toPlay: 1,
      handIndex: 1,
      handOver: false,
      // mode: 'Small Blind',
      raised: false,
      headsUp: true,
      streets: ['Preflop', 'Flop', 'Turn', 'River'],
      street: 'Preflop',
      // currentHand: [
      //   {
      //
      //   }
      // ],
      playerInfo: [
        {
          id: 1,
          name: 'Player 1',
          stackSize: 100,
          inHand: true,
          playerTurn: true,
          playerIndex: 0,
          smallBlind: true,
          bigBlind: false
        },
        {
          id: 2,
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
    let modifiedState = Object.assign({}, state, {});
    if (action.type === actions.BEGIN_GAME) {
      console.log('working');

      modifiedState.potSize += (state.maxBuyIn/100) + (state.maxBuyIn/200);
      modifiedState.playerInfo = state.playerInfo.map(player => {
        // console.log(player);
        if(player.smallBlind === true) {
          player.stackSize -= (state.maxBuyIn/200);
          return player;
        }
        else if (player.bigBlind === true) {
          player.stackSize -= (state.maxBuyIn/100);
          return player;
        }
      });

      // return Object.assign({}, state, {
      //   ...state,
        // playerInfo: state.playerInfo.map(player => {
        //   console.log(player);
        //   if(player.smallBlind === true) {
        //     player.stackSize -= (state.maxBuyIn/200);
        //     return player;
        //   }
        //   else if (player.bigBlind === true) {
        //     player.stackSize -= (state.maxBuyIn/100);
        //     return player;
        //   }
        // }),
      //   potSize: (state.maxBuyIn/200) + (state.maxBuyIn/100)
      // })
    }
      else if(action.type === actions.BEGIN_HAND) {
        modifiedState.handIndex++;
        console.log('Begin hand working');
        console.log('begin hand state', action.playerInfo);
        modifiedState.playerInfo = action.playerInfo;
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
        // let inHandCount = 0;
        //
        // for (var i = 0; i < state.playerInfo.length; i++) {
        //   if(state.playerInfo[i].inHand === true) {
        //     inHandCount++;
        //   }
        // }
        // console.log(inHandCount);
        // if(inHandCount === 2) {
        //   console.log('heads up fold working');
        //   modifiedState.playerInfo = state.playerInfo.map(player => {
        //     if(player.playerTurn === true) {
        //       player.playerTurn = false;
        //       player.inHand = false;
        //       inHandCount--;
        //     }
        //     else if(player.playerTurn === false && player.inHand === true && inHandCount === 1) {
        //       player.stackSize += state.potSize;
        //     }
        //     return player;
        //   });
        //
        //   if(inHandCount === 1) {
        //     modifiedState.handOver = true;
        //
        //
        //   }
        // }
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
      return modifiedState;
  };
