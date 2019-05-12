const lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {
    lineClickAction.removeLineClickHighlights();

    const height = gametask.getHeightWithClassName("box");
    const upperOutOfBoundsNumber = height - app.lineClickOffset;
    const lowerOutOfBoundsNumber = app.lineClickOffset;
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

module.exports = lineClickAction;
