const lineClickAction = {
  highlightClickedBorder: (offsetX, offsetY, boxNumber, board) => {
    const height = $(".box").height();
    const upperOutOfBoundsNumber = height - 10;
    const lowerOutOfBoundsNumber = 10;
    if (lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber)) { // check to see if a line is clicked
      const lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber); // cache the clicked line
      if(lineClickAction.isNotALockedBoxClick(boxNumber, lineClicked)){
        console.table({firstPlayerTurn: true});
        const hasClickBorderPreviously = (gameBoard[boxNumber].borders[lineClicked] === true);
        if (!hasClickBorderPreviously) { // prevent multiple click to the same border
          lineClickAction.clickOnBorder(boxNumber, lineClicked);
        }
      }
    } else if(task.isSelected()){
      if(selectedBombFunction === "bombEraser"){
        let hasBomb = false;
        const box = $(`.box.${boxNumber}`);
        bomb.types.forEach(data => {
          if(box.hasClass(data.class)){
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
          $(".tool.selected").removeClass("selected");
        }
      }
    } else if(bomb.isExplosionBox(boxNumber)){
      bomb.explodeBoxes(boxNumber);
      isFirstPlayerTurn = !isFirstPlayerTurn;
      computerMove.makeComputerMove();
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
        const heightOfBoxes = $(".box13").height();
        const positionFromTopOfGameBoard = pageClickPositionY - gameBoardPosition.y;
        const rowInformation = boxInfo.getEdgeBoxClickPoistion(positionFromTopOfGameBoard, heightOfBoxes);
        const edgeBoxClicked = boxInfo.getEdgeBoxClicked(rowInformation, pageClickPositionX, pageClickPositionY);
        if(edgeBoxClicked.boxClicked && edgeBoxClicked.sideClicked){
          lineClickAction.clickOnBorder(edgeBoxClicked.boxClicked, edgeBoxClicked.sideClicked);
        }
      }
    });
  },
  clickOnBorder: (boxNumber, lineClicked) => {
    console.table({boxNumber, lineClicked})
    soundEffects.playLineClickSound();
    bomb.bombPopulation();
    track.incrementTurn();
    gameBoard[boxNumber].borders[lineClicked] = true;
    track.highlightBoxIfScored(boxNumber);
    let adjacentBox = null;
    let adjBoxNumber = null;
    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      gameBoard[`box${adjacentBox}`].borders[complementBorder[`${lineClicked}`]] = true;
      track.highlightBoxIfScored(`box${adjacentBox}`);
      adjBoxNumber = `box${adjacentBox}`;
    }
    ui.closeTheBoxConnection({
      boxNumber,
      adjacentBox: adjBoxNumber,
      boxNumberClosedBorder: lineClicked,
      adjacentBoxClosedBorder: complementBorder[`${lineClicked}`]
    });
    const scoreParams = [boxNumber, `box${adjacentBox}`].filter(data => data !== "boxnull");
    track.adjustScore(...scoreParams); // adjust the score
    task.setTurnPlayer(); // set the turn player
    task.isGameOver();
    ui.populateBoard(board);
    lineClickAction.changeLineColorOfLastClickedBox(boxNumber, lineClicked);
    (hasAdjacentBox) ? lineClickAction.changeLineColorOfLastClickedBox(adjBoxNumber, complementBorder[`${lineClicked}`]): null;
    track.winner();
  },
  removeLineClickHighlights: () => {
    $(".box").removeClass("topLineClicked");
    $(".box").removeClass("rightLineClicked");
    $(".box").removeClass("bottomLineClicked");
    $(".box").removeClass("leftLineClicked");
  },
  changeLineColorOfLastClickedBox: (boxNumber, lineClicked) => {
    lineClickAction.removeLineClickHighlights();
    setTimeout(() => {
      $(`.${boxNumber}`).addClass(`${lineClicked}LineClicked`);
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
