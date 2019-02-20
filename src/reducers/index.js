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
      inHand: [],
      streets: ['Preflop', 'Flop', 'Turn', 'River'],
      street: 'Preflop',
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
    function handleBeginGame() {
      console.log('working');
        state.playerInfo.forEach(player => {

            modifiedState.inHand.push({id: player.id});

        })
      console.log('inhandpushtest', modifiedState.inHand);
      modifiedState.potSize += (state.maxBuyIn/100) + (state.maxBuyIn/200);
      modifiedState.playerInfo = state.playerInfo.map(player => {
        // console.log(player);
        if(player.smallBlind === true) {
          player.stackSize -= (state.maxBuyIn/200);
          // return player
        }
        else if (player.bigBlind === true) {
          player.stackSize -= (state.maxBuyIn/100);
          // return player;
        }
        return player;
      });
    }

    let mustDeclareWinner = false;
    let winner;
    function declareWinner() {
      winner = prompt('Enter number of winner');
      winner = parseInt(winner, 10);
      let foundWinner = state.inHand.find(player => {
        return player.id === winner;
      });

      console.log(foundWinner);
      if(foundWinner === undefined) {
        alert('Player not in hand');
        declareWinner()
      }
    }
    function rewardWinner(winner) {
      console.log('rewardwinner', winner);
      modifiedState.playerInfo = state.playerInfo.map(player => {
        if (player.id === winner) {
          player.stackSize += modifiedState.potSize;
        }
        return player;
      })
    }
    switch (action.type) {
      case actions.BEGIN_GAME:
        handleBeginGame();
        // console.log('working');
        //   state.playerInfo.forEach(player => {
        //
        //       modifiedState.inHand.push({id: player.id});
        //
        //   })
        // console.log('inhandpushtest', modifiedState.inHand);
        // modifiedState.potSize += (state.maxBuyIn/100) + (state.maxBuyIn/200);
        // modifiedState.playerInfo = state.playerInfo.map(player => {
        //   // console.log(player);
        //   if(player.smallBlind === true) {
        //     player.stackSize -= (state.maxBuyIn/200);
        //     // return player
        //   }
        //   else if (player.bigBlind === true) {
        //     player.stackSize -= (state.maxBuyIn/100);
        //     // return player;
        //   }
        //   return player;
        // });
        break;
      case actions.FOLD:
          if(!state.raised && state.street !== "Preflop" ) {
            alert("Can't fold unless facing a raise or a bet.");
          }
          else if (state.headsUp) {
            if (state.street === "Preflop"){
              state.playerInfo.forEach(player => {

                if((!player.playerTurn && player.bigBlind && !state.raised) || (!player.playerTurn && player.smallBlind && state.raised) ) {

                  console.log(player.id);
                  modifiedState.inHand = state.inHand.filter(item => player.id === item.id);
                  modifiedState.playerInfo = state.playerInfo.map(player => {
                    if (player.playerTurn) {
                      player.playerTurn = false;
                    }
                    return player;
                  })
                }
                else if (!player.playerTurn && !player.bigBlind && !state.raised) {
                  alert("Can't fold");

                }
              });
              if(modifiedState.inHand.length === 1) {
                modifiedState.handIndex++;
                // heads up logic
                // small blind folds heads up preflop

                  modifiedState.playerInfo = state.playerInfo.map(player => {
                    if(player.id === modifiedState.inHand[0].id) {
                      player.stackSize += state.potSize;
                    }
                    if(player.smallBlind) {
                      player.smallBlind = false;
                      player.bigBlind = true;
                      player.stackSize -= state.maxBuyIn/100;
                    }
                    else if (player.bigBlind) {
                      player.smallBlind = true;
                      player.playerTurn = true;
                      player.bigBlind = false;
                      player.stackSize -= state.maxBuyIn/200;
                    }
                    return player;
                  });
                  modifiedState.potSize = (state.maxBuyIn/100) + (state.maxBuyIn/200);

                alert('Next hand.  Blinds Placed')
              }
            }
          }
          break;
        case actions.CHECK:
            // can't check when small blind or dealer preflop heads up.  can only complete
            if(state.raised) {
              alert("Can't check here");
            }
            else if (state.headsUp === true && state.raised === false && state.street === "Preflop") {
              for (var i = 0; i<state.playerInfo.length; i++) {
                if(state.playerInfo[i].smallBlind && state.playerInfo[i].playerTurn) {
                  alert("Can't check here");
                }
                // Big Blind checks preflop
                else if (state.playerInfo[i].bigBlind && state.playerInfo[i].playerTurn) {
                  // console.log('checking');
                  modifiedState.street = "Flop";
                }
                 //else {
                  // preflop heads up big blind checks
                //  console.log('checking');
                 // if (state.street === 'Preflop' && state.toPlay = state.maxBuyIn/100) {
                 //    for(var i = 0 ; i < state.playerInfo.length; i++) {
                 //      if (state.playerInfo[i].bigBlind) {
                 //        modifiedState.street = 'Flop';
                 //      }
                 //    }
                 //  }
                //}
              }
            }
            break;
        case actions.CALL:
            // small blind calls heads up

            //let playerInfo = state.playerInfo;
            if(state.headsUp) {
              if(state.street === 'Preflop') {
                if (!state.raised) {
                  modifiedState.playerInfo = state.playerInfo.map(player => {
                    if(player.playerTurn && player.smallBlind) {
                      player.playerTurn = false;
                      player.stackSize -= (state.maxBuyIn/200);
                      modifiedState.potSize += (state.maxBuyIn/200);
                    }
                    else if(player.playerTurn && player.bigBlind) {
                      alert("Can't call")
                    }
                    else if (!player.playerTurn && player.bigBlind) {
                      player.playerTurn = true;
                    }
                    return player;
                  })
                } else {
                  // big blind calls raise heads up
                  console.log('statetoplay', state.toPlay);
                  modifiedState.playerInfo = state.playerInfo.map(player => {
                    if (player.playerTurn) {
                      player.stackSize -= (state.toPlay - (state.maxBuyIn/100));
                    }
                    return player;
                  })
                  modifiedState.potSize += (state.toPlay - (state.maxBuyIn/100));
                  modifiedState.street = "Flop";
                  modifiedState.playerInfo.forEach(player => {
                    if(player.stackSize === 0) {
                      mustDeclareWinner = true;
                    }
                    console.log('calleachplayer', player);
                  })
                  if(mustDeclareWinner) {
                    // function declareWinner() {
                    //   winner = prompt('Enter number of winner');
                    //   winner = parseInt(winner, 10);
                    // }
                    // function rewardWinner(winner) {
                    //   console.log('rewardwinner', winner);
                    //   modifiedState.playerInfo = state.playerInfo.map(player => {
                    //     if (player.id === winner) {
                    //       player.stackSize += modifiedState.potSize;
                    //     }
                    //     return player;
                    //   })
                    // }
                    declareWinner();
                    // let foundWinner = state.inHand.find(player => {
                    //   return player.id === winner;
                    // });
                    //
                    // console.log(foundWinner);
                    // if(foundWinner === undefined) {
                    //   alert('Player not in hand');
                    //   declareWinner()
                    // }
                    for(i = 0; i<state.inHand.length; i++) {

                      if (state.inHand[i].id === winner) {
                        rewardWinner(winner);
                      }
                    }
                    // if(winner > state.playerInfo.length) {
                    //
                    // }
                  }
                }
              }

            }

            console.log(modifiedState);
            break;
          case actions.RAISE:
                //                modifiedState.toPlay = action.amount; need to plug this in somewhere
                if(action.amount < (state.toPlay * 2)) {
                  alert("Must raise at least twice the big blind or twice the" +
                  " bet or raise.");
                }
                if(action.amount >= (state.toPlay * 2)) {
                  console.log('raising');
                  //raise from small blind heads up
                  let pF = state.street === 'Preflop';
                  let unraised = !state.raised;
                  if(state.headsUp) {
                    for (i=0; i<state.playerInfo.length; i++) {
                      if(unraised) {
                        if(pF) {
                          if(state.playerInfo[i].playerTurn && state.playerInfo[i].smallBlind) {
                            if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/200) >= 0) {
                              modifiedState.toPlay = action.amount
                              modifiedState.potSize += (action.amount - state.maxBuyIn/200);
                            } else {
                              alert('Not enough funds');
                            }

                          } else if(state.playerInfo[i].playerTurn && state.playerInfo[i].bigBlind) {
                            if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
                              modifiedState.toPlay = action.amount
                              modifiedState.potSize += (action.amount - state.maxBuyIn/100);
                            } else {
                              alert('Not enough funds');
                            }
                          }
                        }
                      }
                    }
                    if(unraised) {
                      if(pF) {
                        modifiedState.playerInfo = state.playerInfo.map(player => {
                          if(player.playerTurn && player.smallBlind) {
                            if(player.stackSize - (action.amount - state.maxBuyIn/200) >= 0) {
                              player.playerTurn = false;
                              modifiedState.raised = true;
                              player.stackSize -= (action.amount - state.maxBuyIn/200);
                            }
                          }
                          else if(player.playerTurn && player.bigBlind) {
                            if(player.stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
                              player.playerTurn = false;
                              modifiedState.raised = true;
                              player.stackSize -= (action.amount - state.maxBuyIn/100);
                            }
                          }
                          else if (!player.playerTurn && modifiedState.raised) {
                            player.playerTurn = true;
                          }
                          return player;
                        })
                      }
                    }

                  }

                }

    }


      return modifiedState;
  };
