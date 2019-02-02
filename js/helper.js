const helper = {
  subtractOneBorderFrom: (box) => {
    const clickedBorders = boxInfo.getClickedBorders(box);
    const borderToRemove = task.getRandomIndexInArray(clickedBorders);
    lineClickAction.clickOnBorder(box, borderToRemove, true, true);
  },
  addOneBorderTo: (box) => {
    const unclickedBorders = boxInfo.getUnclickedBorders(box);
    const borderToAdd = task.getRandomIndexInArray(unclickedBorders);
    lineClickAction.clickOnBorder(box, borderToAdd, true);
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
  mediumExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isMediumExplosion = false;

    // removes all 4 borders from the bomb for
    const numberOfBorders = 4;
    for (let i = 0; i < numberOfBorders; i++) {
      setTimeout(() => helper.subtractOneBorderFrom(box))
    }

    // make boxes explode
    const explodingBoxes = [box, ...boxInfo.getSurroundingBoxes(box)];
    explodingBoxes.forEach(explodingBox => bomb.showExplosionInBox(explodingBox, "explosion", 80 * 8));
    bomb.checkForChainReactions(boxInfo.getSurroundingBoxes(box));
  },
  largerExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isLargeExplosion = false;

    // cache box number
    const boxNumber = parseInt(box.replace("box", ""));

    // get all boxes surrounding boxes
    const allBorders = boxInfo.getAllBorders(boxNumber);

    // get borders to remove according to the largerExplosion rules
    const bordersToRemove = boxInfo.getBordersToRemove(box, allBorders);

    // make boxes explode
    bordersToRemove.forEach(item => {
      if (item.box) {
        lineClickAction.removeBorders(item.box, item.borders);
        ui.removeScoreColorIfRemovingBorder(item.box, true);
        bomb.showExplosionInBox(item.box, "explosion", 80 * 8);
      }
    });
    bomb.checkForChainReactions(Object.entries(allBorders).map(data => data[1]));
  },
  verticalExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isVerticalExplosion = false;

    // cache box number
    const boxNumber = parseInt(box.replace("box", ""));
    // cache boxes to target
    const linesToRemove = [{
        box: boxInfo.getTopBox(boxNumber),
        lines: ["bottom"]
      },
      {
        box: boxInfo.getBottomBox(boxNumber),
        lines: ["top"]
      },
      {
        box: box,
        lines: ["top", "bottom"]
      }
    ];
    // make boxes explode
    linesToRemove.forEach(item => {
      if (item.box) {
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box, true);
        bomb.showExplosionInBox(item.box, "explosion", 80 * 8);
      }
    });
    bomb.checkForChainReactions([boxInfo.getTopBox(boxNumber), boxInfo.getBottomBox(boxNumber)]);
  },
  horizontalExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isHorizontalExplosion = false;

    // cache box number
    const boxNumber = parseInt(box.replace("box", ""));
    // cache boxes to target
    const linesToRemove = [{
        box: boxInfo.getRightBox(boxNumber),
        lines: ["left"]
      },
      {
        box: boxInfo.getLeftBox(boxNumber),
        lines: ["right"]
      },
      {
        box: box,
        lines: ["right", "left"]
      }
    ];
    // make boxes explode
    linesToRemove.forEach(item => {
      if (item.box) {
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box, true);
        bomb.showExplosionInBox(item.box, "explosion", 80 * 8);
      }
    });
    bomb.checkForChainReactions([boxInfo.getRightBox(boxNumber), boxInfo.getLeftBox(boxNumber)])
  },
  isVeryLargeExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isVeryLargeExplosion = false;
    const allClasses = [
      "mediumExplosionImage",
      "largeExplosionImage",
      "verticalExplosionImage",
      "horizontalExplosionImage",
      "veryLargeExplosionImage"
    ];
    for (let item in gameBoard) {
      gameBoard[item].borders = {
        top: null,
        right: null,
        bottom: null,
        left: null
      }
      delete gameBoard[item].isVerticalExplosion;
      delete gameBoard[item].isHorizontalExplosion;
      delete gameBoard[item].isMediumExplosion;
      delete gameBoard[item].isLargeExplosion;
      delete gameBoard[item].isVeryLargeExplosion;
      allClasses.forEach(cl => document.getElementsByClassName(item)[0].classList.remove(cl));
      ui.removeScoreColorIfRemovingBorder(item, true);
    }
    for (let item in gameBoard) {
      bomb.showExplosionInBox(item, "explosion", 80 * 8);
    }
    ui.populateBoard();
  }
}
