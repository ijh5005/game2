const bomb = {
  types: [
    { key: "isLionExplosion", class: "isLionExplosion" },
    { key: "isCheetahExplosion", class: "isCheetahExplosion" },
    { key: "isPantherExplosion", class: "isPantherExplosion" },
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
      let index;
      lockBombLocations.forEach((data, i) => {
        if(data.box === box){
          index = i;
        }
      })
      if(index || index === 0){
        lockBombLocations[index].toughness--;
        if(lockBombLocations[index].toughness <= 0){
          setTimeout(() => {
            let newIndex;
            lockBombLocations.forEach((data, index) => {
              if(data.box === box){
                newIndex = index
              }
            })
            lockBombLocations.splice(newIndex, 1);
            $(`.box.${box}`).removeClass("locked");
          }, 300);
        }
      }
    };
  },
  placeBomb: (boxNumber) => {
    //wait for explosions to stop before placing bomb
    if(bomb.isExploding.length === 0){
      setTimeout(() => {
        let explosion = bomb.types[0];
        const number = Math.floor(Math.random() * 100);
        if(number > 66){ explosion = bomb.types[0]; }
        else if(number > 33){ explosion = bomb.types[1]; }
        else { explosion = bomb.types[2]; }
        if(!bomb.isExplosionBox(boxNumber) && !boxInfo.isALockBox(boxNumber)){
          // track.decrementBombCount();
          soundEffects.playShowBombSound();
          document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class);
          bomb.showSpriteSmoke(boxNumber);
          gameBoard[boxNumber][explosion.key] = true;
        } else {
          // track.incrementMissedBombCount();
          const missedBox = {
            missedBox: true,
            box: boxNumber
          }
        }
      }, 400)
    } else {
      bomb.placeBomb()
    }
  },
  explodeBoxes: (box) => {
    if (gameBoard[box].isLionExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isLionExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.lion.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isCheetahExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isCheetahExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.cheetah.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isPantherExplosion) {
      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isPantherExplosion = false;
      const {
        boxesToExplode,
        linesToRemove
      } = animalExplosions.panther.boxes(box);
      explodingBoxes.push(...boxesToExplode);
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
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
  allExplodingBoxes: [],
  fillExplodingBoxes: (box) => {
    bomb.allExplodingBoxes.push(box);
    setTimeout(() => {
      bomb.allExplodingBoxes.pop();
    })
  },
  explodeBoxesFromArray: (linesToRemove, box) => {
    linesToRemove.forEach(item => {
      if (item.box) {
        bomb.fillExplodingBoxes(item.box);
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box);
        if(!bomb.isExploding.includes(item.box)) {
          bomb.isExploding.push(item.box);
          bomb.showSpriteExplosion(item.box);
        }
      }
    });
  },
  isExploding: [],
  showSpriteExplosion: (box) => {
    $(`.${box} > .spriteSheet`).addClass("explosionGif");
    setTimeout(() => {
      $(`.${box} > .spriteSheet`).removeClass("explosionGif");
      // remove the box from the exploding array
      bomb.isExploding.pop();
    }, 800);
    bomb.explodeLockBoxIfHit(box);
  },
  showSpriteSmoke: (box) => {
    $(`.${box} > .spriteSheet`).addClass("smokeGif");
    setTimeout(() => {
      $(`.${box} > .spriteSheet`).removeClass("smokeGif");
    }, 800);
  }
}
