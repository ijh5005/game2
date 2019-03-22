const computerMove = {
  makeComputerMove: () => {
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
          ui.populateBoard();
        } else {
          computerMove.makeMoveInSafeBox();
        }
      } else {
        computerMove.makeComputerMove()
      }
    }, 400);
  },
  makeMoveInSafeBox: () => { // make a computer move that doesn't allow opponent the score
    if (threeBorderBoxes.length !== 0) computerMove.getAFreeBox();
    else if (noBorders.length !== 0) computerMove.clickInANoBorderBox();
    else if (oneBorderBoxes.length !== 0) computerMove.clickInAOneBorderBox();
    else if (twoBorderBoxes.length !== 0) computerMove.clickInATwoBorderBox();
    ui.populateBoard();
  },
  getAFreeBox: () => {
    const clickBox = task.getRandomIndexInArray(threeBorderBoxes);
    Object.keys(boxInfo.getGameBoardClickBox(clickBox).borders).forEach(data => {
      if(!bomb.allExplodingBoxes.length > 0){
        if (!boxInfo.getGameBoardClickBox(clickBox).borders[data] && !isFirstPlayerTurn) {
          if(boxInfo.isAdjBoxALockBox(clickBox, data)){
            threeBorderBoxes.splice(threeBorderBoxes.indexOf(clickBox), 1);
            computerMove.makeMoveInSafeBox();
          } else {
            const hasMoreSafeBoxesToClickIn = boxInfo.getSafeBoxes().length > 1;
            if(noBorders.length > 0 && !showTextUsed){
              track.screenText();
              // show text on board
              boardText.showText("bad");
            }
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
      const clickBox = task.getRandomIndexInArray(noBorders);
      //remove that box from that array to avoid checking it multiple times
      noBorders.splice(noBorders.indexOf(clickBox), 1);
      // get the boxes around it that only has one or less borders already selected
      const oneOrLessBorderSurroundingBoxes = boxInfo.getLessThanOneBorderNonConnectedSurroundingBoxes(clickBox);
      // choose a random box of the potential boxes to click
      const selectedBox = task.getRandomIndexInArray(oneOrLessBorderSurroundingBoxes);
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
      const clickBoxObj = task.getRandomIndexInArray(safeClickBoxWithSide);
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
          if (task.hasTwoInArray(connectedBoxes, paths)) {
            let allPathsHere = [];
            connectedBoxes.forEach(eachBox => {
              connectedBoxCombinations.forEach(pathsToGetPathsFrom => {
                if (pathsToGetPathsFrom.includes(eachBox)) {
                  allPathsHere = [...allPathsHere, ...pathsToGetPathsFrom];
                }
              })
            })
            const withRemovedDoubles = task.removedDoublesFromArray(allPathsHere);
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
      const boxToClick = task.getRandomIndexInArray(pathsToClickABox[arrayIndex]);
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
