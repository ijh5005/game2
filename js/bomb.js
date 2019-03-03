const bomb = {
  types: [
    { key: "isVerticalExplosion", class: "verticalExplosionImage" },
    { key: "isHorizontalExplosion", class: "horizontalExplosionImage" },
    { key: "isMediumExplosion", class: "mediumExplosionImage" },
    { key: "isLargeExplosion", class: "largeExplosionImage" }
  ],
  isExplosionBox: (box) => {
    let isBombBox = false;
    bomb.types.forEach(data => {
      const className = data.class;
      const isBomb = document.getElementsByClassName(box)[0]
                   ? document.getElementsByClassName(box)[0].classList.contains(className)
                   : false;
      if(isBomb) isBombBox = true;
    });
    return isBombBox;
  },
  populationData: [],
  fillPopulationData: () => {
    bomb.populationData = [];
    let useTurns = [];
    if(bombsToLay > 0){
      while(useTurns.length < bombsToLay * 2){
        const randomNumber = Math.floor(Math.random()*30) + track.turn;
        const filtered = [];
        for(let box in gameBoard){
          if(!gameBoard[box].disabled) filtered.push(box);
        }
        const boxNumber = filtered[Math.floor(Math.random()*(gameBoardLength - 1))];
        if(!useTurns.includes(randomNumber) && !useTurns.includes(boxNumber)){
          useTurns = [...useTurns, boxNumber, randomNumber];
          bomb.populationData.push({randomNumber, boxNumber});
        }
      }
    }
  },
  bombPopulation: () => {
    let boxNumber;
    bomb.populationData.some(data => {
      boxNumber = (data.randomNumber === track.turn) ? data.boxNumber : boxNumber;
      return data.randomNumber === track.turn
    });
    if(boxNumber && (boxInfo.getBorderCount(boxNumber) !== 4)){
      bomb.placeBomb(boxNumber);
    }
  },
  showExplosionInBox: (box, type, seconds) => {
    if(type !== "smoke") bomb.explodeLockBoxIfHit(box);
    $(`.${box}Explosion`).removeClass("hideExplosion").attr("src", `./gifs/${type}.gif`);
    setTimeout(() => {
      explodingBoxes.pop();
      $(`.${box}Explosion`).addClass("hideExplosion");
    }, seconds);
  },
  explodeLockBoxIfHit: (box) => {
    if(boxInfo.isALockBox(box)) {
      let hitInfo;
      lockBombLocations.forEach((data, index) => {
        if(data.box === box){
          hitInfo = { index }
        }
      })
      if(hitInfo !== false){
        lockBombLocations[hitInfo.index].toughness--;
        if(lockBombLocations[hitInfo.index].toughness === 0){
          setTimeout(() => {
            lockBombLocations.splice(hitInfo.index, 1);
            $(`.box.${box}`).removeClass("locked");
          }, 300);
        }
      }
    };
  },
  placeBomb: (boxNumber) => {
    let explosion = bomb.types[0];
    const number = Math.floor(Math.random() * 71);
    if(number > 55){ explosion = bomb.types[3]; }
    else if(number > 40){ explosion = bomb.types[2]; }
    else if(number > 20){ explosion = bomb.types[1]; }
    if(!bomb.isExplosionBox(boxNumber) && !boxInfo.isALockBox(boxNumber)){
      // track.decrementBombCount();
      soundEffects.playShowBombSound();
      document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class);
      bomb.showExplosionInBox(boxNumber, "smoke", 80 * 9);
      gameBoard[boxNumber][explosion.key] = true;
    } else {
      // track.incrementMissedBombCount();
      const missedBox = {
        missedBox: true,
        box: boxNumber
      }
    }
  },
  explodeBoxes: (box) => {
    if (gameBoard[box].isMediumExplosion) {
      explodingBoxes.push(box);
      bomb.mediumExplosion(box);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isLargeExplosion) {
      explodingBoxes.push(box);
      setTimeout(() => {
        bomb.largerExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isVerticalExplosion) {
      explodingBoxes.push(box);
      setTimeout(() => {
        bomb.verticalExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isHorizontalExplosion) {
      explodingBoxes.push(box);
      setTimeout(() => {
        bomb.horizontalExplosion(box);
        soundEffects.playExplosionSound();
      })
    }
    lineClickAction.removeLineClickHighlights();
  },
  checkForChainReactions: (boxesToCheck) => {
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

    // cache box number
    const boxNumber = boxInfo.getBoxNumberFromBoxX(box);
    const topBox = boxInfo.getTopBox(boxNumber);
    const rightBox = boxInfo.getRightBox(boxNumber);
    const bottomBox = boxInfo.getBottomBox(boxNumber);
    const leftBox = boxInfo.getLeftBox(boxNumber);

    // cache boxes to target
    const linesToRemove = [
      { box: topBox, lines: ["bottom"] },
      { box: rightBox, lines: ["left"] },
      { box: bottomBox, lines: ["top"] },
      { box: leftBox, lines: ["right"] },
      { box: box, lines: ["top", "right", "bottom", "left"] }
    ];

    // make boxes explode
    bomb.explodeBoxesFromArray(linesToRemove);

    const boxesToExplode = [topBox, bottomBox, leftBox, rightBox];
    bomb.checkForChainReactions(boxesToExplode)
  },
  explodeBoxesFromArray: (linesToRemove) => {
    linesToRemove.forEach(item => {
      if (item.box) {
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box);
        if(!bomb.isExploding.includes(item.box)) {
          bomb.isExploding.push(item.box);
          bomb.showSpriteExplosion(item.box);
        }
      }
    });
  },
  largerExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isLargeExplosion = false;
    // cache box number
    const boxNumber = boxInfo.getBoxNumberFromBoxX(box);
    // get all boxes surrounding boxes
    const allBorders = boxInfo.getAllBorders(boxNumber);
    // get borders to remove according to the largerExplosion rules
    const bordersToRemove = boxInfo.getBordersToRemove(box, allBorders);
    // make boxes explode
    bomb.explodeBoxesFromArray(bordersToRemove);
    bomb.checkForChainReactions(Object.entries(allBorders).map(data => data[1]));
  },
  verticalExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isVerticalExplosion = false;

    // cache box number
    const boxNumber = boxInfo.getBoxNumberFromBoxX(box);

    const topBox = boxInfo.getTopBox(boxNumber);
    const bottomBox = boxInfo.getBottomBox(boxNumber);

    const twoBoxesUp = topBox ? boxInfo.getTopBox(boxInfo.getBoxNumberFromBoxX(topBox)) : false;
    let twoBoxesDown = bottomBox ? boxInfo.getBottomBox(boxInfo.getBoxNumberFromBoxX(bottomBox)) : false;

    // cache boxes to target
    const linesToRemove = [
      { box: twoBoxesDown, lines: ["top"] },
      { box: twoBoxesUp, lines: ["bottom"] },
      { box: boxInfo.getTopBox(boxNumber), lines: ["top", "bottom"] },
      { box: boxInfo.getBottomBox(boxNumber), lines: ["top", "bottom"] },
      { box: box, lines: ["top", "bottom"] }
    ];

    // make boxes explode
    bomb.explodeBoxesFromArray(linesToRemove);

    const boxesToExplode = [topBox, bottomBox, twoBoxesUp, twoBoxesDown];

    bomb.checkForChainReactions(boxesToExplode)
  },
  horizontalExplosion: (box) => {
    // removes the bomb image from the box after the ui is populated
    gameBoard[box].isHorizontalExplosion = false;

    // cache box number
    const boxNumber = boxInfo.getBoxNumberFromBoxX(box);
    const rightBox = boxInfo.getRightBox(boxNumber);
    const twoBoxesRight = rightBox ? boxInfo.getRightBox(boxInfo.getBoxNumberFromBoxX(rightBox)) : false;
    const leftBox = boxInfo.getLeftBox(boxNumber);
    const twoBoxesLeft = leftBox ? boxInfo.getLeftBox(boxInfo.getBoxNumberFromBoxX(leftBox)) : false;

    // cache boxes to target
    const linesToRemove = [
      { box: twoBoxesLeft, lines: ["right"] },
      { box: twoBoxesRight, lines: ["left"] },
      { box: boxInfo.getRightBox(boxNumber), lines: ["right", "left"] },
      { box: boxInfo.getLeftBox(boxNumber), lines: ["right", "left"] },
      { box: box, lines: ["right", "left"] },
    ];

    // make boxes explode
    bomb.explodeBoxesFromArray(linesToRemove);

    const boxesToExplode = [boxInfo.getRightBox(boxNumber), boxInfo.getLeftBox(boxNumber), twoBoxesLeft, twoBoxesRight];

    bomb.checkForChainReactions(boxesToExplode)
  },
  isExploding: [],
  showSpriteExplosion: (box) => {
    $(`.${box} > .spriteSheet`).addClass("explosionGif");
    setTimeout(() => {
      $(`.${box} > .spriteSheet`).removeClass("explosionGif");

      // remove the box from the exploding array
      const index = bomb.isExploding.indexOf(box);
      bomb.isExploding.splice(index, 1);
    }, 800);
    bomb.explodeLockBoxIfHit(box);
  }
}
