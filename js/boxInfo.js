const boxInfo = {
  getGameBoardClickBox: (clickBox) => {
    return gameBoard[clickBox];
  },
  getSurroundingBoxesInfo: (clickBox, boxSide) => {
    return gameBoard[clickBox].surroundingBoxes[boxSide]
  },
  getSurroundingBoxesKeys: (clickBox) => {
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
    if (gameBoard[box].borders.top) classesToAdd.push("borderTop");
    if (gameBoard[box].borders.right) classesToAdd.push("borderRight");
    if (gameBoard[box].borders.bottom) classesToAdd.push("borderBottom");
    if (gameBoard[box].borders.left) classesToAdd.push("borderLeft");
    if (gameBoard[box].whoScored) classesToAdd.push(gameBoard[box].whoScored);

    if (gameBoard[box].isLionExplosion) {
      classesToAdd.push("isLionExplosion");
    } else if (gameBoard[box].isCheetahExplosion) {
      classesToAdd.push("isCheetahExplosion");
    } else if (gameBoard[box].isPantherExplosion) {
      classesToAdd.push("isPantherExplosion");
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
  getEdgeBoxClickPoistion: (positionFromTopOfGameBoard, heightOfBoxes) => {
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
        const height = task.getHeightWithClassName(thisBox);
        const width = task.getWidthWithClassName(thisBox);
        const boardHolderWidth = task.getWidthWithId("boardHolder");
        const offset = 10;

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
  }
}
