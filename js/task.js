const task = {
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
    isFirstPlayerTurn = (hasScored || disableComputer) ? isFirstPlayerTurn : !isFirstPlayerTurn;
    task.setTurnIndicator();
    hasScored ? soundEffects.playScoreSound() : soundEffects.playLineClickSound();
    hasScored = false;
    if (!isFirstPlayerTurn) { // make the computer move
      computerMove.makeComputerMove();
    }
  },
  isGameOver: () => {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(box => {
      const firstPlayerScored = task.hasClassByQuerySelector(`.${box}`, "firstPlayerScored");
      const secondPlayerScored = task.hasClassByQuerySelector(`.${box}`, "secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    });
    if(totalPointsScored === gameBoardLength){
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
      heading, text, img_src
    } = getGameLevelObj.tipsPage || level_data[0].tipsPage;
    task.addTextByQuerySelector("#tipHeading", heading);
    task.addTextByQuerySelector("#tipText", text);
    document.getElementById("tipImage").src = img_src;
  },
  setDifficulty: (difficulty) => {
    if (difficulty === "easy") { chanceToGiveAWayPoint = 0.4 }
    else if (difficulty === "medium") { chanceToGiveAWayPoint = 0.2 }
    else if (difficulty === "hard") { chanceToGiveAWayPoint = 0.01 }
  },
  clearBoard: () => {
    document.getElementsByClassName("box")[0].remove();
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
    computerMove.makeComputerMove();
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
    return level_data[gameLevel];
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
  setStarsForWinner: (score) => {
    const starRubric = getGameLevelObj.starRating || [];
    if(score >= starRubric[2].score){ return 3 }
    else if(score >= starRubric[1].score){ return 2 }
    else if(score >= starRubric[0].score){ return 1 }
  },
  setTurnIndicator: () => {
    task.removeClassByClassName("turnPlayer", "firstPlayerTurn");
    task.removeClassByClassName("turnPlayer", "secondPlayerTurn");
    if(isFirstPlayerTurn){ task.addClassByQuerySelector(".turnPlayer", "firstPlayerTurn") }
    else { task.addClassByQuerySelector(".turnPlayer", "secondPlayerTurn") }
  },
  setTurnRestrictions: () => {
    task.resetAllRestrictions();

    const { isTrainingBoard } = level_data[gameLevel];
    if(isTrainingBoard){
      const { restrictions } = level_data[gameLevel].trainingRestrictions;
      restrictions.forEach(restriction => {
        const {
          turn,
          type,
          boxOne,
          boxTwo,
          clickBox
        } = restriction;
        const onRestrictionTurn = track.turn === turn;
        if(onRestrictionTurn){
          task.resetAllRestrictions();
          if(type === "highLightLine"){
            restrictionLineClicks = [boxOne, boxTwo];
            task.highlightLine();
          } else if (type === "clickBox") {
            restrictionClickBox = clickBox;
          }
        }
      })
    }
  },
  highlightLine: () => {
    const restrict = task.breakRefAndCopy(restrictionLineClicks);
    setTimeout(() => {
      lineClickAction.removeLineClickHighlights();
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
    }

    if(!hasPassed){
      soundEffects.playWrongSound();
    }

    return hasPassed;
  },
  hasAPreMadeMove: () => {
    let hasPreMadeMove = false;
    let moveToMake = "";
    const { computerMoves } = level_data[gameLevel];
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
  }
}
