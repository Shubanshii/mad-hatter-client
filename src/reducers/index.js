// import {CHECK, CALL, BET, RAISE, FOLD, UPDATE_MODE, INCREASE_STACK_SIZE, DECREASE_STACK_SIZE, INCREASE_POT_SIZE, DECREASE_POT_SIZE,
//   ROTATE_PLAYER, ROTATE_ROUND, END_HAND, ROTATE_DEALER} as actions from '../actions';
  import * as actions from '../actions';
  const initialState = {
      playerCount: 2,
      toPlay: 1,
      amountRaised: 0,
      currentRaise: 0,
      toCall: 1,
      completed: false,
      preFlopThreeBet: false,
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
          bigBlind: false,
          contributedTowardsToPlay: 0
        },
        {
          id: 2,
          name: 'Player 2',
          stackSize: 100,
          inHand: true,
          playerTurn: false,
          playerIndex: 1,
          smallBlind: false,
          bigBlind: true,
          contributedTowardsToPlay: 0
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
    let mustDeclareWinner = false;
    let winner;
    let toAdd = 0;
    let currentContribution = 0;
    let amount = 0;
    let smallBlind = state.maxBuyIn / 200;
    let bigBlind = state.maxBuyIn / 100;

    function addAllPlayersToHand() {
      modifiedState.inHand = [];
      modifiedState.playerInfo = state.playerInfo.map(player => {
        player.inHand = true;
        return player;
      })
      state.playerInfo.forEach(player => {
          if(player.inHand) {
            modifiedState.inHand.push({id: player.id});
          }

      })
    }

    function handleBeginGame() {
      addAllPlayersToHand();
      // console.log('working');
      //   state.playerInfo.forEach(player => {
      //       if(player.inHand) {
      //         modifiedState.inHand.push({id: player.id});
      //       }
      //
      //   })
      console.log('inhandpushtest', modifiedState.inHand);
      modifiedState.potSize += (state.maxBuyIn/100) + (state.maxBuyIn/200);
      modifiedState.playerInfo = state.playerInfo.map(player => {
        // console.log(player);
        if(player.smallBlind === true) {
          player.stackSize -= (state.maxBuyIn/200);
          player.contributedTowardsToPlay += state.maxBuyIn/200;
          // return player
        }
        else if (player.bigBlind === true) {
          player.stackSize -= (state.maxBuyIn/100);
          player.contributedTowardsToPlay += state.maxBuyIn/100;
        }
        return player;
      });
    }

    function setUpNextHand() {
      modifiedState.handIndex++;
      addAllPlayersToHand();
      switchBlinds();
      modifiedState.potSize = (state.maxBuyIn/100) + (state.maxBuyIn/200);
      alert('Next hand.  Blinds Placed');
    }

    function switchTurns() {
      modifiedState.playerInfo = modifiedState.playerInfo.map(player => {
        if(player.playerTurn) {
          player.playerTurn = false;
        }else {
          player.playerTurn = true;
        }
        return player;
      });
    }

    function incrementStreet() {
      modifiedState.street = "Flop";
      modifiedState.playerInfo = state.playerInfo.map(player => {
        if(player.smallBlind) {
          player.playerTurn = false;
        } else if (player.bigBlind) {
          player.playerTurn = true;
        }
        return player;
      })
    }

    function switchBlinds() {
      modifiedState.playerInfo = modifiedState.playerInfo.map(player => {
        //switch big and small blind and subtract blinds from stacks and add player to hand
        if(player.smallBlind) {
          player.smallBlind = false;
          player.bigBlind = true;
          player.inHand = true;
          player.stackSize -= (state.maxBuyIn / 100);
          player.contributedTowardsToPlay = state.maxBuyIn/100;

        }
        else if (player.bigBlind) {
          player.smallBlind = true;
          player.playerTurn = true;
          player.bigBlind = false;
          player.inHand = true;
          player.stackSize -= (state.maxBuyIn / 200);
          player.contributedTowardsToPlay = state.maxBuyIn/200;

        }
        return player;
      })
    }

    function addToPot(amount) {
      modifiedState.potSize += amount;
    }

    function removeFromStack(player, amount) {
      player.stackSize -= amount;
      // modifiedState.playerInfo = state.playerInfo.map(player => {
      //   if (player.playerTurn && player.smallBlind) {
      //     player.stackSize -= amount;
      //   }
      //   return player;
      // })
    }

    function handleRemoveFoldedPlayer(players) {
      console.log(players);
      modifiedState.inHand = [];
      console.log(modifiedState.inHand);
      players.forEach(player => {
        if(player.inHand) {
          modifiedState.inHand.push({id: player.id});
        }
      })
      console.log(modifiedState.inHand);
    }

    function removeFoldedPlayer() {
      modifiedState.playerInfo = state.playerInfo.map(player => {
        if(player.playerTurn) {
          player.playerTurn = false;
          player.inHand = false;
        }
        return player;
      });
      handleRemoveFoldedPlayer(modifiedState.playerInfo);

      // state.playerInfo.forEach(player => {
      //   // name variables for below as if i were narrating
      //   modifiedState.inHand.push()
      //   // if((!player.playerTurn && player.bigBlind && !state.raised) || (!player.playerTurn && player.smallBlind && state.raised) ) {
      //   //
      //   //   console.log(player.id);
      //   //   modifiedState.inHand = state.inHand.filter(item => player.id === item.id);
      //   //   modifiedState.playerInfo = state.playerInfo.map(player => {
      //   //     if (player.playerTurn) {
      //   //       player.playerTurn = false;
      //   //     }
      //   //     return player;
      //   //   })
      //   // }
      //   else if (!player.playerTurn && !player.bigBlind && !state.raised) {
      //     alert("Can't fold");
      //
      //   }
      // });
    }

    function handleFold() {
      if(!state.raised && state.street !== "Preflop" ) {
        alert("Can't fold unless facing a raise or a bet.");
      }
      else if (state.headsUp) {
        if (state.street === "Preflop"){
          // this will only work for heads up
          // try resetting emptying modifiedState.inHand and pushing players how did not fold
          removeFoldedPlayer();
          // state.playerInfo.forEach(player => {
          //   // name variables for below as if i were narrating
          //   if((!player.playerTurn && player.bigBlind && !state.raised) || (!player.playerTurn && player.smallBlind && state.raised) ) {
          //
          //     console.log(player.id);
          //     modifiedState.inHand = state.inHand.filter(item => player.id === item.id);
          //     modifiedState.playerInfo = state.playerInfo.map(player => {
          //       if (player.playerTurn) {
          //         player.playerTurn = false;
          //       }
          //       return player;
          //     })
          //   }
          //   else if (!player.playerTurn && !player.bigBlind && !state.raised) {
          //     alert("Can't fold");
          //
          //   }
          // });
          if(modifiedState.inHand.length === 1) {
            // modifiedState.handIndex++;
            // heads up logic
            // small blind folds heads up preflop
            // set id of winner
            winner = modifiedState.inHand[0].id
            //pass id of winner to reward winner
            rewardWinner(winner);
            // this is heads up so blinds will be switched instead of rotated
            // switchBlinds();
              // modifiedState.playerInfo = state.playerInfo.map(player => {

              //   if(player.smallBlind) {
              //     player.smallBlind = false;
              //     player.bigBlind = true;
              //     player.stackSize -= state.maxBuyIn/100;
              //   }
              //   else if (player.bigBlind) {
              //     player.smallBlind = true;
              //     player.playerTurn = true;
              //     player.bigBlind = false;
              //     player.stackSize -= state.maxBuyIn/200;
              //   }
              //   return player;
              // });
              // modifiedState.potSize = (state.maxBuyIn/100) + (state.maxBuyIn/200);
              // addAllPlayersToHand();
              setUpNextHand();

            // alert('Next hand.  Blinds Placed')
          }
        }
      }
    }

    function smallBlindCompletes() {
      addToPot(smallBlind);
      modifiedState.playerInfo = state.playerInfo.map(player => {
        if(player.playerTurn && player.smallBlind) {
          removeFromStack(player, smallBlind);

        }
        return player;
      })
      switchTurns();
      modifiedState.completed = true;
      // modifiedState.playerInfo = state.playerInfo.map(player => {
      //   if(player.playerTurn && player.smallBlind) {
      //     player.playerTurn = false;
      //     // player.stackSize -= (state.maxBuyIn/200);
      //     modifiedState.potSize += (state.maxBuyIn/200);
      //     player.contributedTowardsToPlay += (state.maxBuyIn/200);
      //   }
      //   else if(player.playerTurn && player.bigBlind) {
      //     alert("Can't call")
      //   }
      //   else if (!player.playerTurn && player.bigBlind) {
      //     player.playerTurn = true;
      //   }
      //   return player;
      // })
    }

    function handleCall() {
      // small blind calls heads up
      let callAmount = 0;
      let allInRefund = 0;
      //let playerInfo = state.playerInfo;
      if(state.headsUp) {
        if(state.street === 'Preflop') {
          if (!state.raised) {
            if(!state.completed) {
              smallBlindCompletes();
            }
            else {
              alert("Can't call here.  Check or raise.")
            }
          } else {
            // big blind calls raise heads up

            console.log('statetoplay', state.toPlay);
            modifiedState.playerInfo = state.playerInfo.map(player => {

              if(player.playerTurn) {
                if(player.stackSize - (state.toPlay - player.contributedTowardsToPlay) >= 0) {
                  amount = state.toPlay - player.contributedTowardsToPlay;
                  removeFromStack(player, amount);
                  // player.stackSize -= state.toPlay - player.contributedTowardsToPlay;
                  // player.contributedTowardsToPlay += (state.toPlay - (state.maxBuyIn/100));
                  // callAmount = (state.toPlay - (state.maxBuyIn/100));
                  // callAmount = (state.toPlay - (state.maxBuyIn/100));
                  player.contributedTowardsToPlay = state.toPlay;

                  console.log('contributedtowards', player.contributedTowardsToPlay);
                }
                else {
                  allInRefund = (state.toPlay - player.contributedTowardsToPlay) - player.stackSize;
                  console.log('allinrefund', allInRefund);
                  callAmount = player.stackSize
                  player.stackSize = 0;
                }
              }
              return player;
            })
            modifiedState.playerInfo.forEach(player => {
              if(!player.playerTurn) {
                player.stackSize += allInRefund;
              }
            })
            // substitute this with callamount.
            //modifiedState.potSize += (state.toPlay - (state.maxBuyIn/100));
            // modifiedState.potSize += (callAmount - allInRefund);
            addToPot(amount - allInRefund);
            // modifiedState.street = "Flop";
            incrementStreet();
            modifiedState.playerInfo.forEach(player => {
              if(player.stackSize === 0) {
                mustDeclareWinner = true;
              }
              console.log('calleachplayer', player);
            })
            if(mustDeclareWinner) {

              declareWinner();

              for(i = 0; i<state.inHand.length; i++) {

                if (state.inHand[i].id === winner) {
                  rewardWinner(winner);
                }
                if(modifiedState.playerInfo[i].stackSize === 0) {
                  alert('Game over.');
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
    }

    function smallBlindOpenRaises() {
      if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/200) >= 0) {

        modifiedState.amountRaised = amount - modifiedState.toPlay;
        console.log('amountraised', modifiedState.amountRaised);
        modifiedState.toPlay = amount;
        console.log('toplay', modifiedState.toPlay);
        modifiedState.potSize += (amount - state.maxBuyIn/200);
        modifiedState.preFlopThreeBet = true;
        //Repeating yourself here.  add smallblind to func as an arg
        modifiedState.playerInfo = state.playerInfo.map(player => {
          if(player.smallBlind && player.playerTurn) {
            player.contributedTowardsToPlay = amount;
          }
          return player;
        })
      } else {
        alert('Not enough funds');
      }
    }

    function bigBlindOpenRaises() {
      if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
        modifiedState.amountRaised = amount - modifiedState.toPlay;
        console.log('amountraised', modifiedState.amountRaised);
        modifiedState.toPlay = amount;
        console.log('toplay', modifiedState.toPlay);
        modifiedState.potSize += (amount - state.maxBuyIn/100);
        modifiedState.preFlopThreeBet = true;
        //repeating yourself same as above.  maybe a function for both
        // small and big in this scenario of adding to contributedTowardsToPlay
        // is in order
        modifiedState.playerInfo = state.playerInfo.map(player => {
          if(player.bigBlind && player.playerTurn) {
            player.contributedTowardsToPlay = amount;
          }
          return player;
        })
      } else {
        alert('Not enough funds');
      }
    }

    function preFlopThreeBetAdd() {
      state.playerInfo.forEach(player => {
        if(player.playerTurn) {
          currentContribution = player.contributedTowardsToPlay;
        }
      });
      console.log('currentcontribution', currentContribution);
      //if(action.amount >= state.toPlay * 2 - 1) {
      toAdd = modifiedState.toPlay - currentContribution;
      modifiedState.potSize += toAdd;
      //}
    }

    function preFlopThreeBetSubtract() {
      modifiedState.playerInfo = state.playerInfo.map(player => {
        if (player.playerTurn) {
          player.stackSize -= toAdd;
        }
        return player;
      })
    }

    function preFlopThreeBet() {
      // add money to pot
      modifiedState.amountRaised = amount - modifiedState.toPlay;
      modifiedState.toPlay = amount;

      console.log('toplay3bet', modifiedState.toPlay);
      preFlopThreeBetAdd();
      preFlopThreeBetSubtract();
      modifiedState.playerInfo = modifiedState.playerInfo.map(player => {
        if(player.playerTurn) {
          player.contributedTowardsToPlay = amount;
        }
        return player;
      })
      console.log(modifiedState);
      switchTurns();
    }

    function handleRaise() {
      // modifiedState.toPlay = action.amount; need to plug this in somewhere
      // repeating yourself
      amount = parseInt(action.amount, 10);
      let unraised = !state.raised;
      let pF = state.street === 'Preflop';

      //
      // if(!state.raised && action.amount < (state.toPlay * 2)) {
      //   alert("Must raise at least twice the big blind or twice the" +
      //   " bet or raise.");
      // } else if (state.raised && action.amount < (state.toPlay * 2 - 1)) {
      //   alert("Must raise at least twice the big blind or twice the" +
      //   " bet or raise.");
      // }
      if(pF) {
        if(unraised) {
          if(action.amount >= (state.toPlay * 2)) {
            console.log('raising');
            //raise from small blind heads up
            if(state.headsUp) {
              for (i=0; i<state.playerInfo.length; i++) {

                  if(pF) {
                    if(state.playerInfo[i].playerTurn && state.playerInfo[i].smallBlind) {
                      smallBlindOpenRaises();

                    } else if(state.playerInfo[i].playerTurn && state.playerInfo[i].bigBlind) {
                      bigBlindOpenRaises();
                    }
                  }
              }


                  modifiedState.playerInfo = state.playerInfo.map(player => {
                    if(player.playerTurn && player.smallBlind) {
                      if(player.stackSize - (action.amount - state.maxBuyIn/200) >= 0) {
                        // player.playerTurn = false;
                        // modifying element outside of array, probably not good
                        modifiedState.raised = true;
                        player.stackSize -= (action.amount - state.maxBuyIn/200);
                      }
                    }
                    else if(player.playerTurn && player.bigBlind) {
                      if(player.stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
                        // player.playerTurn = false;
                        modifiedState.raised = true;
                        player.stackSize -= (action.amount - state.maxBuyIn/100);
                      }
                    }
                    //instead use switch turn function
                    // else if (!player.playerTurn) {
                    //   player.playerTurn = true;
                    // }
                    return player;
                  })
                  switchTurns();
            }
          }
        }
        else if(!unraised && state.preFlopThreeBet) {
          preFlopThreeBet();
        }

      }

    }

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
          handleFold();

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
          handleCall();

            break;
          case actions.RAISE:
            handleRaise();
                // //                modifiedState.toPlay = action.amount; need to plug this in somewhere
                //
                // if(action.amount < (state.toPlay * 2)) {
                //   alert("Must raise at least twice the big blind or twice the" +
                //   " bet or raise.");
                // }
                // if(action.amount >= (state.toPlay * 2)) {
                //   console.log('raising');
                //   //raise from small blind heads up
                //   let pF = state.street === 'Preflop';
                //   let unraised = !state.raised;
                //   if(state.headsUp) {
                //     for (i=0; i<state.playerInfo.length; i++) {
                //       if(unraised) {
                //         if(pF) {
                //           if(state.playerInfo[i].playerTurn && state.playerInfo[i].smallBlind) {
                //             if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/200) >= 0) {
                //               modifiedState.toPlay = action.amount
                //               modifiedState.potSize += (action.amount - state.maxBuyIn/200);
                //             } else {
                //               alert('Not enough funds');
                //             }
                //
                //           } else if(state.playerInfo[i].playerTurn && state.playerInfo[i].bigBlind) {
                //             if(state.playerInfo[i].stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
                //               modifiedState.toPlay = action.amount
                //               modifiedState.potSize += (action.amount - state.maxBuyIn/100);
                //             } else {
                //               alert('Not enough funds');
                //             }
                //           }
                //         }
                //       }
                //     }
                //     if(unraised) {
                //       if(pF) {
                //         modifiedState.playerInfo = state.playerInfo.map(player => {
                //           if(player.playerTurn && player.smallBlind) {
                //             if(player.stackSize - (action.amount - state.maxBuyIn/200) >= 0) {
                //               player.playerTurn = false;
                //               modifiedState.raised = true;
                //               player.stackSize -= (action.amount - state.maxBuyIn/200);
                //             }
                //           }
                //           else if(player.playerTurn && player.bigBlind) {
                //             if(player.stackSize - (action.amount - state.maxBuyIn/100) >= 0) {
                //               player.playerTurn = false;
                //               modifiedState.raised = true;
                //               player.stackSize -= (action.amount - state.maxBuyIn/100);
                //             }
                //           }
                //           else if (!player.playerTurn && modifiedState.raised) {
                //             player.playerTurn = true;
                //           }
                //           return player;
                //         })
                //       }
                //     }
                //
                //   }
                //
                // }
                break;
                default:
                  console.log('No action chosen');
    }
      return modifiedState;
  };
