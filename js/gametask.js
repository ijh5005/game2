const gametask = {
  endTurnTasks: () => {
    setTimeout(() => {
      gametask.setTurnPlayer();
    })
  },
  endGameChecker: 0,
  startEndGameInterval: () => {
    clearInterval(gametask.endGameChecker);
    gametask.endGameChecker = setInterval(() => {
      gametask.isGameOver();
    }, 1000)
  },
  setTurnPlayer: () => {
    setTimeout(() => {
      const noMoreLinesToClick =
        (app.twoBorderBoxes.length === 0) && (app.noBorders.length === 0) &&
        (app.oneBorderBoxes.length === 0) && (app.threeBorderBoxes.length !== 0);
      const hasLockedBoxes = (lockBombLocations.length > 0);
      if(noMoreLinesToClick && hasLockedBoxes){
        console.log("game over");
      }
    })

    gametask.resetAllRestrictions();

    let incrementTurn = true;;
    if(takeAnotherTurn && isFirstPlayerTurn){
      takeAnotherTurn = false;
    } else if (takeAnotherTurn && !isFirstPlayerTurn) {
      takeAnotherTurn = false;
    } else if(layedBomb){
      layedBomb = false;
      incrementTurn = false;
    } else if (clickedExplosion) {
      clickedExplosion = false;
      isFirstPlayerTurn = !isFirstPlayerTurn;
    } else if(!takeAnotherTurn){
      isFirstPlayerTurn = !isFirstPlayerTurn;
      soundEffects.playLineClickSound();
    }

    gametask.setTurnIndicator();

    setTimeout(() => {
      if(incrementTurn){
        track.incrementTurn()
      }
      ui.populateTheUI();
      ui.startLevelText();
      setTimeout(() => {
        if(!isFirstPlayerTurn){
          computerMove.makeComputerMove();
        }
      }, 100)
    })
  },
  isGameOver: () => {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(box => {
      const firstPlayerScored = gametask.hasClassByQuerySelector(`.${box}`, "firstPlayerScored");
      const secondPlayerScored = gametask.hasClassByQuerySelector(`.${box}`, "secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    });
    if(totalPointsScored === gameBoardLength){
      clearInterval(gametask.endGameChecker);
      settings.endGame = true;
      setTimeout(() => {
        settings.endGame = false;
      }, 4000)
      if(playerOneScore > playerTwoScore){
        ui.showCompleteScreen();
      } else if(playerOneScore === playerTwoScore){
        boardText.showOnBoard("DRAW", 5000);
        isFirstPlayerTurn = true;
      } else {
        boardText.showOnBoard("Aint nobody got time for that!", 5000);
        isFirstPlayerTurn = true;
      }
    } else {
      const hasNoBorderBoxes = app.noBorders.length === 0;
      const hasTwoBorderBoxes = app.twoBorderBoxes.length === 0;
      const hasThreeBorderBoxes = app.threeBorderBoxes.length === 0;
      const noBoxesLeft = hasNoBorderBoxes && hasTwoBorderBoxes && hasThreeBorderBoxes;
      if(noBoxesLeft){

        settings.endGame = true;
        setTimeout(() => {
          settings.endGame = false;
        }, 4000)

        boardText.showOnBoard("Game Over! Blow up the foot of oppression to win", 6000);
        isFirstPlayerTurn = true;
      }
    }
  },
  getRandomIndexInArray: (boxArray) => {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
  setGameLevelAndTips: (level) => {
    gameLevel = level - 1;
    gametask.setGameLevelObj();
    track.goToPage('tipsPage');
    gametask.setTips(level);
  },
  setTips: (level) => {
    if(!getGameLevelObj.tipsPage){
      ui.startGame()
    }

    const {
      heading, text, img_src, height
    } = getGameLevelObj.tipsPage || settings.level_data[0].tipsPage;

    gametask.addTextByQuerySelector("#tipHeading", heading);
    gametask.addTextByQuerySelector("#tipText", text);
    document.getElementById("tipImage").src = img_src;
    document.getElementById("tipImage").style.height = height;
  },
  setDifficulty: (difficulty) => {
    if (difficulty === "easy") { app.chanceToGiveAWayPoint = 0.4 }
    else if (difficulty === "medium") { app.chanceToGiveAWayPoint = 0.2 }
    else if (difficulty === "hard") { app.chanceToGiveAWayPoint = 0.01 }
  },
  clearBoard: () => {
    // document.getElementsByClassName("box")[0].remove();
    ui.startGame(gameLevel + 1); // add one for the index
  },
  breakRefAndCopy: (obj) => {
    return JSON.parse(JSON.stringify(obj));
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
  isSelected: () => {
    return gametask.getLengthOfElement(".tool.selected") === 1
  },
  resetScore: () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    gametask.addTextByQuerySelector(".playerOneScore", playerOneScore);
    gametask.addTextByQuerySelector(".playerTwoScore", playerTwoScore);
  },
  resetPlayerTurn: () => {
    isFirstPlayerTurn = true;
    gametask.setTurnIndicator();
  },
  saveToLocalStorage: (key, obj) => {
    window.localStorage.setItem("boxes", JSON.stringify({
      [key]: obj
    }));
  },
  setFromLocalStorage: () => {
    setTimeout(() => {
      if(!localStorage.boxes || app.reset_settings){
        gametask.saveToLocalStorage("settings", settings)
      } else {
        const storage = JSON.parse(localStorage.boxes)
        settings = storage.settings;
      }
      settings.level_data.forEach((data, index) => {
        if(data.help){
          data.help.boardHelpText = helpTextArray[index].help.boardHelpText;
          data.help.helpTurns = helpTextArray[index].help.helpTurns;
        }
      })
    })
  },
  changeTitleColor: () => {
    gametask.addClassByClassName("title", "transitionColor");
    setInterval(function () {
      const hasColorChangheClass = gametask.hasClassByClassName("title", "colorChange");
      if(hasColorChangheClass){
        gametask.removeClassByClassName("title", "colorChange");
        gametask.removeClassByClassName("africa", "lighter");
        gametask.addClassByClassName("ripple", "active");
        setTimeout(() => {
          gametask.removeClassByClassName("ripple", "active");
        }, 100)
      } else {
        gametask.addClassByClassName("title", "colorChange");
        gametask.addClassByClassName("africa", "lighter");
      }
    }, 4000);
  },
  passTurn: () => {
    isFirstPlayerTurn = !isFirstPlayerTurn;
    gametask.setTurnIndicator();
    if(!isFirstPlayerTurn){
      computerMove.setMakeComputerMove();
    }
  },
  resizeBoard: () => {
    setTimeout(() => {
      const boardSize = gametask.getWidthWithId("board");
      const gridWidth = boardSize/6;
      gametask.setHeightWithClassName("box", gridWidth - 6);
      gametask.setWidthWithClassName("box", gridWidth - 6);
    })
  },
  getTools: () => {
    return getGameLevelObj.tools ? gametask.breakRefAndCopy(getGameLevelObj.tools) : [];
  },
  setGameLevelObj: () => {
    getGameLevelObj = gametask.getGameLevelObj();
  },
  getGameLevelObj: () => {
    return settings.level_data[gameLevel];
  },
  addTextByQuerySelector: (selector, text) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].innerText = text;
      }
    }
  },
  addHTMLByQuerySelector: (selector, html) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].innerHTML = html;
      }
    }
  },
  getTextByQuerySelector: (selector) => {
    const element = document.querySelectorAll(selector)[0];
    return element.innerText;
  },
  addClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.add(classToRemove);
      }
    }
  },
  removeClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  removeClassByQuerySelector: (selector, classToRemove) => {
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  removeClassByClassName: (selector, classToRemove) => {
    const element = document.getElementsByClassName(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.remove(classToRemove);
      }
    }
  },
  addClassByClassName: (selector, classToAdd) => {
    const element = document.getElementsByClassName(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        element[i].classList.add(classToAdd);
      }
    }
  },
  hasClassByClassName: (selector, classToCheckFor) => {
    const element = document.getElementsByClassName(selector)[0];
    if(element){
      return element.classList.contains(classToCheckFor);
    }
  },
  hasClassByQuerySelector: (selector, classToCheckFor) => {
    let hasClass = false;
    const element = document.querySelectorAll(selector);
    const length = element.length;
    if(element){
      for(let i = 0; i < length; i++){
        if(element[i].classList.contains(classToCheckFor)){
          hasClass = true;
        }
      }
    }
    return hasClass;
  },
  getHeightWithClassName: (selector) => {
    return document.getElementsByClassName(selector)[0].clientHeight;
  },
  getWidthWithClassName: (selector) => {
    return document.getElementsByClassName(selector)[0].clientWidth;
  },
  getWidthWithId: (selector) => {
    return document.getElementById(selector).clientWidth;
  },
  setHeightWithClassName: (selector, height) => {
    const sel = document.getElementsByClassName(selector);
    const length = sel.length;
    for(let i = 0; i < length; i++){
      sel[i].style.height = `${height}px`;
    }
  },
  setWidthWithClassName: (selector, width) => {
    const sel = document.getElementsByClassName(selector);
    const length = sel.length;
    for(let i = 0; i < length; i++){
      sel[i].style.width = `${width}px`;
    }
  },
  getLengthOfElement: (selector) => {
    const query = document.querySelectorAll(selector);
    return query.length;
  },
  getStarsForWinner: (score) => {
    const starRubric = getGameLevelObj.starRating || [];
    if(score >= starRubric[2].score){ return 3 }
    else if(score >= starRubric[1].score){ return 2 }
    else if(score >= starRubric[0].score){ return 1 }
  },
  setStarsForWinner: (stars) => {
    settings.level_data[gameLevel].stars = stars;
    gametask.saveToLocalStorage("settings", settings);
  },
  openNextBoard: (stars) => {
    const nextLevel = settings.level_data[gameLevel + 1];
    if(stars > 0 && nextLevel){
      nextLevel.isLocked = false;
      gametask.saveToLocalStorage("settings", settings);
    }
  },
  setTurnIndicator: () => {
    gametask.removeClassByClassName("scoreHolder", "thisPlayerTurn");
    if(isFirstPlayerTurn){ gametask.addClassByQuerySelector(".firstPlayerTurnHolder", "thisPlayerTurn") }
    else { gametask.addClassByQuerySelector(".secondPlayerTurnHolder", "thisPlayerTurn") }
  },
  setTurnRestrictions: () => {
    const { trainingRestrictions } = settings.level_data[gameLevel];
    if(trainingRestrictions){
      const { restrictions } = settings.level_data[gameLevel].trainingRestrictions;
      restrictions.forEach(restriction => {
        const {
          turn,
          type,
          boxOne,
          boxTwo,
          clickBox,
          then
        } = restriction;
        const onRestrictionTurn = track.turn === turn;
        if(onRestrictionTurn){
          gametask.resetAllRestrictions();
          if(type === "highLightLine"){
            app.restrictionLineClicks = [boxOne, boxTwo];
            gametask.highlightLine();
          } else if (type === "clickBox") {
            app.restrictionClickBox = clickBox;
            setTimeout(() => {
              gametask.addClassByClassName(clickBox, "clickBox");
            }, 500)
          } else if (type === "layBomb") {
            app.restrictionLayBomb = clickBox;
            const boxToClick = settings.level_data[gameLevel].clickAnimal;
            setTimeout(() => {
              gametask.addClassByQuerySelector(`.tool.${boxToClick}`, "clickBox");
            })
          }
          if(then){
            app.nextRestriction = then;
          }
        }
      })
    }
  },
  highlightLine: () => {
    const restrict = gametask.breakRefAndCopy(app.restrictionLineClicks);
    setTimeout(() => {
      restrict.forEach(data => {
        if(data.side === "top"){
          gametask.addClassByClassName(data.box, "clickTopLine")
        } else if (data.side === "right") {
          gametask.addClassByClassName(data.box, "clickRightLine")
        } else if (data.side === "bottom") {
          gametask.addClassByClassName(data.box, "clickBottomLine")
        } else if (data.side === "left") {
          gametask.addClassByClassName(data.box, "clickLeftLine")
        }
      })
    }, 500)
  },
  resetAllRestrictions: () => {
    app.restrictionLineClicks = null;
    app.restrictionClickBox = null;
    app.restrictionLayBomb = null;
    app.nextRestriction = null;
    setTimeout(() => {
      gametask.removeClassByClassName("box", "clickTopLine");
      gametask.removeClassByClassName("box", "clickRightLine");
      gametask.removeClassByClassName("box", "clickBottomLine");
      gametask.removeClassByClassName("box", "clickLeftLine");
    }, 500)
  },
  onRestrictionTurn: () => {
    return app.restrictionLineClicks || app.restrictionClickBox;
  },
  hasPassedTrainingRestriction: (boxNumber, lineClicked) => {
    let hasPassed = true;
    if(app.restrictionLineClicks){
      hasPassed = false;
      app.restrictionLineClicks.forEach(restriction => {
        const { box, side } = restriction;
        if(box === boxNumber && side === lineClicked){
          hasPassed = true;
        }
      })
    } else if (app.restrictionClickBox) {
      hasPassed = false;
      if(app.restrictionClickBox.includes(boxNumber) && !lineClicked){
        hasPassed = true;
      }
    } else if(app.restrictionLayBomb) {
      hasPassed = false;
      if(app.restrictionLayBomb.includes("any box") || app.restrictionLayBomb.includes(boxNumber)){
        if(!lineClicked){
          hasPassed = true;
          app.restrictionLayBomb = null;

          if(app.nextRestriction){
            const {
              turn,
              type,
              boxOne,
              boxTwo,
              clickBox,
              then,
              withClickBox
            } = app.nextRestriction;
            if(type === "highLightLine"){
              setTimeout(() => {
                app.restrictionLineClicks = [boxOne, boxTwo];
                gametask.highlightLine();
              }, 500)
            } else if (type === "clickBox") {
              if(withClickBox){
                setTimeout(() => {
                  app.restrictionClickBox = [...clickBox, boxNumber];
                  app.restrictionClickBox.forEach(data => {
                    gametask.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              } else {
                setTimeout(() => {
                  app.restrictionClickBox = [...clickBox];
                  app.restrictionClickBox.forEach(data => {
                    gametask.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              }
            } else if (type === "layBomb") {
              setTimeout(() => {
                app.restrictionLayBomb = clickBox;
              })
            }
          }
        }
      }
    }

    if(!hasPassed){
      soundEffects.playWrongSound();
    }

    return hasPassed;
  },
  hasAPreMadeMove: () => {
    let hasPreMadeMove = false;
    let moveToMake = "";
    const { computerMoves } = settings.level_data[gameLevel];
    if(computerMoves){
      computerMoves.forEach(move => {
        if(move.turn === track.turn){
          hasPreMadeMove = true;
          moveToMake = move;
        }
      })
    }
    return {
      hasPreMadeMove,
      moveToMake
    }
  },
  incorrectClick: (boxNumber, lineClicked) => {
    if(boxNumber && lineClicked){
      // turns the line red to indicate that it cant be clicked
      ui.displayNoClickIndicator(boxNumber, lineClicked);
    }
    soundEffects.playWrongSound();
  },
  setToolClickEvent: () => {
    $(document).on("click", ".tool.clickBox", () => {
      gametask.removeClassByClassName(".tool", "keepSelected");
      const clickBox = settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickBox;
      clickBox.forEach(box => {
        gametask.addClassByQuerySelector(".tool.clickBox", "keepSelected");
        gametask.removeClassByQuerySelector(".tool.clickBox", "clickBox");
        gametask.addClassByClassName(box, "clickBox");
      })
    })
  },
  shouldHighlightLayedBomb: () => {
    if(!settings.level_data[gameLevel].trainingRestrictions){
      return null;
    }
    return settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn]
            && settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickWhenLayed;
  },
  selectStoreItem: (item, cost) => {
    const currentGold = settings.gold;
    if(currentGold >= cost){
      for (var x in app.storeItemSelected) delete app.storeItemSelected[x];
      app.storeItemSelected.item = item;
      app.storeItemSelected.cost = cost;
      ui.toggleConfirmScreen();
    } else {
      soundEffects.playWrongSound();
    }
  },
  buyItem: () => {
    const currentGold = settings.gold;
    settings.gold = currentGold - app.storeItemSelected.cost;
    settings.itemsPurchased.push(app.storeItemSelected.item);
    const newQuantity = settings.store[app.storeItemSelected.item].quantity + 1;
    settings.store[app.storeItemSelected.item].quantity = newQuantity;
    gametask.saveToLocalStorage("settings", settings)
    ui.toggleConfirmScreen();
    document.getElementById("goldAmount").innerText = settings.gold;
    ui.populateStore();
  }
}

module.exports = gametask;
