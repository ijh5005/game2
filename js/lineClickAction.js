const lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {
    const height = task.getHeightWithClassName("box");
    const upperOutOfBoundsNumber = height - 10;
    const lowerOutOfBoundsNumber = 10;
    if (lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber)) { // check to see if a line is clicked
      const lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber); // cache the clicked line
      if(lineClickAction.isNotALockedBoxClick(boxNumber, lineClicked)){
        const hasClickBorderPreviously = (gameBoard[boxNumber].borders[lineClicked] === true);
        if (!hasClickBorderPreviously) { // prevent multiple click to the same border
          lineClickAction.clickOnBorder(boxNumber, lineClicked);
        }
      }
    } else if(task.isSelected()){
      if(selectedBombFunction === "bombEraser"){
        let hasBomb = false;
        bomb.types.forEach(data => {
          const hasClass = task.hasClassByQuerySelector(`.box.${boxNumber}`, data.class);
          if(hasClass){
            hasBomb = true;
          }
        })
        if(hasBomb){
          bomb.types.forEach(data => {
            delete gameBoard[boxNumber][`${data.key}`];
            bomb.showExplosionInBox(boxNumber, "eraseBomb", 80 * 8);
          })
          tools.forEach(data => {
            if(data.name === selectedBombFunction){
              data.count--;
            }
          });
          soundEffects.playEraseBombSound();
          ui.populateBoard();
          task.removeClassByQuerySelector(".tool.selected", "selected");
        }
      } else if(selectedBombFunction === "lion"){
        tools.forEach(data => {
          if(data.name === selectedBombFunction){
            data.count--;
          }
        });
        gameBoard[boxNumber].isLionExplosion = true;
        // don't delete
        // this explodes bomb when layed down
        // bomb.explodeBoxes(boxNumber);
        ui.populateBoard(); // remove this line if adding the above commented out line
        // task.passTurn();
      } else if (selectedBombFunction === "cheetah") {
        tools.forEach(data => {
          if(data.name === selectedBombFunction){
            data.count--;
          }
        });
        gameBoard[boxNumber].isCheetahExplosion = true;
        // don't delete
        // this explodes bomb when layed down
        // bomb.explodeBoxes(boxNumber);
        ui.populateBoard();
        // task.passTurn();
      } else if (selectedBombFunction === "panther") {
        tools.forEach(data => {
          if(data.name === selectedBombFunction){
            data.count--;
          }
        });
        gameBoard[boxNumber].isPantherExplosion = true;
        // don't delete
        // this explodes bomb when layed down
        // bomb.explodeBoxes(boxNumber);
        ui.populateBoard();
        // task.passTurn();
      }
    } else if(bomb.isExplosionBox(boxNumber)){
      bomb.explodeBoxes(boxNumber);
      task.passTurn();
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
        const heightOfBoxes = task.getHeightWithClassName("box13");
        const positionFromTopOfGameBoard = pageClickPositionY - gameBoardPosition.y;
        const rowInformation = boxInfo.getEdgeBoxClickPoistion(positionFromTopOfGameBoard, heightOfBoxes);
        const edgeBoxClicked = boxInfo.getEdgeBoxClicked(rowInformation, pageClickPositionX, pageClickPositionY);
        if(edgeBoxClicked.boxClicked && edgeBoxClicked.sideClicked){
          const hasClickBorderPreviously = (gameBoard[edgeBoxClicked.boxClicked].borders[edgeBoxClicked.sideClicked] === true);
          if(!hasClickBorderPreviously){
            lineClickAction.clickOnBorder(edgeBoxClicked.boxClicked, edgeBoxClicked.sideClicked);
          }
        }
      }
    });
  },
  clickOnBorder: (boxNumber, lineClicked) => {
    bomb.bombPopulation();
    track.incrementTurn();
    gameBoard[boxNumber].borders[lineClicked] = true;
    track.highlightBoxIfScored(boxNumber);
    let adjacentBox = null;
    let adjBoxNumber = null;
    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      gameBoard[`box${adjacentBox}`].borders[boxInfo.complementBorder[`${lineClicked}`]] = true;
      track.highlightBoxIfScored(`box${adjacentBox}`);
      adjBoxNumber = `box${adjacentBox}`;
    }
    ui.closeTheBoxConnection({
      boxNumber,
      adjacentBox: adjBoxNumber,
      boxNumberClosedBorder: lineClicked,
      adjacentBoxClosedBorder: boxInfo.complementBorder[`${lineClicked}`]
    });
    const scoreParams = [boxNumber, `box${adjacentBox}`].filter(data => data !== "boxnull");
    track.adjustScore(...scoreParams); // adjust the score
    task.setTurnPlayer(); // set the turn player
    ui.populateBoard();
    lineClickAction.changeLineColorOfLastClickedBox(boxNumber, lineClicked);
    (hasAdjacentBox) ? lineClickAction.changeLineColorOfLastClickedBox(adjBoxNumber, boxInfo.complementBorder[`${lineClicked}`]): null;
    setTimeout(() => {
      task.isGameOver();
      ui.startLevelText();
    })
  },
  removeLineClickHighlights: () => {
    task.removeClassByClassName("box", "topLineClicked");
    task.removeClassByClassName("box", "rightLineClicked");
    task.removeClassByClassName("box", "bottomLineClicked");
    task.removeClassByClassName("box", "leftLineClicked");
  },
  changeLineColorOfLastClickedBox: (boxNumber, lineClicked) => {
    lineClickAction.removeLineClickHighlights();
    setTimeout(() => {
      task.addClassByClassName(boxNumber, `${lineClicked}LineClicked`);
    })
  },
  isNotALockedBoxClick: (box, lineClicked) => {
    const adjBox = boxInfo.getAdjBoxBySide(box, lineClicked);
    const includesLocked = (boxInfo.isALockBox(box) || boxInfo.isALockBox(adjBox));
    // const doesBoxIncludeABomb = bomb.isExplosionBox(box);
    // const doesAdjBoxIncludeABomb = bomb.isExplosionBox(adjBox);
    return !includesLocked; //(!includesLocked || doesBoxIncludeABomb || doesAdjBoxIncludeABomb);
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
    ui.populateBoard();
  },
}
