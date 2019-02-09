const boxInfo = {
  getBorderCount: (box) => {
    const borders = gameBoard[box].borders;
    let count = 0;
    Object.keys(borders).forEach(data => {
      if (borders[data]) count++;
    })
    return count;
  },
  getAllBoxClasses: (box) => {
    const classesToAdd = ["box"];
    if (gameBoard[box].borders.top) classesToAdd.push("borderTop");
    if (gameBoard[box].borders.right) classesToAdd.push("borderRight");
    if (gameBoard[box].borders.bottom) classesToAdd.push("borderBottom");
    if (gameBoard[box].borders.left) classesToAdd.push("borderLeft");
    if (gameBoard[box].whoScored) classesToAdd.push(gameBoard[box].whoScored);
    if (gameBoard[box].isMediumExplosion) {
      classesToAdd.push("mediumExplosionImage");
    } else if (gameBoard[box].isLargeExplosion) {
      classesToAdd.push("largeExplosionImage");
    } else if (gameBoard[box].isVerticalExplosion) {
      classesToAdd.push("verticalExplosionImage");
    } else if (gameBoard[box].isHorizontalExplosion) {
      classesToAdd.push("horizontalExplosionImage");
    } else if (gameBoard[box].isVeryLargeExplosion) {
      classesToAdd.push("veryLargeExplosionImage");
    }

    if (gameBoard[box].isTopRightCornerBox) {
      classesToAdd.push("isTopRightCornerBox");
    } else if (gameBoard[box].isTopLeftCornerBox) {
      classesToAdd.push("isTopLeftCornerBox");
    } else if (gameBoard[box].isBottomRightCornerBox) {
      classesToAdd.push("isBottomRightCornerBox");
    } else if (gameBoard[box].isBottomLeftCornerBox) {
      classesToAdd.push("isBottomLeftCornerBox");
    } else if (gameBoard[box].isTopSideRow) {
      classesToAdd.push("isTopSideRow");
    } else if (gameBoard[box].isRightSideRow) {
      classesToAdd.push("isRightSideRow");
    } else if (gameBoard[box].isBottomSideRow) {
      classesToAdd.push("isBottomSideRow");
    } else if (gameBoard[box].isLeftSideRow) {
      classesToAdd.push("isLeftSideRow");
    }

    if(gameBoard[box].isLocked === true){
      classesToAdd.push("locked");
    }

    classesToAdd.push("flexRow");
    classesToAdd.push(box);
    return classesToAdd;
  },
  getNumberText: (box, div) => {
    let numberOfSides = 0;
    if (gameBoard[box].borders.top) numberOfSides++;
    if (gameBoard[box].borders.right) numberOfSides++;
    if (gameBoard[box].borders.bottom) numberOfSides++;
    if (gameBoard[box].borders.left) numberOfSides++;
    $(div).html(`<p>${numberOfSides}</p>`)
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
      const borderCount = boxInfo.getBorderCount(box);
      if (boxInfo.countsAsNoBorders(box, borderCount)) noBorders.push(box);
      else if (boxInfo.countsAsOneBorders(box, borderCount)) oneBorderBoxes.push(box);
      else if (boxInfo.countsAsTwoBorders(box, borderCount)) twoBorderBoxes.push(box)
      else if (boxInfo.countsAsThreeBorders(box, borderCount)) threeBorderBoxes.push(box);
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
    if(boxInfo.isALockBox(box) || (borderCount !== 3)) return false;
    const openBorder = boxInfo.getUnclickedBorders(box)[0];
    const adjBox = boxInfo.getAdjBoxBySide(box, openBorder);
    const isNextToLockBox = adjBox ? boxInfo.isALockBox(adjBox) : true;
    return !isNextToLockBox;
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
    return lockBombLocations.includes(box);
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
    const bordersBox2 = gameboardMapper.getGameBoardClickBox(box2).borders;
    const surroundingBoxes = gameboardMapper.getGameBoardClickBox(box1).surroundingBoxes;
    gameboardMapper.getSurroundingBoxesKeys(box1).forEach(data => {
      const complement = complementBorder[data.replace("Box", "")];
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
    const surroundingBoxesKeys = gameboardMapper.getSurroundingBoxesKeys(clickBox);
    const clickBoxObj = gameboardMapper.getGameBoardClickBox(clickBox);
    surroundingBoxesKeys.forEach(data => {
      if ((clickBoxObj.surroundingBoxes[data] === null) && (clickBoxObj.borders[data.replace("Box", "")] === null)) {
        edgeBox.hasEdgeBox = true;
        edgeBox.clickSide = data.replace("Box", "");
      }
    })
    return edgeBox;
  },
  getLineBetweenBoxes: (clickBox, selectedBox) => {
    let selectedSide = null;
    gameboardMapper.getSurroundingBoxesKeys(clickBox).forEach(data => {
      const number = (gameboardMapper.getSurroundingBoxesInfo(clickBox, data)) ? gameboardMapper.getSurroundingBoxesInfo(clickBox, data).boxNumber : null;
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
    gameboardMapper.getSurroundingBoxesKeys(clickBox).forEach(data => {
      if (gameboardMapper.getSurroundingBoxesInfo(clickBox, data)) surroundingBoxes.push(gameboardMapper.getSurroundingBoxesInfo(clickBox, data).boxNumber);
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
        borders: ["top", "right", "bottom", "left"]
      },
      {
        box: topRightBoxNumber,
        borders: ["bottom", "left"]
      },
      {
        box: topLeftBoxNumber,
        borders: ["right", "bottom"]
      },
      {
        box: bottomRightBoxNumber,
        borders: ["top", "left"]
      },
      {
        box: bottomLeftBoxNumber,
        borders: ["top", "right"]
      },
      {
        box: topBox,
        borders: ["right", "bottom", "left"]
      },
      {
        box: leftBox,
        borders: ["top", "right", "bottom"]
      },
      {
        box: bottomBox,
        borders: ["top", "right", "left"]
      },
      {
        box: rightBox,
        borders: ["top", "bottom", "left"]
      }
    ];
  }
}
