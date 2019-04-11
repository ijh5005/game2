const lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {
    lineClickAction.removeLineClickHighlights();

    const height = task.getHeightWithClassName("box");
    const upperOutOfBoundsNumber = height - lineClickOffset;
    const lowerOutOfBoundsNumber = lineClickOffset;
    const meetsBombLayingConditions = task.isSelected() && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber);
    let hasMadeMove = false;
    // check to see if a line is clicked
    const isALineClicked = lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
    if (isALineClicked) {
      // the line thats clicked
      const lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
      // are we following the training rules
      const followingTrainingRulesIfAny = task.hasPassedTrainingRestriction(boxNumber, lineClicked);
      // prevent multiple click to the same border
      const lineIsAlreadyClick = boxInfo.hasClickBorderPreviously(boxNumber, lineClicked);
      // is the line click part of a lock box
      const isLockBoxLineClick = lineClickAction.isALockedBoxClick(boxNumber, lineClicked);
      hasMadeMove = true;
      // prevent the line if these conditions are met
      if(!followingTrainingRulesIfAny){
        return task.incorrectClick()
      }

      if(lineIsAlreadyClick){
        ui.showText("line is taken! chose another..");
        return task.incorrectClick()
      }

      if(isLockBoxLineClick){
        ui.showText("destroy the item to click this line!");
        return task.incorrectClick(boxNumber, lineClicked)
      }

      lineClickAction.clickOnBorder(boxNumber, lineClicked);
    } else if(meetsBombLayingConditions){
      // are we following the training rules
      const followingTrainingRulesIfAny = task.hasPassedTrainingRestriction(boxNumber, null);
      if(!followingTrainingRulesIfAny) return task.incorrectClick();
      // takeAnotherTurn = true;
      hasMadeMove = true;
      layedBomb = true;
      // show smoke when help enters the field
      ui.animateBombMovement(boxNumber);
      soundEffects.playShowBombSound();
      bomb.showSpriteSmoke(boxNumber);
      ui.showHelper(boxNumber);
      ui.populateTheUI();
      task.endTurnTasks();
    } else if(bomb.isExplosionBox(boxNumber)){
      if(!task.hasPassedTrainingRestriction(boxNumber, null)) return null;
      clickedExplosion = true;
      bomb.explodeBoxes(boxNumber);
      task.endTurnTasks();
    } else if(!task.onRestrictionTurn()) {
      soundEffects.playWrongSound();
      ui.showText("Tap directly between the dots!");
      setTimeout(() => {
        ui.showText("");
      }, 4000)
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
        const heightOfBoxes = task.getHeightWithClassName("box13");
        const positionFromTopOfGameBoard = pageClickPositionY - gameBoardPosition.y;
        const rowInformation = boxInfo.getEdgeBoxClickPosition(positionFromTopOfGameBoard, heightOfBoxes);
        const edgeBoxClicked = boxInfo.getEdgeBoxClicked(rowInformation, pageClickPositionX, pageClickPositionY);
        if(edgeBoxClicked.boxClicked && edgeBoxClicked.sideClicked){
          const hasClickBorderPreviously = (gameBoard[edgeBoxClicked.boxClicked].borders[edgeBoxClicked.sideClicked] === true);
          if(!hasClickBorderPreviously){

            const { boxClicked, sideClicked } = edgeBoxClicked;

            const hasPassed = task.hasPassedTrainingRestriction(boxClicked, sideClicked);
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
    task.endTurnTasks();
  },
  removeLineClickHighlights: () => {
    task.removeClassByClassName("box", "topLineClicked");
    task.removeClassByClassName("box", "rightLineClicked");
    task.removeClassByClassName("box", "bottomLineClicked");
    task.removeClassByClassName("box", "leftLineClicked");
  },
  changeLineColorOfLastClickedBox: (boxNumber, lineClicked, adjBoxNumber, adjBoxLine) => {
    if(!isFirstPlayerTurn){
      setTimeout(() => {
        task.addClassByClassName(boxNumber, `${lineClicked}LineClicked`);
        if(adjBoxNumber){
          task.addClassByClassName(adjBoxNumber, `${adjBoxLine}LineClicked`);
        }
      }, 200);
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
