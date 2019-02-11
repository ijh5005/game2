const bomb = {
  types: [
    {
      key: "isVerticalExplosion",
      class: "verticalExplosionImage"
    }, {
      key: "isHorizontalExplosion",
      class: "horizontalExplosionImage"
    }, {
      key: "isMediumExplosion",
      class: "mediumExplosionImage"
    }, {
      key: "isLargeExplosion",
      class: "largeExplosionImage"
    }, {
      key: "isVeryLargeExplosion",
      class: "veryLargeExplosionImage",
    }
  ],
  populationData: [],
  fillPopulationData: () => {
    let useTurns = [];
    for(let i = 0; i < bombsToLay; i++){
      const randomNumber = Math.floor(Math.random()*60);
      const boxNumber = `box${Math.floor(Math.random()*34)}`;
      if(!useTurns.includes(randomNumber) && !useTurns.includes(boxNumber)){
        useTurns = [...useTurns, randomNumber, boxNumber];
        bomb.populationData.push({randomNumber, boxNumber});
      }
    }
    console.table(bomb.populationData);
  },
  bombPopulation: () => {
    let boxNumber;
    bomb.populationData.some(data => {
      boxNumber = (data.randomNumber === track.turn) ? data.boxNumber : boxNumber;
      return data.randomNumber === track.turn
    });
    if(boxNumber && (boxInfo.getBorderCount(boxNumber) !== 4)){
      bomb.showExplosionInBox(boxNumber, "smoke", 80 * 9);
      soundEffects.playShowBombSound();
      bomb.placeBomb(boxNumber);
    }
  },
  showExplosionInBox: (box, type, seconds) => {
    $(`.${box}Explosion`).removeClass("hideExplosion").attr("src", `./gifs/${type}.gif`);
    setTimeout(() => {
      $(`.${box}Explosion`).addClass("hideExplosion");
    }, seconds);
  },
  placeBomb: (boxNumber) => {
    let explosion = bomb.types[0];
    const number = Math.floor(Math.random() * 71);
    // if(number > 65){
    //   explosion = bomb.types[4];
    // } else
    if(number > 55){
      explosion = bomb.types[3];
    } else if(number > 40){
      explosion = bomb.types[2];
    } else if(number > 20){
      explosion = bomb.types[1];
    }
    console.table({explosion, boxNumber});
    document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class);
    if(!gameBoard[boxNumber].isLocked){
      gameBoard[boxNumber][explosion.key] = true;
    }
  },
  explodeBoxes: (box) => {
    if (gameBoard[box].isMediumExplosion) {
      bomb.mediumExplosion(box);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isLargeExplosion) {
      setTimeout(() => {
        bomb.largerExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isVerticalExplosion) {
      setTimeout(() => {
        bomb.verticalExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isHorizontalExplosion) {
      setTimeout(() => {
        bomb.horizontalExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isVeryLargeExplosion) {
      setTimeout(() => {
        bomb.isVeryLargeExplosion(box);
        soundEffects.playExplosionSound();
      })
    }
  },
  checkForChainReactions: (boxesToCheck) => {
    console.table({method: "checkForChainReactions", boxes: [...boxesToCheck]});
    setTimeout(() => {
      boxesToCheck.forEach(box => {
        if(box){
          bomb.explodeBoxes(box)
        }
      })
    }, 80 * 4)
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

    const topBox = boxInfo.getTopBox(boxNumber);
    const bottomBox = boxInfo.getBottomBox(boxNumber);

    const twoBoxesUp = topBox ? boxInfo.getTopBox(parseInt(topBox.replace("box", ""))) : false;
    let twoBoxesDown = bottomBox ? boxInfo.getBottomBox(parseInt(bottomBox.replace("box", ""))) : false;

    // cache boxes to target
    const linesToRemove = [
      {
        box: twoBoxesDown,
        lines: ["top"]
      },
      {
        box: twoBoxesUp,
        lines: ["bottom"]
      },
      {
        box: boxInfo.getTopBox(boxNumber),
        lines: ["top", "bottom"]
      },
      {
        box: boxInfo.getBottomBox(boxNumber),
        lines: ["top", "bottom"]
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

    const boxesToExplode = [topBox, bottomBox, twoBoxesUp, twoBoxesDown];

    bomb.checkForChainReactions(boxesToExplode)
  },
  horizontalExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isHorizontalExplosion = false;

    // cache box number
    const boxNumber = parseInt(box.replace("box", ""));


    const rightBox = boxInfo.getRightBox(boxNumber);
    const twoBoxesRight = rightBox ? boxInfo.getRightBox(parseInt(rightBox.replace("box", ""))) : false;
    const leftBox = boxInfo.getLeftBox(boxNumber);
    const twoBoxesLeft = leftBox ? boxInfo.getLeftBox(parseInt(leftBox.replace("box", ""))) : false;

    // cache boxes to target
    const linesToRemove = [
      {
        box: twoBoxesLeft,
        lines: ["right"]
      },
      {
        box: twoBoxesRight,
        lines: ["left"]
      },
      {
        box: boxInfo.getRightBox(boxNumber),
        lines: ["right", "left"]
      },
      {
        box: boxInfo.getLeftBox(boxNumber),
        lines: ["right", "left"]
      },
      {
        box: box,
        lines: ["right", "left"]
      },
    ];

    // make boxes explode
    linesToRemove.forEach(item => {
      if (item.box) {
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box, true);
        bomb.showExplosionInBox(item.box, "explosion", 80 * 8);
      }
    });

    const boxesToExplode = [boxInfo.getRightBox(boxNumber), boxInfo.getLeftBox(boxNumber), twoBoxesLeft, twoBoxesRight];

    bomb.checkForChainReactions(boxesToExplode)
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
