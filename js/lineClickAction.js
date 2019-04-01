const lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {

    const height = task.getHeightWithClassName("box");
    const upperOutOfBoundsNumber = height - lineClickOffset;
    const lowerOutOfBoundsNumber = lineClickOffset;

    if (lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber)) { // check to see if a line is clicked
      const lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber); // cache the clicked line

      if(!task.hasPassedTrainingRestriction(boxNumber, lineClicked)) return null;

      if(lineClickAction.isNotALockedBoxClick(boxNumber, lineClicked)){
        const hasClickBorderPreviously = (gameBoard[boxNumber].borders[lineClicked] === true);
        if (!hasClickBorderPreviously) { // prevent multiple click to the same border
          lineClickAction.clickOnBorder(boxNumber, lineClicked);
        }
      } else {
        // turns the line red to indicate that it cant be clicked
        ui.displayNoClickIndicator(boxNumber, lineClicked);
      }
    } else if(task.isSelected() && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber)){

      if(!task.hasPassedTrainingRestriction(boxNumber, null)) return null;

      // show smoke when help enters the field
      if(selectedBombFunction !== "bombEraser"){
        ui.animateBombMovement(boxNumber);
        soundEffects.playShowBombSound();
        bomb.showSpriteSmoke(boxNumber);
      }

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
          ui.populateTheUI();
          task.removeClassByQuerySelector(".tool.selected", "selected");
        }
      } else {
        setTimeout(() => {
          showHelper();
        }, 100);
      }

      const showHelper = () => {
        if(selectedBombFunction === "lion"){
          tools.forEach(data => {
            if(data.name === selectedBombFunction){
              data.count--;
            }
          });
          gameBoard[boxNumber].isLionExplosion = true;
          // don't delete
          // this explodes bomb when layed down
          // bomb.explodeBoxes(boxNumber);
          ui.populateTheUI(); // remove this line if adding the above commented out line
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
          ui.populateTheUI();
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
          ui.populateTheUI();
          // task.passTurn();
        }
      }

    } else if(bomb.isExplosionBox(boxNumber)){

      if(!task.hasPassedTrainingRestriction(boxNumber, null)) return null;

      bomb.explodeBoxes(boxNumber);
      task.passTurn();
    } else {
      soundEffects.playWrongSound();
      ui.showText("Tap a line between the dots!");
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
            }

          }
        }
      }
    });
  },
  clickOnBorder: (boxNumber, lineClicked) => {
    bomb.bombPopulation();
    track.incrementTurn();
    gameBoard[boxNumber].borders[lineClicked] = true;

    if(!isFirstPlayerTurn){
      debugger
      whoClickedLine[boxNumber][lineClicked] = "computer"
    }

    track.highlightBoxIfScored(boxNumber);
    let adjacentBox = null;
    let adjBoxNumber = null;
    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      gameBoard[`box${adjacentBox}`].borders[boxInfo.complementBorder[`${lineClicked}`]] = true;
      track.highlightBoxIfScored(`box${adjacentBox}`);
      adjBoxNumber = `box${adjacentBox}`;

      if(!isFirstPlayerTurn){
        whoClickedLine[adjBoxNumber][boxInfo.complementBorder[`${lineClicked}`]] = "computer"
      }
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
    ui.populateTheUI();
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
    if(isFirstPlayerTurn){
      setTimeout(() => {
        task.addClassByClassName(boxNumber, `${lineClicked}LineClicked`);
      }, 10)
    }
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
    ui.populateTheUI();
  },
}
