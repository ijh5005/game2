const helper = {
  useHelper: (box) => {
    if (helperButtonSelected === "minus") {
      // does the box have at least one line highlighted
      if (boxInfo.getBorderCount(box) > 0) {
        // choose a random line in the box to fill in
        helper.subtractOneBorderFrom(box);
      } else {
        console.log("can't select box to minus");
      }
    } else if (helperButtonSelected === "plus") {
      // does the box have less than four lines highlighted
      if (boxInfo.getBorderCount(box) < 4) {
        // choose a random line in the box to remove
        helper.addOneBorderTo(box);
      } else {
        console.log("can't select box to add");
      }
    }
  },
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
  showExplosionInBox: (box, type) => {
    $(`.${box}Explosion`).removeClass("hideExplosion").attr("src", `./gifs/${type}.gif`);
    setTimeout(() => {
      $(`.${box}Explosion`).addClass("hideExplosion");
    }, 80 * 8);
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
    explodingBoxes.forEach(explodingBox => helper.showExplosionInBox(explodingBox, "smoke"));
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
        helper.showExplosionInBox(item.box, "largeExplosion");
      }
    });
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
        helper.showExplosionInBox(item.box, "smallExplosion");
      }
    });
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
        helper.showExplosionInBox(item.box, "smallExplosion");
      }
    });
  },
  isVeryLargeExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isVeryLargeExplosion = false;

    for (let item in gameBoard) {
      gameBoard[item].borders = {
        top: null,
        right: null,
        bottom: null,
        left: null
      }
      ui.removeScoreColorIfRemovingBorder(item, true);
    }
    for (let item in gameBoard) {
      helper.showExplosionInBox(item, "veryLargeExplosion");
    }
    ui.populateBoard();
  }
}
