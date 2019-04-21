const task = {
  endTurnTasks: () => {
    setTimeout(() => {
      task.setTurnPlayer();
    })
  },
  endGameChecker: 0,
  startEndGameInterval: () => {
    clearInterval(task.endGameChecker);
    task.endGameChecker = setInterval(() => {
      task.isGameOver();
    }, 1000)
  },
  setTurnPlayer: () => {
    setTimeout(() => {
      const noMoreLinesToClick =
        (twoBorderBoxes.length === 0) && (noBorders.length === 0) &&
        (oneBorderBoxes.length === 0) && (threeBorderBoxes.length !== 0);
      const hasLockedBoxes = (lockBombLocations.length > 0);
      if(noMoreLinesToClick && hasLockedBoxes){
        console.log("game over");
      }
    })

    task.resetAllRestrictions();

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

    task.setTurnIndicator();

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
      const firstPlayerScored = task.hasClassByQuerySelector(`.${box}`, "firstPlayerScored");
      const secondPlayerScored = task.hasClassByQuerySelector(`.${box}`, "secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    });
    if(totalPointsScored === gameBoardLength){
      clearInterval(task.endGameChecker);
      if(playerOneScore > playerTwoScore){
        ui.showCompleteScreen();
      } else if(playerOneScore === playerTwoScore){
        boardText.showOnBoard("DRAW", 5000);
        isFirstPlayerTurn = true;
      } else {
        boardText.showOnBoard("You Be Ard. Try again", 5000);
        isFirstPlayerTurn = true;
      }
    }
  },
  getRandomIndexInArray: (boxArray) => {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
  setGameLevelAndTips: (level) => {
    gameLevel = level - 1;
    task.setGameLevelObj();
    track.goToPage('tipsPage');
    task.setTips(level);
  },
  setTips: (level) => {
    const {
      heading, text, img_src, height
    } = getGameLevelObj.tipsPage || settings.level_data[0].tipsPage;

    task.addTextByQuerySelector("#tipHeading", heading);
    task.addTextByQuerySelector("#tipText", text);
    document.getElementById("tipImage").src = img_src;
    document.getElementById("tipImage").style.height = height;
  },
  setDifficulty: (difficulty) => {
    if (difficulty === "easy") { chanceToGiveAWayPoint = 0.4 }
    else if (difficulty === "medium") { chanceToGiveAWayPoint = 0.2 }
    else if (difficulty === "hard") { chanceToGiveAWayPoint = 0.01 }
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
    return task.getLengthOfElement(".tool.selected") === 1
  },
  resetScore: () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    task.addTextByQuerySelector(".playerOneScore", playerOneScore);
    task.addTextByQuerySelector(".playerTwoScore", playerTwoScore);
  },
  resetPlayerTurn: () => {
    isFirstPlayerTurn = true;
    task.setTurnIndicator();
  },
  saveToLocalStorage: (key, obj) => {
    localStorage['boxes'] = JSON.stringify({
      [key]: obj
    });
  },
  setFromLocalStorage: () => {
    setTimeout(() => {
      if(!localStorage.boxes || reset_settings){
        task.saveToLocalStorage("settings", settings)
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
    task.addClassByClassName("title", "transitionColor");
    setInterval(function () {
      const hasColorChangheClass = task.hasClassByClassName("title", "colorChange");
      if(hasColorChangheClass){
        task.removeClassByClassName("title", "colorChange");
        task.removeClassByClassName("africa", "lighter");
        task.addClassByClassName("ripple", "active");
        setTimeout(() => {
          task.removeClassByClassName("ripple", "active");
        }, 100)
      } else {
        task.addClassByClassName("title", "colorChange");
        task.addClassByClassName("africa", "lighter");
      }
    }, 4000);
  },
  passTurn: () => {
    isFirstPlayerTurn = !isFirstPlayerTurn;
    task.setTurnIndicator();
    if(!isFirstPlayerTurn){
      computerMove.setMakeComputerMove();
    }
  },
  resizeBoard: () => {
    setTimeout(() => {
      const boardSize = task.getWidthWithId("board");
      const gridWidth = boardSize/6;
      task.setHeightWithClassName("box", gridWidth - 6);
      task.setWidthWithClassName("box", gridWidth - 6);
    })
  },
  getTools: () => {
    return getGameLevelObj.tools ? task.breakRefAndCopy(getGameLevelObj.tools) : [];
  },
  setGameLevelObj: () => {
    getGameLevelObj = task.getGameLevelObj();
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
    task.saveToLocalStorage("settings", settings);
  },
  openNextBoard: (stars) => {
    const nextLevel = settings.level_data[gameLevel + 1];
    if(stars > 0 && nextLevel){
      nextLevel.isLocked = false;
      task.saveToLocalStorage("settings", settings);
    }
  },
  setTurnIndicator: () => {
    task.removeClassByClassName("scoreHolder", "thisPlayerTurn");
    if(isFirstPlayerTurn){ task.addClassByQuerySelector(".firstPlayerTurnHolder", "thisPlayerTurn") }
    else { task.addClassByQuerySelector(".secondPlayerTurnHolder", "thisPlayerTurn") }
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
          task.resetAllRestrictions();
          if(type === "highLightLine"){
            restrictionLineClicks = [boxOne, boxTwo];
            task.highlightLine();
          } else if (type === "clickBox") {
            restrictionClickBox = clickBox;
            setTimeout(() => {
              task.addClassByClassName(clickBox, "clickBox");
            }, 500)
          } else if (type === "layBomb") {
            restrictionLayBomb = clickBox;
            const boxToClick = settings.level_data[gameLevel].clickAnimal;
            setTimeout(() => {
              task.addClassByQuerySelector(`.tool.${boxToClick}`, "clickBox");
            })
          }
          if(then){
            nextRestriction = then;
          }
        }
      })
    }
  },
  highlightLine: () => {
    const restrict = task.breakRefAndCopy(restrictionLineClicks);
    setTimeout(() => {
      restrict.forEach(data => {
        if(data.side === "top"){
          task.addClassByClassName(data.box, "clickTopLine")
        } else if (data.side === "right") {
          task.addClassByClassName(data.box, "clickRightLine")
        } else if (data.side === "bottom") {
          task.addClassByClassName(data.box, "clickBottomLine")
        } else if (data.side === "left") {
          task.addClassByClassName(data.box, "clickLeftLine")
        }
      })
    }, 500)
  },
  resetAllRestrictions: () => {
    restrictionLineClicks = null;
    restrictionClickBox = null;
    restrictionLayBomb = null;
    nextRestriction = null;
    setTimeout(() => {
      task.removeClassByClassName("box", "clickTopLine");
      task.removeClassByClassName("box", "clickRightLine");
      task.removeClassByClassName("box", "clickBottomLine");
      task.removeClassByClassName("box", "clickLeftLine");
    }, 500)
  },
  onRestrictionTurn: () => {
    return restrictionLineClicks || restrictionClickBox;
  },
  hasPassedTrainingRestriction: (boxNumber, lineClicked) => {
    let hasPassed = true;
    if(restrictionLineClicks){
      hasPassed = false;
      restrictionLineClicks.forEach(restriction => {
        const { box, side } = restriction;
        if(box === boxNumber && side === lineClicked){
          hasPassed = true;
        }
      })
    } else if (restrictionClickBox) {
      hasPassed = false;
      if(restrictionClickBox.includes(boxNumber) && !lineClicked){
        hasPassed = true;
      }
    } else if(restrictionLayBomb) {
      hasPassed = false;
      if(restrictionLayBomb.includes("any box") || restrictionLayBomb.includes(boxNumber)){
        if(!lineClicked){
          hasPassed = true;
          restrictionLayBomb = null;

          if(nextRestriction){
            const {
              turn,
              type,
              boxOne,
              boxTwo,
              clickBox,
              then,
              withClickBox
            } = nextRestriction;
            if(type === "highLightLine"){
              setTimeout(() => {
                restrictionLineClicks = [boxOne, boxTwo];
                task.highlightLine();
              }, 500)
            } else if (type === "clickBox") {
              if(withClickBox){
                setTimeout(() => {
                  restrictionClickBox = [...clickBox, boxNumber];
                  restrictionClickBox.forEach(data => {
                    task.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              } else {
                setTimeout(() => {
                  restrictionClickBox = [...clickBox];
                  restrictionClickBox.forEach(data => {
                    task.addClassByClassName(data, "clickBox");
                  })
                }, 500)
              }
            } else if (type === "layBomb") {
              setTimeout(() => {
                restrictionLayBomb = clickBox;
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
      task.removeClassByClassName(".tool", "keepSelected");
      const clickBox = settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickBox;
      clickBox.forEach(box => {
        task.addClassByQuerySelector(".tool.clickBox", "keepSelected");
        task.removeClassByQuerySelector(".tool.clickBox", "clickBox");
        task.addClassByClassName(box, "clickBox");
      })
    })
  },
  shouldHighlightLayedBomb: () => {
    return settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn]
            && settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickWhenLayed;
  },
  selectStoreItem: (item, cost) => {
    const currentGold = settings.gold;
    if(currentGold >= cost){
      for (var x in storeItemSelected) delete storeItemSelected[x];
      storeItemSelected.item = item;
      storeItemSelected.cost = cost;
      ui.toggleConfirmScreen();
    } else {
      soundEffects.playWrongSound();
    }
  },
  buyItem: () => {
    const currentGold = settings.gold;
    settings.gold = currentGold - storeItemSelected.cost;
    settings.itemsPurchased.push(storeItemSelected.item);
    const newQuantity = settings.store[storeItemSelected.item].quantity + 1;
    settings.store[storeItemSelected.item].quantity = newQuantity;
    task.saveToLocalStorage("settings", settings)
    ui.toggleConfirmScreen();
    document.getElementById("goldAmount").innerText = settings.gold;
    ui.populateStore();
  }
}
