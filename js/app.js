require('babel-polyfill');

'use strict';

window.soundEffects = {
  play: (path) => {
    const audio = new Audio(`./soundEffects/voices/${path}`);
    // const audio = new Audio('./soundEffects/voices/jasmin/i see u.m4a');
    // audio.volume = settings.hasMutedSound ? 0 : 1;
    audio.play();
  },
  playExplosionSound: () => {
    const audio = new Audio('./soundEffects/purchased/Mine Explosion 1.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  playShowBombSound: () => {
    const audio = new Audio('./soundEffects/showBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  playLineClickSound: () => {
    const audio = new Audio('./soundEffects/purchased/Balloon_Pop-by_YIO.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.1;
    audio.play();
  },
  playEraseBombSound: () => {
    const audio = new Audio('./soundEffects/eraseBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.4;
    audio.play();
  },
  playScoreSound: () => {
    const audio = new Audio('./soundEffects/purchased/Button Menu Application SFX 57.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.03;
    audio.play();
  },
  playWrongSound: () => {
    const audio = new Audio('./soundEffects/purchased/Wrong.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  runSpeaker: (audio) => {
    let hasCancelledMusic = false;
    const speaker = () => {
      if(settings.hasMutedMusic){
        hasCancelledMusic = true;
        return;
      };
      if(!hasCancelledMusic){
        gametask.addClassByQuerySelector(".title img", "big");
        setTimeout(() => {
          gametask.removeClassByQuerySelector(".title img", "big");
        }, 200)
      }
    }
    const timeOuts = [ 0, 434, 869, 1303, 1737, 1986, 2256 ];
    let count = 1;
    const run = () => {
      count++;
      if(count <= 17 && !on_game_board){
        timeOuts.forEach(time => {
          setTimeout(() => {speaker()}, time);
        })
        setTimeout(() => { run() }, 4340);
      }
    }
    run();
  },
  playBoardMusic: () => {
    if(settings.hasMutedMusic) return null;
    const audio = new Audio('./soundEffects/Song_Beat/Zazah beat 22.mp3');
    audio.volume = settings.hasMutedMusic ? 0 : 0.08;
    $(document).on("click", ".boardBackButton", () => {
      audio.currentTime = 0;
      audio.pause();
    });
    audio.play().then(() => {
      // playing music
      soundEffects.replayWhenDone(audio);
    }).catch(e => console.log(e));
  },
  replayWhenDone: (audio) => {
    audio.addEventListener('ended', function() {
        setTimeout(() => {
          this.currentTime = 0;
          this.play();
        }, 1000);
    }, false);
  },
  playMusicClicked: false,
  playGameMusic: () => {
    const clickFunction = playSong => {
      if(soundEffects.playMusicClicked) return null;

      let playVolume = 0.4;
      const audio = new Audio('./soundEffects/Song_Beat/ZazahBeatSlow.mp3');
      soundEffects.runSpeaker(audio);
      audio.volume = settings.hasMutedMusic ? 0 : playVolume;
      audio.play().then(() => {
        soundEffects.replayWhenDone(audio);
        // Video playback started ;)
        document.getElementById("gameScreen").removeEventListener("click",  clickFunction);
        $(document).on("click", ".mOptions.off", () => {
          audio.pause();
        });
        $(document).on("click", ".mOptions.on", () => {
          if(!settings.hasMutedMusic){
            audio.currentTime = 0;
            audio.volume = playVolume;
            soundEffects.runSpeaker();
            audio.play();
          }
        });
        // adjust volume on game play
        $(document).on("click", ".tipsText", () => {
          audio.pause();
          soundEffects.playBoardMusic();
        });
        $(document).on("click", ".tipsImages", () => {
          audio.pause();
          soundEffects.playBoardMusic();
        });
        $(document).on("click", ".boardBackButton", () => {
          audio.currentTime = 0;
          if(!settings.hasMutedMusic) audio.play();
        });
      })
      .catch(e => {
        // Video playback failed ;(
        console.log(e);
      });
    }
    document.getElementById("gameScreen").addEventListener("click",  clickFunction);
  }
}

window.lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {
    lineClickAction.removeLineClickHighlights();

    const height = gametask.getHeightWithClassName("box");
    const upperOutOfBoundsNumber = height - lineClickOffset;
    const lowerOutOfBoundsNumber = lineClickOffset;
    const meetsBombLayingConditions = gametask.isSelected() && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber);
    let hasMadeMove = false;
    // check to see if a line is clicked
    const isALineClicked = lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
    if (isALineClicked) {
      // the line thats clicked
      const lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
      // are we following the training rules
      const followingTrainingRulesIfAny = gametask.hasPassedTrainingRestriction(boxNumber, lineClicked);
      // prevent multiple click to the same border
      const lineIsAlreadyClick = boxInfo.hasClickBorderPreviously(boxNumber, lineClicked);
      // is the line click part of a lock box
      const isLockBoxLineClick = lineClickAction.isALockedBoxClick(boxNumber, lineClicked);
      hasMadeMove = true;
      // prevent the line if these conditions are met
      if(!followingTrainingRulesIfAny){
        return gametask.incorrectClick()
      }

      if(lineIsAlreadyClick){
        ui.showText("line is taken! chose another..");
        return gametask.incorrectClick()
      }

      if(isLockBoxLineClick){
        ui.showText("destroy the item to click this line!");
        return gametask.incorrectClick(boxNumber, lineClicked)
      }

      lineClickAction.clickOnBorder(boxNumber, lineClicked);
    } else if(meetsBombLayingConditions){
      // are we following the training rules
      const followingTrainingRulesIfAny = gametask.hasPassedTrainingRestriction(boxNumber, null);
      if(!followingTrainingRulesIfAny) return gametask.incorrectClick();
      // takeAnotherTurn = true;
      hasMadeMove = true;
      layedBomb = true;
      // show smoke when help enters the field
      ui.animateBombMovement(boxNumber);
      soundEffects.playShowBombSound();
      bomb.showSpriteSmoke(boxNumber);
      ui.showHelper(boxNumber);
      ui.populateTheUI();
      gametask.endTurnTasks();
      const highlightDropBox = gametask.shouldHighlightLayedBomb();
      if(highlightDropBox){
        ui.addHighlightToClickBox(boxNumber);
      }
    } else if(bomb.isExplosionBox(boxNumber)){
      if(!gametask.hasPassedTrainingRestriction(boxNumber, null)) return null;
      clickedExplosion = true;
      bomb.explodeBoxes(boxNumber);
      gametask.endTurnTasks();
    } else if(!gametask.onRestrictionTurn()) {
      soundEffects.playWrongSound();
      const help = settings.level_data[gameLevel].help;
      if(help && !help.helpTurns.includes(track.turn)){
        ui.showText("Tap directly between the dots!");
        setTimeout(() => {
          ui.showText("");
        }, 4000)
      }
    } else {
      soundEffects.playWrongSound();
    }
  },
  setEdgeBoxClickEvent: () => {
    document.getElementById("gameBoardPage").addEventListener("click", (e) => {
      const board = document.getElementById("board");
      const gameBoardPosition = board.getBoundingClientRect();
      const pageClickPositionY = e.pageY;
      const pageClickPositionX = e.pageX;
      const clickedGameBoard = pageClickPositionY >= gameBoardPosition.y;
      if(clickedGameBoard && currentPage === "gameBoardPage" && isFirstPlayerTurn){
        const heightOfBoxes = gametask.getHeightWithClassName("box13");
        const positionFromTopOfGameBoard = pageClickPositionY - gameBoardPosition.y;
        const rowInformation = boxInfo.getEdgeBoxClickPosition(positionFromTopOfGameBoard, heightOfBoxes);
        const edgeBoxClicked = boxInfo.getEdgeBoxClicked(rowInformation, pageClickPositionX, pageClickPositionY);
        if(edgeBoxClicked.boxClicked && edgeBoxClicked.sideClicked){
          const hasClickBorderPreviously = (gameBoard[edgeBoxClicked.boxClicked].borders[edgeBoxClicked.sideClicked] === true);
          if(!hasClickBorderPreviously){

            const { boxClicked, sideClicked } = edgeBoxClicked;

            const hasPassed = gametask.hasPassedTrainingRestriction(boxClicked, sideClicked);
            if(hasPassed){
              lineClickAction.clickOnBorder(boxClicked, sideClicked);
              ui.populateTheUI();
            }

          }
        }
      }
    });
  },
  clickOnBorder: (boxNumber, lineClicked) => {
    let adjacentBox = null;
    let adjBoxNumber = null;

    bomb.bombPopulation();
    boxInfo.setLineAsClicked(boxNumber, lineClicked);

    boxInfo.setLineColor(boxNumber, lineClicked);
    boxInfo.highlightBoxIfScored(boxNumber);

    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      gameBoard[`box${adjacentBox}`].borders[boxInfo.complementBorder[`${lineClicked}`]] = true;
      boxInfo.highlightBoxIfScored(`box${adjacentBox}`);
      adjBoxNumber = `box${adjacentBox}`;
      boxInfo.setLineColor(adjBoxNumber, boxInfo.complementBorder[`${lineClicked}`]);
    }

    if(adjacentBox){
      boxInfo.setLineAsClicked(boxNumber, lineClicked);
    }
    ui.closeTheBoxConnection({
      boxNumber,
      adjacentBox: adjBoxNumber,
      boxNumberClosedBorder: lineClicked,
      adjacentBoxClosedBorder: boxInfo.complementBorder[`${lineClicked}`]
    });
    const scoreParams = [boxNumber, `box${adjacentBox}`].filter(data => data !== "boxnull");
    track.adjustScore(...scoreParams); // adjust the score
    lineClickAction.changeLineColorOfLastClickedBox(boxNumber, lineClicked, adjBoxNumber, boxInfo.complementBorder[`${lineClicked}`]);
    gametask.endTurnTasks();
  },
  removeLineClickHighlights: () => {
    gametask.removeClassByClassName("box", "topLineClicked");
    gametask.removeClassByClassName("box", "rightLineClicked");
    gametask.removeClassByClassName("box", "bottomLineClicked");
    gametask.removeClassByClassName("box", "leftLineClicked");
  },
  changeLineColorOfLastClickedBox: (boxNumber, lineClicked, adjBoxNumber, adjBoxLine) => {
    if(!isFirstPlayerTurn){
      setTimeout(() => {
        gametask.addClassByClassName(boxNumber, `${lineClicked}LineClicked`);
        if(adjBoxNumber){
          gametask.addClassByClassName(adjBoxNumber, `${adjBoxLine}LineClicked`);
        }
      }, 500);
    }
  },
  isALockedBoxClick: (box, lineClicked) => {
    const adjBox = boxInfo.getAdjBoxBySide(box, lineClicked);
    const includesLocked = (boxInfo.isALockBox(box) || boxInfo.isALockBox(adjBox));
    return includesLocked;
  },
  isALineClick: (offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber) => {
    const inUpperOutOfBounds = (offsetX > upperOutOfBoundsNumber) || (offsetY > upperOutOfBoundsNumber);
    const inLowerOutOfBounds = (offsetX < lowerOutOfBoundsNumber) || (offsetY < lowerOutOfBoundsNumber);
    const inTopLeftCorner = (offsetX < lowerOutOfBoundsNumber) && (offsetY < lowerOutOfBoundsNumber);
    const inBottomLeftCorner = (offsetX < lowerOutOfBoundsNumber) && (offsetY > upperOutOfBoundsNumber);
    const inTopRightCorner = (offsetX > upperOutOfBoundsNumber) && (offsetY < lowerOutOfBoundsNumber);
    const inBottomRightCorner = (offsetX > upperOutOfBoundsNumber) && (offsetY > upperOutOfBoundsNumber);
    const hasClickedACorner = (inTopLeftCorner || inBottomLeftCorner || inTopRightCorner || inBottomRightCorner);
    return (inUpperOutOfBounds || inLowerOutOfBounds) && !hasClickedACorner;
  },
  getLineClicked: (offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber) => {
    if (offsetX > upperOutOfBoundsNumber) return "right";
    if (offsetX < lowerOutOfBoundsNumber) return "left";
    if (offsetY > upperOutOfBoundsNumber) return "bottom";
    if (offsetY < lowerOutOfBoundsNumber) return "top";
  },
  removeBorders: (box, borders) => {
    borders.forEach(border => {
      gameBoard[box].borders[border] = null;
    });
    ui.populateTheUI();
  },
}

window.computerMove = {
  computerMoveSetter: 0,
  setMakeComputerMove: () => {
    clearTimeout(computerMove.computerMoveSetter);
    computerMove.computerMoveSetter = setTimeout(() => {
      computerMove.makeComputerMove();
    })
  },
  makeComputerMove: () => {
    const hasAPreMadeMove = gametask.hasAPreMadeMove();
    if(hasAPreMadeMove.hasPreMadeMove){
      const { box, line } = hasAPreMadeMove.moveToMake;
      setTimeout(() => {
        lineClickAction.clickOnBorder(box, line);
      }, settings.level_data[gameLevel].computerSpeed || 500)
      return null;
    }

    pointsInArow = 0;
    explodingBoxes = [];
    // logic to make computer move
    setTimeout(() => { // makes the computer delay before making a move
      //wait for explosions to stop before making computer move
      if(bomb.isExploding.length === 0){
        const existsTwoBorderBoxes = twoBorderBoxes.length !== 0;
        const noThreeBorderBoxes = !(threeBorderBoxes.length > 0);
        if (existsTwoBorderBoxes && noThreeBorderBoxes && computerMove.giveAWayABox()) {
          computerMove.clickInATwoBorderBox();
          ui.populateTheUI();
        } else {
          computerMove.makeMoveInSafeBox();
        }
      } else {
        computerMove.setMakeComputerMove()
      }

    }, settings.level_data[gameLevel].computerSpeed || 500);
  },
  makeMoveInSafeBox: () => { // make a computer move that doesn't allow opponent the score
    if (threeBorderBoxes.length !== 0) computerMove.getAFreeBox();
    else if (noBorders.length !== 0) computerMove.clickInANoBorderBox();
    else if (oneBorderBoxes.length !== 0) computerMove.clickInAOneBorderBox();
    else if (twoBorderBoxes.length !== 0) computerMove.clickInATwoBorderBox();
    ui.populateTheUI();
  },
  getAFreeBox: () => {
    const clickBox = gametask.getRandomIndexInArray(threeBorderBoxes);
    Object.keys(boxInfo.getGameBoardClickBox(clickBox).borders).forEach(data => {
      if(!bomb.allExplodingBoxes.length > 0){
        const borderCanBeClicked = !boxInfo.getGameBoardClickBox(clickBox).borders[data];
        if (borderCanBeClicked && !isFirstPlayerTurn) {
          if(boxInfo.isAdjBoxALockBox(clickBox, data)){
            threeBorderBoxes.splice(threeBorderBoxes.indexOf(clickBox), 1);
            computerMove.makeMoveInSafeBox();
          } else {
            if(noBorders.length > 0 && !showTextUsed){
              track.screenText();
              // show text on board
              boardText.showText("bad");
            }
            computerHasScored = true;
            lineClickAction.clickOnBorder(clickBox, data);
          }
        }
      }
    });
  },
  clickInANoBorderBox: () => {
    let keepGoing = true;
    while (keepGoing) {
      // choose a randon box in the array containing box with no border
      const clickBox = gametask.getRandomIndexInArray(noBorders);
      //remove that box from that array to avoid checking it multiple times
      noBorders.splice(noBorders.indexOf(clickBox), 1);
      // get the boxes around it that only has one or less borders already selected
      const oneOrLessBorderSurroundingBoxes = boxInfo.getLessThanOneBorderNonConnectedSurroundingBoxes(clickBox);
      // choose a random box of the potential boxes to click
      const selectedBox = gametask.getRandomIndexInArray(oneOrLessBorderSurroundingBoxes);
      // cache the line between the two boxes to use when clicking
      const lineBetweenBoxes = boxInfo.getLineBetweenBoxes(clickBox, selectedBox);
      // is the box on the edge of the gameboard and has no adjcent box
      const edgeBox = boxInfo.edgeBox(clickBox);
      // if the noBorders array is empty all avaible chooses are not safe to click
      if (noBorders.length === 0) {
        keepGoing = false;
      }

      const isClickBoxALockBox = boxInfo.isALockBox(clickBox);
      const isAdjBoxALockBox = lineBetweenBoxes ? boxInfo.isAdjBoxALockBox(clickBox, lineBetweenBoxes.replace("Box", "")) : false;
      // if the clicked box or the box that shares the line is a locked box make computer move again
      if(isClickBoxALockBox || isAdjBoxALockBox){
        keepGoing = false;
        computerMove.makeMoveInSafeBox();
      } else if (selectedBox && lineBetweenBoxes) {
        // if we found a safe box to click move the move
        keepGoing = false;
        const line = lineBetweenBoxes.replace("Box", "");
        lineClickAction.clickOnBorder(clickBox, line);
      } else {
        // if the box is an edge box you can click the edge as a safe move
        if (edgeBox.hasEdgeBox) {
          keepGoing = false;
          lineClickAction.clickOnBorder(clickBox, edgeBox.clickSide);
          break;
        }
        // if not, rethink what kind of box we want to potentially click
        computerMove.makeMoveInSafeBox();
      }
    }
  },
  clickInAOneBorderBox: () => {
    const safeClickBoxWithSide = boxInfo.getSafeBoxes();
    if (safeClickBoxWithSide.length !== 0) {
      const clickBoxObj = gametask.getRandomIndexInArray(safeClickBoxWithSide);
      lineClickAction.clickOnBorder(clickBoxObj.clickBox, clickBoxObj.clickSide);
    } else {
      computerMove.makeMoveInSafeBox();
    }
  },
  clickInATwoBorderBox: () => {
    const connectedBoxCombinations = computerMove.getPathBoxes();
    // choose a box to click
    computerMove.chooseBoxToClickInEndGame(connectedBoxCombinations);
  },
  getPathBoxes: () => {
    // all possible connected box combinations
    const connectedBoxCombinations = [];
    // inspected boxes
    const inspectedBoxes = [];
    let allConnectedBoxes = [];
    // filter for two line boxes
    const twoLineBoxes = Object.keys(gameBoard).filter(boxNumber => boxInfo.getBorderCount(boxNumber) === 2);
    // stops the while loop
    let keepGoing = true;
    // number of boxes inpecting
    const numberOfBoxesInspecting = twoLineBoxes.length;
    while (keepGoing) {
      let calledFunction = false;
      // cache inspecting box
      const inspectingBox = twoLineBoxes[0];
      const recordConnectedBoxes = (boxNumber) => {
        // push into allConnectedBoxes and inspectedBoxes
        allConnectedBoxes.push(boxNumber);
        inspectedBoxes.push(boxNumber);
        // remove it from the uninspected
        twoLineBoxes.splice(twoLineBoxes.indexOf(boxNumber), 1);
        // get the connected boxes
        const surroundingBoxes = boxInfo.getSurroundingBoxes(boxNumber);
        // filter for connected boxes
        const connectedBoxes = surroundingBoxes.filter(box => boxInfo.isAdjacentBoxesConnected(box, boxNumber).isConnected);
        // filter out for 2 line boxes
        const filterBoxesForTwoLineConnectedBoxes = connectedBoxes.filter(data => twoLineBoxes.includes(data)).map(box => box);
        filterBoxesForTwoLineConnectedBoxes.forEach(box => {
          if (!allConnectedBoxes.includes(box)) recordConnectedBoxes(box);
        })
      }
      if (!calledFunction && inspectingBox) {
        calledFunction = true;
        recordConnectedBoxes(inspectingBox);
      }
      connectedBoxCombinations.push([...allConnectedBoxes])
      allConnectedBoxes.length = 0;
      // stop the while loop once all twoLineBoxes are inspected
      if (inspectedBoxes.length === numberOfBoxesInspecting) keepGoing = false;
    }
    const replacements = computerMove.combineCircleAndStraigthPathCombinations(connectedBoxCombinations);
    if (replacements.length) {
      replacements.map(replace => {
        connectedBoxCombinations[replace.index] = replace.array;
      })
    }
    return connectedBoxCombinations;
  },
  combineCircleAndStraigthPathCombinations: (connectedBoxCombinations) => {
    const replacements = [];
    boxInfo.adjustBorderCountArrays();
    if (oneBorderBoxes.length !== 0) {
      oneBorderBoxes.forEach(box => {
        const connectedBoxes = boxInfo.getConnectedBoxes(box);
        connectedBoxCombinations.forEach((paths, index) => {
          if (gametask.hasTwoInArray(connectedBoxes, paths)) {
            let allPathsHere = [];
            connectedBoxes.forEach(eachBox => {
              connectedBoxCombinations.forEach(pathsToGetPathsFrom => {
                if (pathsToGetPathsFrom.includes(eachBox)) {
                  allPathsHere = [...allPathsHere, ...pathsToGetPathsFrom];
                }
              })
            })
            const withRemovedDoubles = gametask.removedDoublesFromArray(allPathsHere);
            replacements.push({
              array: withRemovedDoubles,
              index
            })
          }
        });
      })
    }
    return replacements;
  },
  chooseBoxToClickInEndGame: (multiScoreBoxPaths) => {
    let keepGoing = true;
    let arrayIndex = 0;
    const length = multiScoreBoxPaths.length;
    const pathsToClickABox = multiScoreBoxPaths.sort((a, b) => a.length - b.length);
    while(keepGoing){
      const boxToClick = gametask.getRandomIndexInArray(pathsToClickABox[arrayIndex]);
      let lineClick;
      const borders = boxInfo.getGameBoardClickBox(boxToClick).borders;
      Object.keys(borders).forEach((data, index) => {
        const noBorderClicked = borders[data] === null;
        const isClickBoxALockBox = boxInfo.isALockBox(boxToClick);
        const isAdjBoxALockBox = boxInfo.isAdjBoxALockBox(boxToClick, data);
        if (noBorderClicked && !isClickBoxALockBox && !isAdjBoxALockBox) {
          lineClick = data;
        }
      });
      if((lineClick === null) || (lineClick === undefined)){
        const atLastPath = (arrayIndex - 1) === length;
        if(atLastPath){
          keepGoing = false;
          console.log("game over")
        }
        arrayIndex++;
      } else {
        keepGoing = false;
        lineClickAction.clickOnBorder(boxToClick, lineClick);
      }
    }
  },
  shouldLetHaveBox: () => {
    let onePathHasTwoBoxes = false;
    const pathsToClickABox = computerMove.getPathBoxes();
    if ((pathsToClickABox.length === 2) && (threeBorderBoxes.length === 1)) {
      pathsToClickABox.forEach(path => {
        if (path.length === 1) {
          onePathHasTwoBoxes = !onePathHasTwoBoxes;
        }
      })
    }

    const clickBoxInfo = onePathHasTwoBoxes ? computerMove.chooseLineAndBoxThatDoesNotScore(pathsToClickABox, onePathHasTwoBoxes) : null;
    return clickBoxInfo;
  },
  chooseLineAndBoxThatDoesNotScore: (pathsToClickABox, onePathHasTwoBoxes) => {
    let sideToClick;
    const orderedPaths = pathsToClickABox.sort((a, b) => a.length - b.length);
    const boxToClick = orderedPaths[0][0];
    const boxHasTwoBorders = boxInfo.getBorderCount(boxToClick);
    if (boxHasTwoBorders) {
      // click the edge box
      sideToClick = boxInfo.edgeBox(boxToClick).clickSide;
    } else {
      // take the box
      onePathHasTwoBoxes = false;
    }
    return {
      boxToClick,
      sideToClick
    };
  },
  giveAWayABox: () => {
    return (Math.random() < chanceToGiveAWayPoint);
  }
}

window.gametask = {
  endTurnTasks: () => {
    setTimeout(() => {
      gametask.setTurnPlayer();
    })
  },
  endGameChecker: 0,
  startEndGameInterval: () => {
    clearInterval(gametask.endGameChecker);
    gametask.endGameChecker = setInterval(() => {
      gametask.isGameOver();
    }, 1000)
  },
  setTurnPlayer: () => {
    setTimeout(() => {
      const noMoreLinesToClick =
        (twoBorderBoxes.length === 0) && (noBorders.length === 0) &&
        (oneBorderBoxes.length === 0) && (threeBorderBoxes.length !== 0);
      const hasLockedBoxes = (lockBombLocations.length > 0);
      if(noMoreLinesToClick && hasLockedBoxes){
        console.log("game over");
      }
    })

    gametask.resetAllRestrictions();

    let incrementTurn = true;;
    if(takeAnotherTurn && isFirstPlayerTurn){
      takeAnotherTurn = false;
    } else if (takeAnotherTurn && !isFirstPlayerTurn) {
      takeAnotherTurn = false;
    } else if(layedBomb){
      layedBomb = false;
      incrementTurn = false;
    } else if (clickedExplosion) {
      clickedExplosion = false;
      isFirstPlayerTurn = !isFirstPlayerTurn;
    } else if(!takeAnotherTurn){
      isFirstPlayerTurn = !isFirstPlayerTurn;
      soundEffects.playLineClickSound();
    }

    gametask.setTurnIndicator();

    setTimeout(() => {
      if(incrementTurn){
        track.incrementTurn()
      }
      ui.populateTheUI();
      ui.startLevelText();
      setTimeout(() => {
        if(!isFirstPlayerTurn){
          computerMove.makeComputerMove();
        }
      }, 100)
    })
  },
  isGameOver: () => {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(box => {
      const firstPlayerScored = gametask.hasClassByQuerySelector(`.${box}`, "firstPlayerScored");
      const secondPlayerScored = gametask.hasClassByQuerySelector(`.${box}`, "secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    });
    if(totalPointsScored === gameBoardLength){
      clearInterval(gametask.endGameChecker);
      settings.endGame = true;
      setTimeout(() => {
        settings.endGame = false;
      }, 4000)
      if(playerOneScore > playerTwoScore){
        ui.showCompleteScreen();
      } else if(playerOneScore === playerTwoScore){
        boardText.showOnBoard("DRAW", 5000);
        isFirstPlayerTurn = true;
      } else {
        boardText.showOnBoard("Aint nobody got time for that!", 5000);
        isFirstPlayerTurn = true;
      }
    } else {
      const hasNoBorderBoxes = noBorders.length === 0;
      const hasTwoBorderBoxes = twoBorderBoxes.length === 0;
      const hasThreeBorderBoxes = threeBorderBoxes.length === 0;
      const noBoxesLeft = hasNoBorderBoxes && hasTwoBorderBoxes && hasThreeBorderBoxes;
      if(noBoxesLeft){

        settings.endGame = true;
        setTimeout(() => {
          settings.endGame = false;
        }, 4000)

        boardText.showOnBoard("Game Over! Blow up the foot of oppression to win", 6000);
        isFirstPlayerTurn = true;
      }
    }
  },
  getRandomIndexInArray: (boxArray) => {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
  setGameLevelAndTips: (level) => {
    gameLevel = level - 1;
    gametask.setGameLevelObj();
    track.goToPage('tipsPage');
    gametask.setTips(level);
  },
  setTips: (level) => {
    if(!getGameLevelObj.tipsPage){
      ui.startGame()
    }

    const {
      heading, text, img_src, height
    } = getGameLevelObj.tipsPage || settings.level_data[0].tipsPage;

    gametask.addTextByQuerySelector("#tipHeading", heading);
    gametask.addTextByQuerySelector("#tipText", text);
    document.getElementById("tipImage").src = img_src;
    document.getElementById("tipImage").style.height = height;
  },
  setDifficulty: (difficulty) => {
    if (difficulty === "easy") { chanceToGiveAWayPoint = 0.4 }
    else if (difficulty === "medium") { chanceToGiveAWayPoint = 0.2 }
    else if (difficulty === "hard") { chanceToGiveAWayPoint = 0.01 }
  },
  clearBoard: () => {
    // document.getElementsByClassName("box")[0].remove();
    ui.startGame(gameLevel + 1); // add one for the index
  },
  breakRefAndCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
  },
  hasTwoInArray: (array, arrayToCheckIn) => {
    let numberInside = 0;
    array.forEach(arr => {
      if (arrayToCheckIn.includes(arr)) {
        numberInside++
      }
    })
    return (numberInside === 2);
  },
  removedDoublesFromArray: (arr) => {
    const noDublicates = [];
    arr.forEach(item => {
      if (!noDublicates.includes(item)) {
        noDublicates.push(item);
      }
    })
    return noDublicates;
  },
  isSelected: () => {
    return gametask.getLengthOfElement(".tool.selected") === 1
  },
  resetScore: () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    gametask.addTextByQuerySelector(".playerOneScore", playerOneScore);
    gametask.addTextByQuerySelector(".playerTwoScore", playerTwoScore);
  },
  resetPlayerTurn: () => {
    isFirstPlayerTurn = true;
    gametask.setTurnIndicator();
  },
  saveToLocalStorage: (key, obj) => {
    window.localStorage.setItem("boxes", JSON.stringify({
      [key]: obj
    }));
  },
  setFromLocalStorage: () => {
    setTimeout(() => {
      if(!localStorage.boxes || reset_settings){
        gametask.saveToLocalStorage("settings", settings)
      } else {
        const storage = JSON.parse(localStorage.boxes)
        settings = storage.settings;
      }
      settings.level_data.forEach((data, index) => {
        if(data.help){
          data.help.boardHelpText = helpTextArray[index].help.boardHelpText;
          data.help.helpTurns = helpTextArray[index].help.helpTurns;
        }
      })
    })
  },
  changeTitleColor: () => {
    gametask.addClassByClassName("title", "transitionColor");
    setInterval(function () {
      const hasColorChangheClass = gametask.hasClassByClassName("title", "colorChange");
      if(hasColorChangheClass){
        gametask.removeClassByClassName("title", "colorChange");
        gametask.removeClassByClassName("africa", "lighter");
        gametask.addClassByClassName("ripple", "active");
        setTimeout(() => {
          gametask.removeClassByClassName("ripple", "active");
        }, 100)
      } else {
        gametask.addClassByClassName("title", "colorChange");
        gametask.addClassByClassName("africa", "lighter");
      }
    }, 4000);
  },
  passTurn: () => {
    isFirstPlayerTurn = !isFirstPlayerTurn;
    gametask.setTurnIndicator();
    if(!isFirstPlayerTurn){
      computerMove.setMakeComputerMove();
    }
  },
  resizeBoard: () => {
    setTimeout(() => {
      const boardSize = gametask.getWidthWithId("board");
      const gridWidth = boardSize/6;
      gametask.setHeightWithClassName("box", gridWidth - 6);
      gametask.setWidthWithClassName("box", gridWidth - 6);
    })
  },
  getTools: () => {
    return getGameLevelObj.tools ? gametask.breakRefAndCopy(getGameLevelObj.tools) : [];
  },
  setGameLevelObj: () => {
    getGameLevelObj = gametask.getGameLevelObj();
  },
  getGameLevelObj: () => {
    return settings.level_data[gameLevel];
  },
  addTextByQuerySelector: (selector, text) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].innerText = text;
      }
    }
  },
  addHTMLByQuerySelector: (selector, html) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].innerHTML = html;
      }
    }
  },
  getTextByQuerySelector: (selector) => {
    const element = document.querySelectorAll(selector)[0];
    return element.innerText;
  },
  addClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.add(classToRemove);
      }
    }
  },
  removeClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  removeClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  removeClassByClassName: (selector, classToRemove) => {
    const element = document.getElementsByClassName(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  addClassByClassName: (selector, classToAdd) => {
    const element = document.getElementsByClassName(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.add(classToAdd);
      }
    }
  },
  hasClassByClassName: (selector, classToCheckFor) => {
    const element = document.getElementsByClassName(selector)[0];
    if(element){
      return element.classList.contains(classToCheckFor);
    }
  },
  hasClassByQuerySelector: (selector, classToCheckFor) => {
    let hasClass = false;
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        if(element[i].classList.contains(classToCheckFor)){
          hasClass = true;
        }
      }
    }
    return hasClass;
  },
  getHeightWithClassName: (selector) => {
    return document.getElementsByClassName(selector)[0].clientHeight;
  },
  getWidthWithClassName: (selector) => {
    return document.getElementsByClassName(selector)[0].clientWidth;
  },
  getWidthWithId: (selector) => {
    return document.getElementById(selector).clientWidth;
  },
  setHeightWithClassName: (selector, height) => {
    const sel = document.getElementsByClassName(selector);
    const length = sel.length;
    for(let i = 0; i < length; i++){
      sel[i].style.height = `${height}px`;
    }
  },
  setWidthWithClassName: (selector, width) => {
    const sel = document.getElementsByClassName(selector);
    const length = sel.length;
    for(let i = 0; i < length; i++){
      sel[i].style.width = `${width}px`;
    }
  },
  getLengthOfElement: (selector) => {
    const query = document.querySelectorAll(selector);
    return query.length;
  },
  getStarsForWinner: (score) => {
    const starRubric = getGameLevelObj.starRating || [];
    if(score >= starRubric[2].score){ return 3 }
    else if(score >= starRubric[1].score){ return 2 }
    else if(score >= starRubric[0].score){ return 1 }
  },
  setStarsForWinner: (stars) => {
    settings.level_data[gameLevel].stars = stars;
    gametask.saveToLocalStorage("settings", settings);
  },
  openNextBoard: (stars) => {
    const nextLevel = settings.level_data[gameLevel + 1];
    if(stars > 0 && nextLevel){
      nextLevel.isLocked = false;
      gametask.saveToLocalStorage("settings", settings);
    }
  },
  setTurnIndicator: () => {
    gametask.removeClassByClassName("scoreHolder", "thisPlayerTurn");
    if(isFirstPlayerTurn){ gametask.addClassByQuerySelector(".firstPlayerTurnHolder", "thisPlayerTurn") }
    else { gametask.addClassByQuerySelector(".secondPlayerTurnHolder", "thisPlayerTurn") }
  },
  setTurnRestrictions: () => {
    const { trainingRestrictions } = settings.level_data[gameLevel];
    if(trainingRestrictions){
      const { restrictions } = settings.level_data[gameLevel].trainingRestrictions;
      restrictions.forEach(restriction => {
        const {
          turn,
          type,
          boxOne,
          boxTwo,
          clickBox,
          then
        } = restriction;
        const onRestrictionTurn = track.turn === turn;
        if(onRestrictionTurn){
          gametask.resetAllRestrictions();
          if(type === "highLightLine"){
            restrictionLineClicks = [boxOne, boxTwo];
            gametask.highlightLine();
          } else if (type === "clickBox") {
            restrictionClickBox = clickBox;
            setTimeout(() => {
              gametask.addClassByClassName(clickBox, "clickBox");
            }, 500)
          } else if (type === "layBomb") {
            restrictionLayBomb = clickBox;
            const boxToClick = settings.level_data[gameLevel].clickAnimal;
            setTimeout(() => {
              gametask.addClassByQuerySelector(`.tool.${boxToClick}`, "clickBox");
            })
          }
          if(then){
            nextRestriction = then;
          }
        }
      })
    }
  },
  highlightLine: () => {
    const restrict = gametask.breakRefAndCopy(restrictionLineClicks);
    setTimeout(() => {
      restrict.forEach(data => {
        if(data.side === "top"){
          gametask.addClassByClassName(data.box, "clickTopLine")
        } else if (data.side === "right") {
          gametask.addClassByClassName(data.box, "clickRightLine")
        } else if (data.side === "bottom") {
          gametask.addClassByClassName(data.box, "clickBottomLine")
        } else if (data.side === "left") {
          gametask.addClassByClassName(data.box, "clickLeftLine")
        }
      })
    }, 500)
  },
  resetAllRestrictions: () => {
    restrictionLineClicks = null;
    restrictionClickBox = null;
    restrictionLayBomb = null;
    nextRestriction = null;
    setTimeout(() => {
      gametask.removeClassByClassName("box", "clickTopLine");
      gametask.removeClassByClassName("box", "clickRightLine");
      gametask.removeClassByClassName("box", "clickBottomLine");
      gametask.removeClassByClassName("box", "clickLeftLine");
    }, 500)
  },
  onRestrictionTurn: () => {
    return restrictionLineClicks || restrictionClickBox;
  },
  hasPassedTrainingRestriction: (boxNumber, lineClicked) => {
    let hasPassed = true;
    if(restrictionLineClicks){
      hasPassed = false;
      restrictionLineClicks.forEach(restriction => {
        const { box, side } = restriction;
        if(box === boxNumber && side === lineClicked){
          hasPassed = true;
        }
      })
    } else if (restrictionClickBox) {
      hasPassed = false;
      if(restrictionClickBox.includes(boxNumber) && !lineClicked){
        hasPassed = true;
      }
    } else if(restrictionLayBomb) {
      hasPassed = false;
      if(restrictionLayBomb.includes("any box") || restrictionLayBomb.includes(boxNumber)){
        if(!lineClicked){
          hasPassed = true;
          restrictionLayBomb = null;

          if(nextRestriction){
            const {
              turn,
              type,
              boxOne,
              boxTwo,
              clickBox,
              then,
              withClickBox
            } = nextRestriction;
            if(type === "highLightLine"){
              setTimeout(() => {
                restrictionLineClicks = [boxOne, boxTwo];
                gametask.highlightLine();
              }, 500)
            } else if (type === "clickBox") {
              if(withClickBox){
                setTimeout(() => {
                  restrictionClickBox = [...clickBox, boxNumber];
                  restrictionClickBox.forEach(data => {
                    gametask.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              } else {
                setTimeout(() => {
                  restrictionClickBox = [...clickBox];
                  restrictionClickBox.forEach(data => {
                    gametask.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              }
            } else if (type === "layBomb") {
              setTimeout(() => {
                restrictionLayBomb = clickBox;
              })
            }
          }
        }
      }
    }

    if(!hasPassed){
      soundEffects.playWrongSound();
    }

    return hasPassed;
  },
  hasAPreMadeMove: () => {
    let hasPreMadeMove = false;
    let moveToMake = "";
    const { computerMoves } = settings.level_data[gameLevel];
    if(computerMoves){
      computerMoves.forEach(move => {
        if(move.turn === track.turn){
          hasPreMadeMove = true;
          moveToMake = move;
        }
      })
    }
    return {
      hasPreMadeMove,
      moveToMake
    }
  },
  incorrectClick: (boxNumber, lineClicked) => {
    if(boxNumber && lineClicked){
      // turns the line red to indicate that it cant be clicked
      ui.displayNoClickIndicator(boxNumber, lineClicked);
    }
    soundEffects.playWrongSound();
  },
  setToolClickEvent: () => {
    $(document).on("click", ".tool.clickBox", () => {
      gametask.removeClassByClassName(".tool", "keepSelected");
      const clickBox = settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickBox;
      clickBox.forEach(box => {
        gametask.addClassByQuerySelector(".tool.clickBox", "keepSelected");
        gametask.removeClassByQuerySelector(".tool.clickBox", "clickBox");
        gametask.addClassByClassName(box, "clickBox");
      })
    })
  },
  shouldHighlightLayedBomb: () => {
    if(!settings.level_data[gameLevel].trainingRestrictions){
      return null;
    }
    return settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn]
            && settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickWhenLayed;
  },
  selectStoreItem: (item, cost) => {
    const currentGold = settings.gold;
    if(currentGold >= cost){
      for (var x in storeItemSelected) delete storeItemSelected[x];
      storeItemSelected.item = item;
      storeItemSelected.cost = cost;
      ui.toggleConfirmScreen();
    } else {
      soundEffects.playWrongSound();
    }
  },
  buyItem: () => {
    const currentGold = settings.gold;
    settings.gold = currentGold - storeItemSelected.cost;
    settings.itemsPurchased.push(storeItemSelected.item);
    const newQuantity = settings.store[storeItemSelected.item].quantity + 1;
    settings.store[storeItemSelected.item].quantity = newQuantity;
    gametask.saveToLocalStorage("settings", settings)
    ui.toggleConfirmScreen();
    document.getElementById("goldAmount").innerText = settings.gold;
    ui.populateStore();
  }
}

window.ui = {
  startGame: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("playGame")

    gametask.removeClassByClassName("helpTextP", "showHelpText");

    restrictionLineClicks = null;
    restrictionClickBox = null;
    restrictionLayBomb = null;
    nextRestriction =  null;

    settings.itemsSelected = [];

    gametask.startEndGameInterval();
    track.turn = 0;
    pointsInArow = 0;
    whoClickedLine = gametask.breakRefAndCopy(whoClickTheLine);
    textType = null;
    on_game_board = true;
    gametask.resetPlayerTurn();
    gametask.resetScore();
    track.goToPage(settings.startUpPage);
    gametask.setDifficulty(settings.difficulty);
    initialBombs = getGameLevelObj.initialBombs ? gametask.breakRefAndCopy(getGameLevelObj.initialBombs) : [];
    bombsToLay = getGameLevelObj.bombsToLay ? gametask.breakRefAndCopy(getGameLevelObj.bombsToLay) : 0;
    // track.setRemainingBombs();
    lockBombLocations = getGameLevelObj.lockBoxes ? gametask.breakRefAndCopy(getGameLevelObj.lockBoxes) : [];

    gameBoard = gametask.breakRefAndCopy(ui.gameBoardMapperObj[`level${gameLevel + 1}`]);
    gameBoardLength = ui.getGameBoardLength();

    const lockBoxesAmount = lockBoxes[gameLevel];
    for(let i = 0; i < 36; i++){
      if(!boxInfo.isBoxDisabled(`box${i}`)){
        possibleBombs.push(`box${i}`);
      }
    }

    possibleBombs.forEach((data, index) => {
      if(index < lockBoxesAmount){
        const box = gametask.getRandomIndexInArray(possibleBombs);
        const index = possibleBombs.indexOf(box);
        possibleBombs.splice(index, 1);
      }
    })

    ui.addInitialBombs();
    ui.fillPreFilledBoxes();
    ui.populateTheUI();
    bomb.fillPopulationData();
    ui.startLevelText();
  },
  redo: () => {
    gametask.clearBoard();
    track.goToPage('gameBoardPage');
  },
  gameBoardMapperObj: {
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10
  },
  addInitialBombs: () => {
    initialBombs.forEach(data => {
      gameBoard[data.box][data.bombType] = true;
    })
  },
  getGameBoardLength: () => {
    let length = 0;
    for(let box in gameBoard){
      if(!gameBoard[box].disabled){
        length++;
      }
    }
    return length;
  },
  chooseBoard: () => {
    if(settings.endGame) return null;
    track.goToPage("levelsPage");
    document.querySelectorAll(".levelsHolder")[0].innerHTML = "";
    const node = document.getElementsByClassName("levelsHolder")[0];
    settings.level_data.forEach(data => {
      (data.isLocked) ?
      node.insertAdjacentHTML('beforeend', ui.uiComponents.lockedBoardBox()) :
      node.insertAdjacentHTML('beforeend', ui.uiComponents.boardBox(data));
    })
  },
  populateBoard: () => { // populate the gameboard into the UI
    if (document.getElementsByClassName("box").length > 0) {
      const boxes = document.getElementsByClassName("box");
      ui.removeAllLockBoxes();
      for (let i = 0; i < boxes.length; i++) {
        ui.addLockBox(`box${i}`);
        const gridBox = boxes[i];
        gridBox.className = "";
        gridBox.classList.add(...boxInfo.getAllBoxClasses(`box${i}`));
      }
    } else {
      for (let box in gameBoard) {
        ui.addLockBox(box);

        const topRightDot = document.createElement("div");
        const topLeftDot = document.createElement("div");
        const bottomRightDot = document.createElement("div");
        const bottomLeftDot = document.createElement("div");
        topRightDot.classList.add("topRightDot");
        topLeftDot.classList.add("topLeftDot");
        bottomRightDot.classList.add("bottomRightDot");
        bottomLeftDot.classList.add("bottomLeftDot");

        const pointer = document.getElementsByClassName("helpPointer")[0];
        const clone = pointer.cloneNode(true);

        const gridBox = document.createElement("div");

        gridBox.appendChild(topRightDot);
        gridBox.appendChild(topLeftDot);
        gridBox.appendChild(bottomRightDot);
        gridBox.appendChild(bottomLeftDot);

        gridBox.appendChild(clone);

        gridBox.classList.add(...boxInfo.getAllBoxClasses(box));
        gridBox.insertAdjacentHTML('beforeend', ui.uiComponents.spriteSheet(box));
        gridBox.addEventListener("mousedown", (e) => { // add a click event to the box click on borders
          if (!isFirstPlayerTurn || boxInfo.isBoxDisabled(box)) return null; // prevent out of turn clicks
          lineClickAction.highlightClickedBorder(e.offsetX, e.offsetY, box, board);
        });
        const node = document.getElementById("board");
        node.appendChild(gridBox); // add the box to the game board
      }
    }
    track.setScores();
    boxInfo.adjustBorderCountArrays(); // add boxes with one border to the oneBorderBoxes array, etc...
    ui.populateHelpers();
  },
  populateHelpers: () => {
    //set helpers
    if(!tools){
      tools = gametask.getTools();
    }

    //empty any helpers still on the board
    const nodes = document.getElementsByClassName("bombToolsBar");
    nodes[0].innerHTML = "";

    //populate board with helps
    tools.forEach(data => {
      const tool = document.querySelectorAll(`.tool.${data.name}`);
      const toolExists = tool.length > 0;
      if(data.count !== 0 && !toolExists){
        const tool = ui.uiComponents.helper(data);
        const node = document.getElementsByClassName("bombToolsBar")[0];
        node.insertAdjacentHTML('beforeend', tool);
      } else if (data.count !== 0) {
        gametask.addTextByQuerySelector(`.${data.name}p`, data.count);
      } else if (data.count === 0 && toolExists) {
        tool[0].remove();
      }
    })
  },
  removeAllLockBoxes: () => {
    gametask.removeClassByClassName("box", "locked");
    for(let data in gameBoard){
      gameBoard[data].isLocked = false;
    }
  },
  addLockBox: (box) => {
    if(boxInfo.isALockBox(box) && !boxInfo.isBoxDisabled(box)){
      gameBoard[box].isLocked = true;
    }
  },
  removeScoreColorIfRemovingBorder: (box) => {
    gameBoard[box].whoScored = null;
    gametask.removeClassByClassName(`.${box}`, "firstPlayerScored");
    gametask.removeClassByClassName(`.${box}`, "secondPlayerScored");
  },
  closeTheBoxConnection: (closeTheBoxConnectionParams) => {
    const {
      boxNumber,
      adjacentBox,
      boxNumberClosedBorder,
      adjacentBoxClosedBorder
    } = closeTheBoxConnectionParams;
    if (gameBoard[boxNumber].surroundingBoxes[`${boxNumberClosedBorder}Box`]) gameBoard[boxNumber].surroundingBoxes[`${boxNumberClosedBorder}Box`].isConnected = false;
    if (adjacentBox && gameBoard[adjacentBox].surroundingBoxes[`${adjacentBoxClosedBorder}Box`]) gameBoard[adjacentBox].surroundingBoxes[`${adjacentBoxClosedBorder}Box`].isConnected = false;
  },
  selectHelper: (bombFunction) => {
    const hasSelected = document.querySelector(`.tool[class*=${bombFunction}]`).classList.contains("selected");
    const keepSelected = document.querySelector("keepSelected");
    if(hasSelected && keepSelected){
      const helperDisabled = keepSelected.length > 0;
      if(helperDisabled) return null;
      gametask.removeClassByClassName("tool", "selected");
    } else {
      gametask.removeClassByClassName("tool", "selected");
      gametask.addClassByQuerySelector(`.tool[class*=${bombFunction}]`, "selected");
      selectedBombFunction = bombFunction;
    }
  },
  populateStore: () => {
    gametask.addTextByQuerySelector("#goldAmount", settings.gold);
    const merchHolder = document.getElementsByClassName("merchHolder")[0];
    merchHolder.innerHTML = "";
    const { store } = settings;
    for(let item in store) {
      const animalBox = ui.uiComponents.getStoreItem(store[item]);
      merchHolder.append(animalBox);
    }
  },
  populateBombSelectionScreen: () => {
    const selectBomb = document.getElementsByClassName("selectBomb")[0];
    selectBomb.innerHTML = "";
    const populated = [];
    settings.itemsPurchased.forEach(data => {
      if(!populated.includes(data)){
        const animalSelectBox = ui.uiComponents.getAnimalSelectBox(data);
        selectBomb.append(animalSelectBox);
        populated.push(data)
      }
    })
    const hasTakenLayTutorial = gameLevel > 4;
    if(populated.length === 0 || !hasTakenLayTutorial){
      ui.doneBombSelected();
    }
  },
  uiComponents: {
    boardBox: (data) => {
      let stars = "";
      for(let i = 0; i < data.stars; i++){
        stars += `<img class="star${i}" src="./img/star.png" alt="">`;
      }
      return (`
        <div class="level flexCol playBoardButton" onclick="gametask.setGameLevelAndTips(${data.levelNumber})">
          <p>${data.levelNumber}</p>
          <div class="stars flexRow">
            ${stars}
          </div>
        </div>
      `)
    },
    spriteSheet: (box) => {
      return ("<div class='spriteSheet'></div>");
    },
    lockedBoardBox: () => {
      return (`
        <div class="level flexCol">
          <div class="boardLock">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
          </div>
        </div>
      `);
    },
    helper: (data) => {
      return (`<div class="tool flexRow ${data.name}" onclick="ui.selectHelper('${data.name}')">
        <img src=${data.src} alt="">
        <svg class="helpPointer" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hand-point-down" class="svg-inline--fa fa-hand-point-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M91.826 467.2V317.966c-8.248 5.841-16.558 10.57-24.918 14.153C35.098 345.752-.014 322.222 0 288c.008-18.616 10.897-32.203 29.092-40 28.286-12.122 64.329-78.648 77.323-107.534 7.956-17.857 25.479-28.453 43.845-28.464l.001-.002h171.526c11.812 0 21.897 8.596 23.703 20.269 7.25 46.837 38.483 61.76 38.315 123.731-.007 2.724.195 13.254.195 16 0 50.654-22.122 81.574-71.263 72.6-9.297 18.597-39.486 30.738-62.315 16.45-21.177 24.645-53.896 22.639-70.944 6.299V467.2c0 24.15-20.201 44.8-43.826 44.8-23.283 0-43.826-21.35-43.826-44.8zM112 72V24c0-13.255 10.745-24 24-24h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24zm212-24c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg>
      </div>`)
    },
    getStoreItem: (item) => {
      const { hasUnlocked, unlockedImgClass, lockedImgClass } = item;
      const animalBoxClasses = ["animalBox", "flexCol"];
      const animalClasses = ["animal", hasUnlocked ? unlockedImgClass : lockedImgClass];
      const priceClasses = ["price", "flexRow"];
      const goldMoneyClasses = ["goldMoney"];
      const totalForItemClasses = ["totalForItem"];
      const totalForItemPClasses = ["totalForItemP"];
      const costLabel = item.hasUnlocked ? item.cost : "?";

      const animalBox = document.createElement("div");
      let animal = document.createElement("div");
      let price = document.createElement("div");
      const goldMoney = document.createElement("div");
      const cost = document.createElement("span");
      const totalForItem = document.createElement("div");
      const totalForItemP = document.createElement("p");

      cost.innerText = costLabel;
      totalForItemP.innerText = item.hasUnlocked ? item.quantity : "";
      animalBox.classList.add(...animalBoxClasses);
      animal.classList.add(...animalClasses);
      price.classList.add(...priceClasses);
      goldMoney.classList.add(...goldMoneyClasses);
      totalForItem.classList.add(...totalForItemClasses);
      totalForItemP.classList.add(...totalForItemPClasses);

      price.append(cost);
      price.append(goldMoney);
      animalBox.append(animal);
      animalBox.append(price);
      totalForItem.append(totalForItemP);
      animalBox.append(totalForItem);

      animalBox.addEventListener("click", () => {
        const animal = item.unlockedImgClass.replace("buy_", "");
        const cost = (price.innerText === "?") ? 10000000 : parseInt(item.cost);
        gametask.selectStoreItem(animal, cost);
      });

      return animalBox;
    },
    getAnimalSelectBox: (animal) => {
      const animalBoxClasses = ["animalBombSelectBox", `buy_${animal}`];
      const animalBox = document.createElement("div");
      animalBox.classList.add(...animalBoxClasses);
      animalBox.addEventListener("click", () => {
        ui.selectPregameBomb(`buy_${animal}`);
      });
      return animalBox;
    }
  },
  tools: [
    {
      name: "lion",
      src: "./img/color_animals/asset_lion.png",
      count: 1
    },
    {
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    },
    {
      name: "panther",
      src: "./img/color_animals/asset_panther.png",
      count: 1
    }
  ],
  changeDifficulty: (diff) => {
    settings.difficulty = diff;
    gametask.saveToLocalStorage("settings", settings);
    ui.setDifficulty();
  },
  setDifficulty: () => {
    gametask.removeClassByClassName("diff", "selectedSetting");
    gametask.addClassByClassName(settings.difficulty, "selectedSetting");
  },
  toggleSound: () => {
    settings.hasMutedSound = !settings.hasMutedSound;
    gametask.saveToLocalStorage("settings", settings);
    ui.setSound();
  },
  setSound: () => {
    gametask.removeClassByClassName("sound", "selectedSetting");
    if(settings.hasMutedSound){
      gametask.addClassByQuerySelector(".sound.sOptions.off", "selectedSetting");
    } else {
      gametask.addClassByQuerySelector(".sound.sOptions.on", "selectedSetting");
    }
  },
  toggleMusic: () => {
    settings.hasMutedMusic = !settings.hasMutedMusic;
    gametask.saveToLocalStorage("settings", settings);
    ui.setMusic();
  },
  setMusic: () => {
    gametask.removeClassByClassName("music", "selectedSetting");
    if(settings.hasMutedMusic){
      gametask.addClassByQuerySelector(".music.mOptions.off", "selectedSetting");
    } else {
      gametask.addClassByQuerySelector(".music.mOptions.on", "selectedSetting");
    }
  },
  showHint: () => {
    const index = gametask.getRandomIndexInArray(noBorders);
    const box = noBorders[index];
    gametask.addClassByClassName(box, "hint");
    setTimeout(() => {
      gametask.removeClassByClassName(box, "hint");
    }, 600);
  },
  setSettingsIfOnSettingsPage: (page) => {
    if(page === "settingsPage"){
      ui.setDifficulty();
      ui.setSound();
      ui.setMusic();
    }
  },
  animateScore: (prize, starTimeout) => {
    let remainingGold = parseInt(gametask.getTextByQuerySelector(".remainingGold"));
    const hasScore = remainingGold !== 0;
    if(hasScore){
      const changeNumber = () => {
        const gold = remainingGold;
        starTimeout += 100;
        setTimeout(() => {
          // gametask.addTextByQuerySelector(".remainingGold", gold);
          const currectGold = parseInt(gametask.getTextByQuerySelector(".currentGoldCount")) + 1;
          gametask.addTextByQuerySelector(".currentGoldCount", currectGold)
          settings.gold = currectGold;
        }, starTimeout)
        remainingGold--;
        if(remainingGold > 0){
          changeNumber();
        }
      }
      changeNumber();
    }
    setTimeout(() => {
      ui.showGift(prize, starTimeout);
    }, starTimeout);
  },
  showGift: (prize, starTimeout) => {
    if(prize){
      setTimeout(() => {
        const hasClaimed = getGameLevelObj.hasLargePrize && getGameLevelObj.hasLargePrize.hasClaimed;
        if(!getGameLevelObj.hasLargePrize || hasClaimed){
          gametask.addClassByClassName("goldScreen", "smallPrize");
        } else {
          settings.level_data[gameLevel].hasLargePrize.hasClaimed = true;
          gametask.saveToLocalStorage("settings", settings);
          gametask.removeClassByClassName("goldScreen", "smallPrize");
          const prize = getGameLevelObj.hasLargePrize.prize;
          const img = document.querySelector(".goldScreen img")
          img.src = `./img/rewards/${prize}_reward.png`;
          const currentClass = img.classList[0];
          img.classList.remove(currentClass);
          img.classList.add(`${prize}_reward`);
          settings.store[prize].hasUnlocked = true;
          const currentQuantity = settings.store[prize].quantity;
          settings.store[prize].quantity = currentQuantity + 1;
          settings.itemsPurchased.push(prize);
          gametask.saveToLocalStorage("settings", settings);
        }
        gametask.addClassByClassName("rewardScreen", "showPrice");
        setTimeout(() => {
          gametask.addClassByQuerySelector("svg.redoBtn", "showBtn");
          if(settings.level_data[gameLevel + 1]){
            gametask.addClassByQuerySelector("svg.nextBtn", "showBtn");
          }
        }, 1000)
      }, 200);
    }
  },
  showEndGameScreen: (stars, yourScore, computerScore, currentGoldCount, prize) => {
    gametask.resetPlayerTurn();
    gametask.removeClassByClassName("gameCompleteBox", "hideGameComplete");
    gametask.addTextByQuerySelector(".yourScore", yourScore);
    gametask.addTextByQuerySelector(".computerScore", computerScore);
    const remainingGold = parseInt(yourScore) - parseInt(computerScore);
    gametask.addTextByQuerySelector(".remainingGold", remainingGold);
    gametask.addTextByQuerySelector(".currentGoldCount", currentGoldCount);
    setTimeout(() => {
      document.getElementsByClassName("rewardScreen")[0].style.opacity = 1;
    }, 1000);
    let starTimeout = 200;
    const showStars = (count) => {
      let starCount = count + 1;
      setTimeout(() => {
        document.getElementsByClassName(`completeStar${starCount}`)[0].style.opacity = 1;
      }, starTimeout);
      starTimeout += 200;
    }
    setTimeout(() => {
      for(let i = 0; i < stars; i++){
        showStars(i);
      }
      ui.animateScore(prize, starTimeout);
    }, starTimeout)
  },
  showCompleteScreen: () => {
    setTimeout(() => {
      const stars = gametask.getStarsForWinner(playerOneScore);
      gametask.setStarsForWinner(stars);
      gametask.openNextBoard(stars);
      const yourScore = playerOneScore;
      const computerScore = playerTwoScore;
      const currentGoldCount = settings.gold;
      const prize = "cheetah";
      ui.showEndGameScreen(stars, yourScore, computerScore, currentGoldCount, prize);
    }, 500)
  },
  showTextTimeout: 0,
  showText: (text) => {
    gametask.removeClassByClassName("helpTextP", "showHelpText");
    clearTimeout(ui.showTextTimeout);
    ui.showTextTimeout = setTimeout(() => {
      gametask.addHTMLByQuerySelector(".helpTextP", text);
      gametask.addClassByClassName("helpTextP", "showHelpText");
    }, 500)
  },
  startLevelText: () => {
    if(!getGameLevelObj["help"]) {
      gametask.removeClassByQuerySelector(".helpTextP", "showHelpText");
      return null
    };

    const levelText = getGameLevelObj["help"]["boardHelpText"]();
    const turnsToShowText = levelText ? getGameLevelObj["help"]["helpTurns"] : [];

    if(track.turn === 0){
      helpText = levelText;
    }

    if(!helpText && levelText && turnsToShowText.includes(track.turn)){
      const text = helpText.next().value;
      ui.showText(text || "");
    } else if(helpText && turnsToShowText.includes(track.turn)) {
      const text = helpText.next().value;
      ui.showText(text || "");
    }
    if(turnsToShowText.indexOf(track.turn) === turnsToShowText.length - 1){
      setTimeout(() => {
        ui.showText("");
      }, 8000)
    }
  },
  fillPreFilledBoxes: () => {
    const {prefilledBoxes} = getGameLevelObj;
    if(prefilledBoxes){
      for(let box in gameBoard){
        if(prefilledBoxes.includes(box)){
          // fill box
          gameBoard[box].borders.top = true;
          gameBoard[box].borders.right = true;
          gameBoard[box].borders.bottom = true;
          gameBoard[box].borders.left = true;
          gameBoard[box].whoScored = "secondPlayerScored";
          // fill adj box
          const topAdj = boxInfo.getAdjBoxBySide(box, "top");
          const rightAdj = boxInfo.getAdjBoxBySide(box, "right");
          const leftAdj = boxInfo.getAdjBoxBySide(box, "left");
          const bottomAdj = boxInfo.getAdjBoxBySide(box, "bottom");
          if(topAdj){ gameBoard[topAdj].borders.bottom = true }
          if(rightAdj){ gameBoard[rightAdj].borders.left = true }
          if(bottomAdj){ gameBoard[bottomAdj].borders.top = true }
          if(leftAdj){ gameBoard[leftAdj].borders.right = true }
        }
      }
    }
  },
  undoFinishScreen: () => {
    gametask.addClassByClassName("gameCompleteBox", "hideGameComplete");
    gametask.addTextByQuerySelector(".yourScore", 0);
    gametask.addTextByQuerySelector(".computerScore", 0);
    gametask.addTextByQuerySelector(".remainingGold", 0);
    gametask.addTextByQuerySelector(".currentGoldCount", 0);
    document.getElementsByClassName("rewardScreen")[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar1`)[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar2`)[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar3`)[0].style.opacity = 0;
    gametask.removeClassByClassName("rewardScreen", "showPrice");
    gametask.removeClassByQuerySelector("svg.redoBtn", "showBtn");
    gametask.removeClassByQuerySelector("svg.nextBtn", "showBtn");
  },
  redoBorder: () => {
    if(currentPage !== "gameBoardPage") return null;
    ui.undoFinishScreen();
    const click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel++;
    gametask.setGameLevelAndTips(gameLevel);
  },
  nextBoard: () => {
    const notOnBoard = currentPage !== "gameBoardPage";
    const hasAnotherLevel = gameLevel && settings.level_data[gameLevel + 1];
    if(notOnBoard || (hasAnotherLevel === false)) return null;
    ui.undoFinishScreen();
    const click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel+=2;
    gametask.setGameLevelAndTips(gameLevel);
  },
  click: () => {
    return clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
  },
  checkForGameBoardTextConditions: () => {
    if(pointsInArow > 10){
      boardText.showText("excellent");
    } else if (pointsInArow > 5) {
      boardText.showText("good");
    }
  },
  animateBombMovement: (boxNumber) => {
    const helper = document.querySelectorAll(".tool.selected > img")[0];
    const box = document.querySelectorAll(`.${boxNumber}`)[0];
    const boardHolder = document.getElementById("boardHolder");
    const {
      src, offsetHeight, offsetWidth, x, y
    } = helper;

    // position the image
    const node = document.createElement("img");
    document.getElementById("gameScreen").appendChild(node);
    node.id = "helperMovingImage"
    node.src = src;
    node.style.position = "absolute";
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.height = `${offsetHeight}px`;
    node.style.width = `${offsetWidth}px`;
    node.style.transform = "scale(2)";
    node.style.transition = "all 0.15s";

    // get position of box
    var rect = box.getBoundingClientRect();
    var position = {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };

    // move the image to the box
    const helperMovingImage = document.getElementById("helperMovingImage");
    helperMovingImage.style.transform = "scale(1.1)";
    helperMovingImage.style.left = `${position.left}px`;
    helperMovingImage.style.top = `${position.top}px`;

    setTimeout(() => {
      helperMovingImage.remove();
      if(boxInfo.getBorderCount(boxNumber) === 4){
        bomb.explodeBoxes(boxNumber);
      }
    }, 250)
  },
  animateStars: () => {
    setInterval(() => {
      let timeoutToNext = 0;
      const nums = [0, 1, 2];
      nums.forEach(num => {
        timeoutToNext += 100;
        setTimeout(() => {
          gametask.addClassByClassName(`star${num}`, `up`);
          setTimeout(() => {
            gametask.removeClassByClassName(`star${num}`, `up`);
          }, 400)
        }, timeoutToNext)
      })
    }, 4000)
  },
  animateDots: () => {
    setInterval(() => {
      const topRightDot = document.querySelectorAll(".topRightDot");
      const topLeftDot = document.querySelectorAll(".topLeftDot");
      const bottomRightDot = document.querySelectorAll(".bottomRightDot");
      const bottomLeftDot = document.querySelectorAll(".bottomLeftDot");
      const length = 36;
      for(let i = 0; i < length; i++){
        if(Math.random() < 0.5){
          topRightDot[i].classList.add("lighterDot");
          topLeftDot[i].classList.add("lighterDot");
          bottomRightDot[i].classList.add("lighterDot");
          bottomLeftDot[i].classList.add("lighterDot");
        } else {
          topRightDot[i].classList.remove("lighterDot");
          topLeftDot[i].classList.remove("lighterDot");
          bottomRightDot[i].classList.remove("lighterDot");
          bottomLeftDot[i].classList.remove("lighterDot");
        }
      }
    }, 2000);
  },
  displayNoClickIndicator: (boxNumber, lineClicked) => {
    const incorrectLineClick = (box, classToAdd) => {
      gametask.addClassByClassName(box, classToAdd);
      setTimeout(() => {
        gametask.removeClassByClassName(box, classToAdd);
      }, 1000);
    }

    const lineClickClass = {
      top: {
        thisBox: "cantClickTop",
        adjBox: "cantClickBottom"
      },
      right: {
        thisBox: "cantClickRight",
        adjBox: "cantClickLeft"
      },
      bottom: {
        thisBox: "cantClickBottom",
        adjBox: "cantClickTop"
      },
      left: {
        thisBox: "cantClickLeft",
        adjBox: "cantClickRight"
      }
    }

    incorrectLineClick(boxNumber, lineClickClass[lineClicked].thisBox);

    let adjacentBox = null;
    let adjBoxNumber = null;
    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      adjBoxNumber = `box${adjacentBox}`;
      incorrectLineClick(adjBoxNumber, lineClickClass[lineClicked].adjBox);
    }
  },
  togglePregameScreen: () => {
    if(gametask.hasClassByQuerySelector(".silverScreen", "hidePregameScreen")){
      gametask.removeClassByClassName("silverScreen", "hidePregameScreen")
    } else {
      gametask.addClassByClassName("silverScreen", "hidePregameScreen")
    }
  },
  uiPopulater: null,
  populateTheUI: () => {
    if(ui.uiPopulater === null){
      ui.populateBoard();
      ui.uiPopulater = 1;
    } else {
      clearTimeout(ui.uiPopulater);
      ui.uiPopulater = setTimeout(() => {
        ui.populateBoard();
      });
    }
    gametask.setTurnRestrictions();
    track.adjustScore();
  },
  showHelper: (boxNumber) => {
    tools.forEach(data => {
      if(data.name === selectedBombFunction) data.count--;
    });
    let explosionType;
    if(selectedBombFunction === "lion") explosionType = "isLionExplosion";
    if (selectedBombFunction === "cheetah") explosionType = "isCheetahExplosion";
    if (selectedBombFunction === "panther") explosionType = "isPantherExplosion";
    if (selectedBombFunction === "queen_makeda") explosionType = "isQueenMakedaExplosion";
    if(explosionType) gameBoard[boxNumber][explosionType] = true;
  },
  addHighlightToClickBox: (clickBox) => {
    setTimeout(() => {
      gametask.addClassByClassName(clickBox, "clickBox");
    }, 500)
  },
  toggleBombSelected: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    const classList = selectBombScreen.classList;
    if(classList.contains("showBoard")){
      selectBombScreen.classList.remove("showBoard")
    } else {
      selectBombScreen.classList.add("showBoard")
    }
  },
  doneBombSelected: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("showBoard");
    selectBombScreen.classList.add("playGame");
    if(!tools){
      tools = gametask.getTools();
    }
    const used = [];
    settings.itemsSelected.forEach(item => {
      const animalName = item.replace("buy_", "")
      let animal;
      if(animalName.includes("queen")){
        animal = {
          name: animalName,
          src: `./img/queens/asset_${animalName}.png`,
          count: 1
        }
      } else {
        animal = {
          name: animalName,
          src: `./img/color_animals/asset_${animalName}.png`,
          count: 1
        }
      }
      let isInTools = false;
      tools.forEach(data => {
        if(data.name === animalName){
          isInTools = true;
        }
      })
      if(!isInTools){
        tools = [
          ...tools,
          animal
        ]
        used.push(item);
      }
    })
    used.forEach(data => {
      const animalName = data.replace("buy_", "");
      const index = settings.itemsPurchased.indexOf(animalName);
      settings.itemsPurchased.splice(index, 1);
      const currentQuantity = settings.store[animalName].quantity;
      settings.store[animalName].quantity = currentQuantity - 1;
    })
    gametask.saveToLocalStorage("settings", settings);
    settings.itemsSelected = [];
    ui.populateHelpers();
  },
  selectPregameBomb: (selected) => {
    const animal = document.querySelector(`.${selected}.selectedBombForBoard`);
    if(animal){
      gametask.removeClassByQuerySelector(`.animalBombSelectBox.${selected}`, "selectedBombForBoard");
      const index = settings.itemsSelected.indexOf(selected);
      settings.itemsSelected.splice(index, 1)
    } else {
      gametask.addClassByQuerySelector(`.animalBombSelectBox.${selected}`, "selectedBombForBoard");
      settings.itemsSelected.push(selected);
    }
  },
  toggleConfirmScreen: () => {
    if(gametask.hasClassByClassName("buyItemContainer", "hidePurchaseScreen")){
      gametask.removeClassByClassName("buyItemContainer", "hidePurchaseScreen")
    } else {
      gametask.addClassByClassName("buyItemContainer", "hidePurchaseScreen")
    }
  }
}

window.boxInfo = {
  getGameBoardClickBox: (clickBox) => {
    return gameBoard[clickBox];
  },
  getSurroundingBoxesInfo: (clickBox, boxSide) => {
    return gameBoard[clickBox].surroundingBoxes[boxSide]
  },
  getSurroundingBoxesKeys: (clickBox) => {
    if(!Object.keys(boxInfo.getGameBoardClickBox(clickBox))){
      return null;
    }
    return Object.keys(boxInfo.getGameBoardClickBox(clickBox).surroundingBoxes);
  },
  isBoxDisabled: (box) => {
    return gameBoard[box].disabled === true;
  },
  getBorderCount: (box) => {
    const borders = gameBoard[box].borders;
    let count = 0;
    Object.keys(borders).forEach(data => {
      if (borders[data]) count++;
    })
    return count;
  },
  getSafeBoxes: () => {
    const safeClickBoxWithSide = [];
    const oneBorder = [...oneBorderBoxes];
    oneBorder.forEach(box => {
      oneBorderBoxes.splice(oneBorderBoxes.indexOf(box), 1);
      const edgeBox = boxInfo.edgeBox(box);
      if (edgeBox.hasEdgeBox) { // task takes care of the corner cases by clicked its empty side
        safeClickBoxWithSide.push({
          clickBox: box,
          clickSide: edgeBox.clickSide
        });
      } else {
        const surroundingOnBorderBoxes = boxInfo.getSurroundingBoxes(box).filter(data => oneBorderBoxes.includes(data));
        surroundingOnBorderBoxes.forEach(data => {
          const adjObj = boxInfo.isAdjacentBoxesConnected(box, data);
          if (adjObj.isConnected) {
            safeClickBoxWithSide.push({
              clickBox: box,
              clickSide: adjObj.side
            });
          }
        });
      }
    })
    return safeClickBoxWithSide;
  },
  getAllBoxClasses: (box) => {
    const classesToAdd = ["box", "flexRow", box];

    if (gameBoard[box].borders.top){
      if(whoClickedLine[box].top === "computer"){
        classesToAdd.push("borderTopComputer")
      } else {
        classesToAdd.push("borderTop")
      }
    }
    if (gameBoard[box].borders.right){
      if(whoClickedLine[box].right === "computer"){
        classesToAdd.push("borderRightComputer")
      } else {
        classesToAdd.push("borderRight")
      }
    }
    if (gameBoard[box].borders.bottom){
      if(whoClickedLine[box].bottom === "computer"){
        classesToAdd.push("borderBottomComputer")
      } else {
        classesToAdd.push("borderBottom")
      }
    }
    if (gameBoard[box].borders.left){
      if(whoClickedLine[box].left === "computer"){
        classesToAdd.push("borderLeftComputer")
      } else {
        classesToAdd.push("borderLeft")
      }
    }

    if (gameBoard[box].whoScored) classesToAdd.push(gameBoard[box].whoScored);

    if (gameBoard[box].isLionExplosion) {
      classesToAdd.push("isLionExplosion");
    } else if (gameBoard[box].isCheetahExplosion) {
      classesToAdd.push("isCheetahExplosion");
    } else if (gameBoard[box].isPantherExplosion) {
      classesToAdd.push("isPantherExplosion");
    } else if (gameBoard[box].isQueenMakedaExplosion) {
      classesToAdd.push("isQueenMakedaExplosion");
    }

    const sideClasses = [
      "isTopRightCornerBox", "isTopLeftCornerBox",
      "isBottomRightCornerBox", "isBottomLeftCornerBox",
      "isTopSideRow", "isRightSideRow",
      "isBottomSideRow", "isLeftSideRow"
    ];

    sideClasses.forEach(className => {
      if(gameBoard[box][className]){
        classesToAdd.push(className);
      }
    })

    if(gameBoard[box].isLocked === true){
      classesToAdd.push("locked");
    }

    if(boxInfo.isBoxDisabled(box)){
      classesToAdd.push("disabled");
    }

    return classesToAdd;
  },
  getUnclickedBorders: (box) => {
    const bordersArray = [];
    const borders = gameBoard[box].borders;
    Object.keys(borders).forEach(data => {
      if (!borders[data]) bordersArray.push(data);
    })
    return bordersArray;
  },
  getClickedBorders: (box) => {
    const bordersArray = [];
    const borders = gameBoard[box].borders;
    Object.keys(borders).forEach(data => {
      if (borders[data]) bordersArray.push(data);
    })
    return bordersArray;
  },
  adjustBorderCountArrays: () => {
    boxInfo.clearBorderArrays();
    for (let box in gameBoard) {
      if(!boxInfo.isBoxDisabled(box)){
        const borderCount = boxInfo.getBorderCount(box);
        if (boxInfo.countsAsNoBorders(box, borderCount)) noBorders.push(box);
        else if (boxInfo.countsAsOneBorders(box, borderCount)) oneBorderBoxes.push(box);
        else if (boxInfo.countsAsTwoBorders(box, borderCount)) twoBorderBoxes.push(box)
        else if (boxInfo.countsAsThreeBorders(box, borderCount)) threeBorderBoxes.push(box);
      }
    }
  },
  countsAsNoBorders: (box, borderCount) => {
    if(boxInfo.isALockBox(box)) return false;
    return (borderCount === 0);
  },
  countsAsOneBorders: (box, borderCount) => {
    if(boxInfo.isALockBox(box)) return false;
    return (borderCount === 1);
  },
  countsAsTwoBorders: (box, borderCount) => {
    if(boxInfo.isALockBox(box)) return false;
    return (borderCount === 2);
  },
  countsAsThreeBorders: (box, borderCount) => {
    if(boxInfo.isALockBox(box)) return false;
    return (borderCount === 3);
  },
  isAdjBoxALockBox: (box, side) => {
    const adjBox = boxInfo.getAdjBoxBySide(box, side);
    return boxInfo.isALockBox(adjBox);
  },
  getAdjBoxBySide: (box, side) => {
    const boxNumber = parseInt(box.replace("box", ""))
    let adjBox;
    if(side === "top"){
      adjBox = boxInfo.getTopBox(boxNumber);
    } else if(side === "left"){
      adjBox = boxInfo.getLeftBox(boxNumber);
    } else if(side === "bottom"){
      adjBox = boxInfo.getBottomBox(boxNumber);
    } else if(side === "right"){
      adjBox = boxInfo.getRightBox(boxNumber);
    }
    return adjBox;
  },
  isALockBox: (box) => {
    const allBombs = [];
    lockBombLocations.forEach(data => allBombs.push(data.box));
    return allBombs.includes(box);
  },
  clearBorderArrays: () => {
    noBorders.length = 0;
    oneBorderBoxes.length = 0;
    twoBorderBoxes.length = 0
    threeBorderBoxes.length = 0;
  },
  isAdjacentBoxesConnected: (box1, box2) => {
    const adjObj = {
      isConnected: false
    }
    const bordersBox2 = boxInfo.getGameBoardClickBox(box2).borders;
    const surroundingBoxes = boxInfo.getGameBoardClickBox(box1).surroundingBoxes;
    boxInfo.getSurroundingBoxesKeys(box1).forEach(data => {
      const complement = boxInfo.complementBorder[data.replace("Box", "")];
      if (surroundingBoxes[data] && (`box${surroundingBoxes[data].boxNumber}` === box2) && (bordersBox2[complement] === null)) {
        adjObj.isConnected = true;
        adjObj.side = data.replace("Box", "");
      }
    })
    return adjObj;
  },
  edgeBox: (clickBox) => { // return an edge box
    let edgeBox = {
      hasEdgeBox: false,
      clickSide: null
    };
    const surroundingBoxesKeys = boxInfo.getSurroundingBoxesKeys(clickBox);
    const clickBoxObj = boxInfo.getGameBoardClickBox(clickBox);
    surroundingBoxesKeys.forEach(data => {
      if ((clickBoxObj.surroundingBoxes[data] === null) && (clickBoxObj.borders[data.replace("Box", "")] === null)) {
        edgeBox.hasEdgeBox = true;
        edgeBox.clickSide = data.replace("Box", "");
      }
    })
    return edgeBox;
  },
  isEdgeBox: (box) => {
    const boxInfo = gameBoard[box];
    if(boxInfo.disabled) return false;

    if(boxInfo.isTopRightCornerBox
    || boxInfo.isTopLeftCornerBox
    || boxInfo.isBottomRightCornerBox
    || boxInfo.isBottomLeftCornerBox
    || boxInfo.isTopSideRow
    || boxInfo.isRightSideRow
    || boxInfo.isBottomSideRow
    || boxInfo.isLeftSideRow) {
      return true;
    }

    return false;
  },
  getLineBetweenBoxes: (clickBox, selectedBox) => {
    let selectedSide = null;
    boxInfo.getSurroundingBoxesKeys(clickBox).forEach(data => {
      const number = (boxInfo.getSurroundingBoxesInfo(clickBox, data)) ? boxInfo.getSurroundingBoxesInfo(clickBox, data).boxNumber : null;
      if (selectedBox === `box${number}`) {
        selectedSide = data
      }
    });
    return selectedSide;
  },
  getLessThanOneBorderNonConnectedSurroundingBoxes: (clickBox) => {
    const surroundingBoxes = boxInfo.getSurroundingBoxes(clickBox);
    const matchingBoxes = [];
    surroundingBoxes.map(data => {
      const borders = boxInfo.getBorderCount(data);
      if (borders <= 1) matchingBoxes.push(data);
    })
    return matchingBoxes;
  },
  getSurroundingBoxes: (clickBox) => {
    const surroundingBoxes = [];
    boxInfo.getSurroundingBoxesKeys(clickBox).forEach(data => {
      if (boxInfo.getSurroundingBoxesInfo(clickBox, data)) surroundingBoxes.push(boxInfo.getSurroundingBoxesInfo(clickBox, data).boxNumber);
    })
    return surroundingBoxes.filter(data => data).map(box => `box${box}`);
  },
  getOneBorderConnectedSurroundingBoxes: (box) => {
    const oneBorderConnectedSurroundingBoxes = [];
    const connectedSurroundingBoxes = boxInfo.getSurroundingBoxes(box).filter(adjBox => boxInfo.isAdjacentBoxesConnected(box, adjBox).isConnected);
    connectedSurroundingBoxes.forEach(surBox => {
      if (boxInfo.getBorderCount(surBox) === 1) {
        oneBorderConnectedSurroundingBoxes.push(surBox);
      }
    });
    return oneBorderConnectedSurroundingBoxes;
  },
  getConnectedBoxes: (box) => {
    const connectedBoxes = [];
    const surroundingBoxes = boxInfo.getSurroundingBoxes(box);
    surroundingBoxes.forEach(surBox => {
      if (boxInfo.isAdjacentBoxesConnected(box, surBox).isConnected) {
        connectedBoxes.push(surBox)
      }
    })
    return connectedBoxes;
  },
  getAllBorders: (box) => {
    return {
      topRightBoxNumber: boxInfo.getTopRightBoxNumber(box),
      topLeftBoxNumber: boxInfo.getTopLeftBoxNumber(box),
      bottomRightBoxNumber: boxInfo.getBottomRightBoxNumber(box),
      bottomLeftBoxNumber: boxInfo.getBottomLeftBoxNumber(box),
      topBox: boxInfo.getTopBox(box),
      leftBox: boxInfo.getLeftBox(box),
      bottomBox: boxInfo.getBottomBox(box),
      rightBox: boxInfo.getRightBox(box)
    }
  },
  getTopRightBoxNumber: (box) => {
    const topRightBoxNumber = box - (rowLength - 1);
    return boxInfo.hasTopRightBoxNumber(`box${topRightBoxNumber}`, `box${box}`) ? `box${topRightBoxNumber}` : false;
  },
  getTopLeftBoxNumber: (box) => {
    const topLeftBoxNumber = box - (rowLength + 1);
    return boxInfo.hasTopLeftBoxNumber(`box${topLeftBoxNumber}`, `box${box}`) ? `box${topLeftBoxNumber}` : false;
  },
  getBottomRightBoxNumber: (box) => {
    const bottomRightBoxNumber = box + (rowLength + 1);
    return boxInfo.hasBottomRightBoxNumber(`box${bottomRightBoxNumber}`, `box${box}`) ? `box${bottomRightBoxNumber}` : false;
  },
  getBottomLeftBoxNumber: (box) => {
    const bottomLeftBoxNumber = box + (rowLength - 1);
    return boxInfo.hasBottomLeftBoxNumber(`box${bottomLeftBoxNumber}`, `box${box}`) ? `box${bottomLeftBoxNumber}` : false;
  },
  getTopBox: (box) => {
    const topBox = box - rowLength;
    return boxInfo.hasTopBox(`box${topBox}`, `box${box}`) ? `box${topBox}` : false;
  },
  getLeftBox: (box) => {
    const leftBox = box - 1;
    return boxInfo.hasLeftBox(`box${leftBox}`, `box${box}`) ? `box${leftBox}` : false;
  },
  getBottomBox: (box) => {
    const bottomBox = box + rowLength;
    return boxInfo.hasBottomBox(`box${bottomBox}`, `box${box}`) ? `box${bottomBox}` : false;
  },
  getRightBox: (box) => {
    const rightBox = box + 1;
    return boxInfo.hasRightBox(`box${rightBox}`, `box${box}`) ? `box${rightBox}` : false;
  },
  hasTopRightBoxNumber: (topRightBoxNumber, box) => {
    return (
      gameBoard[topRightBoxNumber] &&
      !gameBoard[box].isTopRightCornerBox &&
      !gameBoard[box].isTopSideRow &&
      !gameBoard[box].isTopLeftCornerBox &&
      !gameBoard[box].isRightSideRow &&
      !gameBoard[box].isBottomRightCornerBox
    )
  },
  hasTopLeftBoxNumber: (topLeftBoxNumber, box) => {
    return (
      gameBoard[topLeftBoxNumber] &&
      !gameBoard[box].isTopSideRow &&
      !gameBoard[box].isTopLeftCornerBox &&
      !gameBoard[box].isTopRightCornerBox &&
      !gameBoard[box].isLeftSideRow &&
      !gameBoard[box].isBottomLeftCornerBox
    )
  },
  hasBottomRightBoxNumber: (bottomRightBoxNumber, box) => {
    return (
      gameBoard[bottomRightBoxNumber] &&
      !gameBoard[box].isTopRightCornerBox &&
      !gameBoard[box].isRightSideRow &&
      !gameBoard[box].isBottomRightCornerBox &&
      !gameBoard[box].isBottomSideRow &&
      !gameBoard[box].isBottomLeftCornerBox
    )
  },
  hasBottomLeftBoxNumber: (bottomLeftBoxNumber, box) => {
    return (
      gameBoard[bottomLeftBoxNumber] &&
      !gameBoard[box].isTopLeftCornerBox &&
      !gameBoard[box].isLeftSideRow &&
      !gameBoard[box].isBottomLeftCornerBox &&
      !gameBoard[box].isBottomSideRow &&
      !gameBoard[box].isBottomRightCornerBox
    )
  },
  hasTopBox: (topBox, box) => {
    return (
      gameBoard[topBox] &&
      !gameBoard[box].isTopRightCornerBox &&
      !gameBoard[box].isTopSideRow &&
      !gameBoard[box].isTopLeftCornerBox
    )
  },
  hasLeftBox: (leftBox, box) => {
    return (
      gameBoard[leftBox] &&
      !gameBoard[box].isTopLeftCornerBox &&
      !gameBoard[box].isLeftSideRow &&
      !gameBoard[box].isBottomLeftCornerBox
    )
  },
  hasBottomBox: (bottomBox, box) => {
    return (
      gameBoard[bottomBox] &&
      !gameBoard[box].isBottomLeftCornerBox &&
      !gameBoard[box].isBottomSideRow &&
      !gameBoard[box].isBottomRightCornerBox
    )
  },
  hasRightBox: (rightBox, box) => {
    return (
      gameBoard[rightBox] &&
      !gameBoard[box].isTopRightCornerBox &&
      !gameBoard[box].isRightSideRow &&
      !gameBoard[box].isBottomRightCornerBox
    )
  },
  getBordersToRemove: (
    box, {
      topRightBoxNumber,
      topLeftBoxNumber,
      bottomRightBoxNumber,
      bottomLeftBoxNumber,
      topBox,
      leftBox,
      bottomBox,
      rightBox
    }) => {
    return [{
        box: box,
        lines: ["top", "right", "bottom", "left"]
      },
      {
        box: topRightBoxNumber,
        lines: ["bottom", "left"]
      },
      {
        box: topLeftBoxNumber,
        lines: ["right", "bottom"]
      },
      {
        box: bottomRightBoxNumber,
        lines: ["top", "left"]
      },
      {
        box: bottomLeftBoxNumber,
        lines: ["top", "right"]
      },
      {
        box: topBox,
        lines: ["right", "bottom", "left"]
      },
      {
        box: leftBox,
        lines: ["top", "right", "bottom"]
      },
      {
        box: bottomBox,
        lines: ["top", "right", "left"]
      },
      {
        box: rightBox,
        lines: ["top", "bottom", "left"]
      }
    ];
  },
  getRowClick: (positionFromTopOfGameBoard, heightOfBoxes) => {
    let row = (positionFromTopOfGameBoard/heightOfBoxes);
    // collaboration of row
    if(row < 0.9){ row = 0; }
    else if(row < 1 && row > 0.9){ row = 1; }
    else if(row < 2 && row > 1.88){ row = 2; }
    else if(row < 3 && row > 2.85){ row = 3; }
    else if(row < 4 && row > 3.76){ row = 4; }
    return Math.floor(row);
  },
  getEdgeBoxClickPosition: (positionFromTopOfGameBoard, heightOfBoxes) => {
    const row = boxInfo.getRowClick(positionFromTopOfGameBoard, heightOfBoxes);
    const rowInformation = {
      row0: [], row1: [], row2: [],
      row3: [], row4: [], row5: []
    };
    for(let i = 0; i < 36; i++){
      const box = `box${i}`;
      if(!boxInfo.isEdgeBox(box)) continue;
      if(i < 6){rowInformation.row0.push(box)}
      else if (i < 12) {rowInformation.row1.push(box)}
      else if (i < 18) {rowInformation.row2.push(box)}
      else if (i < 24) {rowInformation.row3.push(box)}
      else if (i < 30) {rowInformation.row4.push(box)}
      else if (i < 36) {rowInformation.row5.push(box)}
    }
    const rowInfoWithEdgePositions = [];
    for(let fullRow in rowInformation){
      if(rowInformation[fullRow].length === 0) continue;
      rowInformation[fullRow].forEach(thisBox => {
        const positionClickInfo = {};
        positionClickInfo.box = thisBox;
        const box = document.getElementsByClassName(thisBox);
        const zoom = 0.96;
        const gameBoardPositionX = box[0].getBoundingClientRect().x * zoom;
        const gameBoardPositionY = box[0].getBoundingClientRect().y * zoom;
        const height = gametask.getHeightWithClassName(thisBox);
        const width = gametask.getWidthWithClassName(thisBox);
        const boardHolderWidth = gametask.getWidthWithId("boardHolder");
        const offset = lineClickOffset;

        const topClickOffset = {
          xRange: {min: gameBoardPositionX, max: gameBoardPositionX + width},
          yRange: {min: gameBoardPositionY - offset, max: gameBoardPositionY}
        };
        const rightClickOffset = {
          xRange: {min: gameBoardPositionX + width, max: gameBoardPositionX + width + offset},
          yRange: {min: gameBoardPositionY, max: gameBoardPositionY + height}
        };
        const bottomClickOffset = {
          xRange: {min: gameBoardPositionX, max: gameBoardPositionX + width},
          yRange: {min: gameBoardPositionY + height, max: gameBoardPositionY + height + offset}
        };
        const leftClickOffset = {
          xRange: {min: gameBoardPositionX - offset, max: gameBoardPositionX},
          yRange: {min: gameBoardPositionY, max: gameBoardPositionY + height}
        };

        const boxInfo = gameBoard[thisBox];

        if(boxInfo.isTopRightCornerBox) {
          positionClickInfo.ySide = "top";
          positionClickInfo.xSide = "right";
          positionClickInfo.outsideClickRange = [rightClickOffset, topClickOffset];
        }
        if(boxInfo.isTopLeftCornerBox) {
          positionClickInfo.ySide = "top";
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, topClickOffset];
        }
        if(boxInfo.isBottomRightCornerBox) {
          positionClickInfo.xSide = "right";
          positionClickInfo.ySide = "bottom";
          positionClickInfo.outsideClickRange = [rightClickOffset, bottomClickOffset];
        }
        if(boxInfo.isBottomLeftCornerBox) {
          positionClickInfo.ySide = "bottom";
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, bottomClickOffset];
        }
        if(boxInfo.isTopSideRow) {
          positionClickInfo.ySide = "top";
          positionClickInfo.outsideClickRange = [null, topClickOffset];
        }
        if(boxInfo.isRightSideRow) {
          positionClickInfo.xSide = "right";
          positionClickInfo.outsideClickRange = [rightClickOffset, null];
        }
        if(boxInfo.isBottomSideRow) {
          positionClickInfo.ySide = "bottom";
          positionClickInfo.outsideClickRange = [null, bottomClickOffset];
        }
        if(boxInfo.isLeftSideRow) {
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, null];
        }

        rowInfoWithEdgePositions.push(positionClickInfo);
      })
    }
    return rowInfoWithEdgePositions;
  },
  getEdgeBoxClicked: (rowInfoWithEdgePositions, pageClickPositionX, pageClickPositionY) => {
    let boxClicked = false;
    let sideClicked = false;
    const length = rowInfoWithEdgePositions.length;
    for(let i = 0; i < length; i++){
      const edgeBoxObject = rowInfoWithEdgePositions[i];
      const outsideClickRange = edgeBoxObject.outsideClickRange;
      const len = outsideClickRange.length;
      for(let j = 0; j < len; j++){
        if(outsideClickRange[j]){
          const {xRange, yRange} = outsideClickRange[j];
          const isInXRange = (xRange.min < pageClickPositionX && xRange.max > pageClickPositionX);
          const isInYRange = (yRange.min < pageClickPositionY && yRange.max > pageClickPositionY);
          if(isInXRange && isInYRange){
            boxClicked = rowInfoWithEdgePositions[i].box;
            sideClicked = (j === 0) ?
                          rowInfoWithEdgePositions[i].xSide :
                          rowInfoWithEdgePositions[i].ySide;
          }
        }
      }
    }
    return {
      boxClicked,
      sideClicked
    }
  },
  complementBorder: {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  },
  getBoxNumberFromBoxX: (box) => {
    return parseInt(box.replace("box", ""));
  },
  isABomb: (box) => {
    let hasExplosion = false;
    const classes = document.querySelector(`.${box}`).classList;
    for(index in classes){
      const num = parseInt(index);
      const isIndex = isNaN(num);
      const hasAnExplosion = !isIndex ? classes[index].indexOf("Explosion") : false;
      if(hasAnExplosion && hasAnExplosion !== -1){
        hasExplosion = true;
      }
    }
    return hasExplosion;
  },
  hasClickBorderPreviously: (boxNumber, lineClicked) => {
    return (gameBoard[boxNumber].borders[lineClicked] === true);
  },
  setLineAsClicked: (boxNumber, lineClicked) => {
    gameBoard[boxNumber].borders[lineClicked] = true;
  },
  setLineColor: (boxNumber, lineClicked) => {
    if(!isFirstPlayerTurn){
      whoClickedLine[boxNumber][lineClicked] = "computer"
    }
  },
  highlightBoxIfScored: (boxNumber) => {
    if (boxInfo.getBorderCount(boxNumber) === 4) {
      if(!boxInfo.isABomb(boxNumber)){
        takeAnotherTurn = true;
      } else {
        takeAnotherTurn = false;
      }
      gameBoard[boxNumber].whoScored = isFirstPlayerTurn ? "firstPlayerScored" : "secondPlayerScored";
      if(isFirstPlayerTurn){
        pointsInArow++;
        ui.checkForGameBoardTextConditions();
      }
      soundEffects.playScoreSound();
    }
  }
}

window.bomb = {
  types: [
    { key: "isLionExplosion", class: "isLionExplosion" },
    { key: "isCheetahExplosion", class: "isCheetahExplosion" },
    { key: "isPantherExplosion", class: "isPantherExplosion" },
    { key: "isQueenMakedaExplosion", class: "isQueenMakedaExplosion" }
  ],
  isExplosionBox: (box) => {
    let isBombBox = false;
    bomb.types.forEach(data => {
      const className = data.class;
      const isBomb = document.getElementsByClassName(box)[0]
                   ? document.getElementsByClassName(box)[0].classList.contains(className)
                   : false;
      if(isBomb) isBombBox = true;
    });
    return isBombBox;
  },
  populationData: [],
  fillPopulationData: () => {
    bomb.populationData = [];
    let useTurns = [];
    if(bombsToLay > 0){
      while(useTurns.length < bombsToLay * 2){
        const randomNumber = Math.floor(Math.random()*30) + track.turn;
        const filtered = [];
        for(let box in gameBoard){
          if(!gameBoard[box].disabled) filtered.push(box);
        }
        const boxNumber = filtered[Math.floor(Math.random()*(gameBoardLength - 1))];
        if(!useTurns.includes(randomNumber) && !useTurns.includes(boxNumber)){
          useTurns = [...useTurns, boxNumber, randomNumber];
          bomb.populationData.push({randomNumber, boxNumber});
        }
      }
    }
  },
  bombPopulation: () => {
    let boxNumber;
    bomb.populationData.some(data => {
      boxNumber = (data.randomNumber === track.turn) ? data.boxNumber : boxNumber;
      return data.randomNumber === track.turn
    });
    if(boxNumber && (boxInfo.getBorderCount(boxNumber) !== 4)){
      bomb.placeBomb(boxNumber);
    }
  },
  showExplosionInBox: (box, type, seconds) => {
    if(type !== "smoke") bomb.explodeLockBoxIfHit(box);
    gametask.removeClassByQuerySelector(`.${box}Explosion`, "hideExplosion");
    document.querySelector(`.${box}Explosion`).src = `./gifs/${type}.gif`;
    setTimeout(() => {
      explodingBoxes.pop();
      taks.addClassByClassName(`${box}Explosion`, "hideExplosion")
    }, seconds);
  },
  explodeLockBoxIfHit: (box) => {
    if(boxInfo.isALockBox(box)) {
      let index;
      lockBombLocations.forEach((data, i) => {
        if(data.box === box){
          index = i;
        }
      })
      if(index || index === 0){
        lockBombLocations[index].toughness--;
        if(lockBombLocations[index].toughness <= 0){
          setTimeout(() => {
            let newIndex;
            lockBombLocations.forEach((data, index) => {
              if(data.box === box){
                newIndex = index
              }
            })
            lockBombLocations.splice(newIndex, 1);
            gametask.removeClassByQuerySelector(`.box.${box}`, "locked")
          }, 300);
        }
      }
    };
  },
  placeBomb: (boxNumber) => {
    //wait for explosions to stop before placing bomb
    if(bomb.isExploding.length === 0){
      setTimeout(() => {
        let explosion = bomb.types[0];
        const number = Math.floor(Math.random() * 100);
        if(number > 66){ explosion = bomb.types[0]; }
        else if(number > 33){ explosion = bomb.types[1]; }
        else { explosion = bomb.types[2]; }
        if(!bomb.isExplosionBox(boxNumber) && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber)){
          // track.decrementBombCount();
          soundEffects.playShowBombSound();
          document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class);
          bomb.showSpriteSmoke(boxNumber);
          setTimeout(() => {
            gameBoard[boxNumber][explosion.key] = true;
            ui.populateTheUI();
          }, 100)
        } else {
          // track.incrementMissedBombCount();
          const missedBox = {
            missedBox: true,
            box: boxNumber
          }
        }
      }, 400)
    } else {
      bomb.placeBomb()
    }
  },
  explodeBoxes: (box) => {
    if (gameBoard[box].isLionExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isLionExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.lion.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isCheetahExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isCheetahExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.cheetah.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isPantherExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isPantherExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.panther.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isQueenMakedaExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isQueenMakedaExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.queen_makeda.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    }
    ui.populateTheUI();
  },
  checkForChainReactions: (boxesToCheck) => {
    setTimeout(() => {
      boxesToCheck.forEach(box => {
        if(box){
          bomb.explodeBoxes(box)
        }
      })
    }, 80 * 4)
  },
  allExplodingBoxes: [],
  fillExplodingBoxes: (box) => {
    bomb.allExplodingBoxes.push(box);
    setTimeout(() => {
      bomb.allExplodingBoxes.pop();
    })
  },
  explodeBoxesFromArray: (linesToRemove, box) => {
    linesToRemove.forEach(item => {
      if (item.box) {
        bomb.fillExplodingBoxes(item.box);
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box);
        if(!bomb.isExploding.includes(item.box)) {
          bomb.isExploding.push(item.box);
          bomb.showSpriteExplosion(item.box);
        }
      }
    });
  },
  isExploding: [],
  showSpriteExplosion: (box) => {
    gametask.removeClassByQuerySelector(`.${box} > .spriteSheet`, "smokeGif");
    setTimeout(() => {
      gametask.addClassByQuerySelector(`.${box} > .spriteSheet`, "explosionGif");
    })
    setTimeout(() => {
      gametask.removeClassByQuerySelector(`.${box} > .spriteSheet`, "explosionGif");
      // remove the box from the exploding array
      bomb.isExploding.pop();
    }, 800);
    bomb.explodeLockBoxIfHit(box);
  },
  showSpriteSmoke: (box) => {
    gametask.addClassByQuerySelector(`.${box} > .spriteSheet`, "smokeGif");
    setTimeout(() => {
      gametask.removeClassByQuerySelector(`.${box} > .spriteSheet`, "smokeGif");
    }, 800);
  }
}

window.lockBoxes = [
  2, 3, 4, 5, 5, 7, 9, 10,
  8, 12, 14
]

// this file contains the exploding patterns of the animal bombs
window.animalExplosions = {
  lion: { // exploding pattern for the lion
    boxes: (box) => {
      /*
        explodes around animal
        ex:    6   7   8
              12  13  14
              18  19  20
      */

      // cache every box that will be exploded
      const temp = lionSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const topLeftBoxNumber = lionSquares[box][0];
      const topBox = lionSquares[box][1];
      const topRightBoxNumber = lionSquares[box][2];
      const leftBox = lionSquares[box][3];
      const thisBox = lionSquares[box][4];
      const rightBox = lionSquares[box][5];
      const bottomLeftBoxNumber = lionSquares[box][6];
      const bottomBox = lionSquares[box][7];
      const bottomRightBoxNumber = lionSquares[box][8];

      // match the boxes with the lines that will be remove and a result of the explosion
      const linesToRemove = [
        { box: `box${topRightBoxNumber}`, lines: ["bottom", "left"] },
        { box: `box${topLeftBoxNumber}`, lines: ["bottom", "right"] },
        { box: `box${bottomRightBoxNumber}`, lines: ["top", "left"] },
        { box: `box${bottomLeftBoxNumber}`, lines: ["top", "right"] },
        { box: `box${topBox}`, lines: ["right", "bottom", "left"] },
        { box: `box${rightBox}`, lines: ["top", "bottom", "left"] },
        { box: `box${bottomBox}`, lines: ["top", "right", "left"] },
        { box: `box${leftBox}`, lines: ["top", "right", "bottom"] },
        { box: `box${thisBox}`, lines: ["top", "right", "bottom", "left"] }
      ].filter(data => data.box !== "boxnull");

      return {
        linesToRemove,
        boxesToExplode
      }
    }
  },
  cheetah: {
    boxes: (box) => {
      /*
        explodes animal column
        ex:    0 1 2 3 4 5
      */

      const temp = cheetahSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["right", "left"]
        })
      });

      return {
        linesToRemove,
        boxesToExplode
      }
    }
  },
  panther: {
    boxes: (box) => {
      /*
        explodes animal row
        ex:    0
               6
              12
              18
              24
              30
      */

      const temp = pantherSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["top", "bottom"]
        })
      });

      return {
        linesToRemove,
        boxesToExplode
      }
    }
  },
  queen_makeda: {
    boxes: (box) => {
      const temp = queen_makedaSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const linesToRemove = [];
      boxesToExplode.forEach((data, index) => {
        const lines = (index < 6) ? ["left", "right"] : ["top", "bottom"];
        linesToRemove.push({
          box: data,
          lines
        })
      });

      return {
        linesToRemove,
        boxesToExplode
      }
    }
  }
}

window.boardText = {
  text: {
    // bad: ["Oh Nah", "You drawlin", "Haah... got em", "You tripin", "Bruh"],
    bad: ["Haah... got em"],
    // good: ["I see u", "Lets get it", "Chill", "Iiight"],
    good: ["I see u"],
    // excellent: ["Okurrrr", "Yarrrrpp", "Aaaaaa", "You hyyyype"]
    excellent: ["Ooo Yes"]
  },
  getBadText: () => {
    return gametask.getRandomIndexInArray(boardText.text.bad);
  },
  getGoodText: () => {
    return gametask.getRandomIndexInArray(boardText.text.good);
  },
  getExcellentText: () => {
    return gametask.getRandomIndexInArray(boardText.text.excellent);
  },
  showText: (type) => {
    let text;
    if(type === "bad"){
      if(textType === "bad") return null;
      text = boardText.getBadText();
      soundEffects.play("got em/got em.m4a");
    } else if (type === "good") {
      if(textType === "good") return null;
      text = boardText.getGoodText();
      soundEffects.play("jasmin/i see u.m4a");
    } else if (type === "excellent") {
      if(textType === "excellent") return null;
      text = boardText.getExcellentText();
      soundEffects.play("jasmin/yes.m4a");
    }
    textType = type;
    boardText.showOnBoard(text, 2000);
  },
  showOnBoard: (text, adjustTimeout) => {
    gametask.addTextByQuerySelector(".interactiveText p", text);
    gametask.addClassByQuerySelector(".interactiveText p", "showText")
    setTimeout(() => {
      gametask.addTextByQuerySelector(".interactiveText p", "");
      gametask.removeClassByQuerySelector(".interactiveText p", "showText")
    }, adjustTimeout || 2000);
  }
}

window.track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
  },
  goToPage: (page) => {
    tools = null;
    currentPage = page;
    const allPages = document.getElementsByClassName("page");
    for(let i = 0; i < allPages.length; i++){
      allPages[i].classList.add("removePage");
    }
    const pageToShow = document.getElementsByClassName(page)[0];
    pageToShow.classList.remove("removePage");
    ui.setSettingsIfOnSettingsPage(page);
    if(page === "gameBoardPage"){
      gametask.resizeBoard();
      ui.populateBombSelectionScreen();
    } else {
      on_game_board = false;
    }

    if(page === "storePage"){
      ui.populateStore();
    }
  },
  youLose: () => {
    console.log("you lose")
  },
  setScores: () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    for(let box in gameBoard){
      const personToScore = gameBoard[box].whoScored;
      if( personToScore === "firstPlayerScored"){
        playerOneScore++;
      } else if(personToScore === "secondPlayerScored"){
        playerTwoScore++;
      }
    }
  },
  adjustScore: (boxNumber, adjacentBoxNumber) => {
    track.setScores();

    document.getElementsByClassName("playerOneScore")[0].innerText = playerOneScore;
    document.getElementsByClassName("playerTwoScore")[0].innerText = playerTwoScore;

    const score = (box) => {
      if (!track.hasScored(box)) return null; // check to see if player scored a point
      bomb.explodeBoxes(box);
    }

    if (boxNumber) score(boxNumber);
    if (adjacentBoxNumber) score(adjacentBoxNumber);
  },
  hasScored: (boxNumber) => {
    const isTopClicked = gameBoard[boxNumber].borders.top;
    const isRightClicked = gameBoard[boxNumber].borders.right;
    const isBottomClicked = gameBoard[boxNumber].borders.bottom;
    const isLeftClicked = gameBoard[boxNumber].borders.left;
    return (isTopClicked && isRightClicked && isBottomClicked && isLeftClicked);
  },
  decrementBombCount: () => {
    bombsToLay--;
    // track.setRemainingBombs();
  },
  setRemainingBombs: () => {
    gametask.addTextByQuerySelector(".remainingBombs", bombsToLay);
  },
  incrementMissedBombCount: () => {
    const text = gametask.getTextByQuerySelector(".missedBombs");
    let missedBombs = parseInt(text);
    missedBombs++;
    gametask.addTextByQuerySelector(".missedBombs", missedBombs);
    track.decrementBombCount();
  },
  screenText: () => {
    showTextUsed = true;
    setTimeout(() => {
      showTextUsed = false; // prevents multiple calls for screen text
    }, timeToWaitBetweenText)
  }
}

// will contain boxes with no lines clicked
const noBorders = [];
// will contain boxes with one line clicked
const oneBorderBoxes = [];
// will contain boxes with two lines clicked
const twoBorderBoxes = [];
// will contain boxes with three lines clicked
const threeBorderBoxes = [];

//store item selected
const storeItemSelected = {}

// offset from line to be considered a line click
const lineClickOffset = 12;

// tracks who click the line
let whoClickedLine = gametask.breakRefAndCopy(whoClickTheLine);

// this is the selected animal to be placed on the board from the help section
let selectedBombFunction;

// these are the players' scores
let playerOneScore = 0;
let playerTwoScore = 0;

// the amount of boxes on the board
let gameBoardLength;
//tot maximum amount of the boxes in each row
let rowLength = 6;
// the ibformtaion for each box on the game board
let gameBoard;
// the current game level we are on
let gameLevel;
// all infoemation for the current level
let getGameLevelObj;

// trcak if a play has score (used to determin the player turn)
let takeAnotherTurn = false;
// will be tru if first player turn
let isFirstPlayerTurn = true;
// disable the computer while debugging
let disableComputer = false;
// track previously used boardtext type to avoid resaying the same type in a row
let textType;
// help to take another turn after laying a bomb
let layedBomb;
// has clicked a bomb
let clickedExplosion;
// help to passTurn during computer move
let computerHasScored = false;

// tracks points scored and used with gameBoardLength to determine if the game is over
let totalPointsScored = 0;
// tools that are being use in game
let tools;
// this is the currently exploding boex
let explodingBoxes = [];
// amount aof bomb that will be layed in the game
let bombsToLay = 0;
// all lock box locations on the board
let lockBombLocations = [];
// possible bombs to lay
const possibleBombs = [];
// initial bomb on the screen
let initialBombs;
// number of points scored in a row by isFirstPlayerTurn
let pointsInArow = 0;

// current page we are on
let currentPage = "homePage";

// used for difficulty
let chanceToGiveAWayPoint;

let reset_settings = true;
//determines if we are on the game board
let on_game_board = false;

// used to prevent multiple game board text showing on board
let showTextUsed = false;
// time to wait before show more game board text
let timeToWaitBetweenText = 8000;

// help text shown when learning on the game board
let helpText;

// traning helping variable
let restrictionLineClicks;
let restrictionClickBox;
let restrictionLayBomb;
let nextRestriction;

$(document).ready(() => {
  // set any saved field in local storage
  gametask.setFromLocalStorage();

  // adjust click event for edge boxes
  lineClickAction.setEdgeBoxClickEvent();

  // star of on the home screen
  track.goToPage("homePage");

  // set game music event listener
  soundEffects.playGameMusic();

  // animal text on home screen
  gametask.changeTitleColor();

  // animate the board selecting page stars
  ui.animateStars();
  // ui.animateDots();

  gametask.setToolClickEvent();
})
