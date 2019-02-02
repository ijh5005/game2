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
    for(let i = 0; i < 15; i++){
      const randomNumber = Math.floor(Math.random()*60);
      const boxNumber = `box${Math.floor(Math.random()*34)}`;
      if(!useTurns.includes(randomNumber) && !useTurns.includes(boxNumber)){
        useTurns = [...useTurns, randomNumber, boxNumber];
        bomb.populationData.push({randomNumber, boxNumber});
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
    if(number > 65){
      explosion = bomb.types[4];
    } else if(number > 55){
      explosion = bomb.types[3];
    } else if(number > 40){
      explosion = bomb.types[2];
    } else if(number > 20){
      explosion = bomb.types[1];
    }
    document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class)
    gameBoard[boxNumber][explosion.key] = true;
  },
  explodeBoxes: (box) => {
    if (gameBoard[box].isMediumExplosion) {
      helper.mediumExplosion(box);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isLargeExplosion) {
      setTimeout(() => {
        helper.largerExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isVerticalExplosion) {
      setTimeout(() => {
        helper.verticalExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isHorizontalExplosion) {
      setTimeout(() => {
        helper.horizontalExplosion(box);
        soundEffects.playExplosionSound();
      })
    } else if (gameBoard[box].isVeryLargeExplosion) {
      setTimeout(() => {
        helper.isVeryLargeExplosion(box);
        soundEffects.playExplosionSound();
      })
    }
  },
  checkForChainReactions: (boxesToCheck) => {
    setTimeout(() => {
      boxesToCheck.forEach(box => {
        if(box){
          bomb.explodeBoxes(box)
        }
      })
    }, 80 * 4)
  }
}
