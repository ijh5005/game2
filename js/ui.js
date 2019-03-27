const ui = {
  startGame: () => {
    textType = null;
    on_game_board = true;
    task.resetPlayerTurn();
    task.resetScore();
    track.goToPage(settings.startUpPage);
    task.setDifficulty(settings.difficulty);
    initialBombs = getGameLevelObj.initialBombs ? task.breakRefAndCopy(getGameLevelObj.initialBombs) : [];
    bombsToLay = getGameLevelObj.bombsToLay ? task.breakRefAndCopy(getGameLevelObj.bombsToLay) : 0;
    // track.setRemainingBombs();
    lockBombLocations = getGameLevelObj.lockBoxes ? task.breakRefAndCopy(getGameLevelObj.lockBoxes) : [];

    gameBoard = task.breakRefAndCopy(ui.gameBoardMapperObj[`level${gameLevel + 1}`]);
    gameBoardLength = ui.getGameBoardLength();

    const lockBoxesAmount = lockBoxes[gameLevel];
    for(let i = 0; i < 36; i++){
      if(!boxInfo.isBoxDisabled(`box${i}`)){
        possibleBombs.push(`box${i}`);
      }
    }

    possibleBombs.forEach((data, index) => {
      if(index < lockBoxesAmount){
        const box = task.getRandomIndexInArray(possibleBombs);
        const index = possibleBombs.indexOf(box);
        possibleBombs.splice(index, 1);
      }
    })

    ui.addInitialBombs();
    ui.fillPreFilledBoxes();
    ui.populateTheUI();
    bomb.fillPopulationData();
    ui.startLevelText();
  },
  redo: () => {
    task.clearBoard();
    track.goToPage('gameBoardPage');
  },
  gameBoardMapperObj: {
    thirtysix,
    level1,
    level2,
    level3,
    level4,
    level5
  },
  addInitialBombs: () => {
    initialBombs.forEach(data => {
      gameBoard[data.box][data.bombType] = true;
    })
  },
  getGameBoardLength: () => {
    let length = 0;
    for(let box in gameBoard){
      if(!gameBoard[box].disabled){
        length++;
      }
    }
    return length;
  },
  chooseBoard: () => {
    track.goToPage("levelsPage");
    document.querySelectorAll(".levelsHolder")[0].innerHTML = "";
    const node = document.getElementsByClassName("levelsHolder")[0];
    level_data.forEach(data => {
      (data.isLocked) ?
      node.insertAdjacentHTML('beforeend', ui.uiComponents.lockedBoardBox()) :
      node.insertAdjacentHTML('beforeend', ui.uiComponents.boardBox(data));
    })
  },
  populateBoard: () => { // populate the gameboard into the UI
    if (document.getElementsByClassName("box").length > 0) {
      const boxes = document.getElementsByClassName("box");
      ui.removeAllLockBoxes();
      for (let i = 0; i < boxes.length; i++) {
        ui.addLockBox(`box${i}`);
        const gridBox = boxes[i];
        gridBox.className = "";
        gridBox.classList.add(...boxInfo.getAllBoxClasses(`box${i}`));
      }
    } else {
      for (let box in gameBoard) {
        ui.addLockBox(box);

        const topRightDot = document.createElement("div");
        const topLeftDot = document.createElement("div");
        const bottomRightDot = document.createElement("div");
        const bottomLeftDot = document.createElement("div");
        topRightDot.classList.add("topRightDot");
        topLeftDot.classList.add("topLeftDot");
        bottomRightDot.classList.add("bottomRightDot");
        bottomLeftDot.classList.add("bottomLeftDot");

        const gridBox = document.createElement("div");

        gridBox.appendChild(topRightDot);
        gridBox.appendChild(topLeftDot);
        gridBox.appendChild(bottomRightDot);
        gridBox.appendChild(bottomLeftDot);

        gridBox.classList.add(...boxInfo.getAllBoxClasses(box));
        gridBox.insertAdjacentHTML('beforeend', ui.uiComponents.spriteSheet(box));
        gridBox.addEventListener("click", (e) => { // add a click event to the box click on borders
          if (!isFirstPlayerTurn || boxInfo.isBoxDisabled(box)) return null; // prevent out of turn clicks
          lineClickAction.highlightClickedBorder(e.offsetX, e.offsetY, box, board);
        });
        const node = document.getElementById("board");
        node.appendChild(gridBox); // add the box to the game board
      }
    }
    track.setScores();
    boxInfo.adjustBorderCountArrays(); // add boxes with one border to the oneBorderBoxes array, etc...
    ui.populateHelpers();
  },
  populateHelpers: () => {
    //set helpers
    if(!tools){
      tools = task.getTools();
    }

    //empty any helpers still on the board
    const nodes = document.getElementsByClassName("bombToolsBar");
    nodes[0].innerHTML = "";

    //populate board with helps
    tools.forEach(data => {
      const tool = document.querySelectorAll(`.tool.${data.name}`);
      const toolExists = tool.length > 0;
      if(data.count !== 0 && !toolExists){
        const tool = ui.uiComponents.helper(data);
        const node = document.getElementsByClassName("bombToolsBar")[0];
        node.insertAdjacentHTML('beforeend', tool);
      } else if (data.count !== 0) {
        task.addTextByQuerySelector(`.${data.name}p`, data.count);
      } else if (data.count === 0 && toolExists) {
        tool[0].remove();
      }
    })
  },
  removeAllLockBoxes: () => {
    task.removeClassByClassName("box", "locked");
    for(let data in gameBoard){
      gameBoard[data].isLocked = false;
    }
  },
  addLockBox: (box) => {
    if(boxInfo.isALockBox(box) && !boxInfo.isBoxDisabled(box)){
      gameBoard[box].isLocked = true;
    }
  },
  removeScoreColorIfRemovingBorder: (box) => {
    gameBoard[box].whoScored = null;
    task.removeClassByClassName(`.${box}`, "firstPlayerScored");
    task.removeClassByClassName(`.${box}`, "secondPlayerScored");
  },
  closeTheBoxConnection: (closeTheBoxConnectionParams) => {
    const {
      boxNumber,
      adjacentBox,
      boxNumberClosedBorder,
      adjacentBoxClosedBorder
    } = closeTheBoxConnectionParams;
    if (gameBoard[boxNumber].surroundingBoxes[`${boxNumberClosedBorder}Box`]) gameBoard[boxNumber].surroundingBoxes[`${boxNumberClosedBorder}Box`].isConnected = false;
    if (adjacentBox && gameBoard[adjacentBox].surroundingBoxes[`${adjacentBoxClosedBorder}Box`]) gameBoard[adjacentBox].surroundingBoxes[`${adjacentBoxClosedBorder}Box`].isConnected = false;
  },
  selectHelper: (bombFunction) => {
    const hasSelected = document.querySelector(`.tool[class*=${bombFunction}]`).classList.contains("selected");
    if(hasSelected){
      task.removeClassByClassName("tool", "selected");
    } else {
      task.removeClassByClassName("tool", "selected");
      task.addClassByQuerySelector(`.tool[class*=${bombFunction}]`, "selected");
      selectedBombFunction = bombFunction;
    }
  },
  uiComponents: {
    boardBox: (data) => {
      let stars = "";
      for(let i = 0; i < data.stars; i++){
        stars += `<img class="star${i}" src="./img/star.png" alt="">`;
      }
      return (`
        <div class="level flexCol playBoardButton" onclick="task.setGameLevelAndTips(${data.levelNumber})">
          <p>${data.levelNumber}</p>
          <div class="stars flexRow">
            ${stars}
          </div>
        </div>
      `)
    },
    spriteSheet: (box) => {
      return ("<div class='spriteSheet'></div>");
    },
    lockedBoardBox: () => {
      return (`
        <div class="level flexCol">
          <div class="boardLock">
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>
          </div>
        </div>
      `);
    },
    helper: (data) => {
      // <p class="${data.name}p">${data.count}</p>
      return (`<div class="tool flexRow ${data.name}" onclick="ui.selectHelper('${data.name}')">
        <img src=${data.src} alt="">
      </div>`)
    }
  },
  tools: [
    {
      name: "lion",
      src: "./img/color_animals/asset_lion.png",
      count: 1
    },
    {
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    },
    {
      name: "panther",
      src: "./img/color_animals/asset_panther.png",
      count: 1
    }
  ],
  changeDifficulty: (diff) => {
    settings.difficulty = diff;
    task.saveToLocalStorage("settings", settings);
    ui.setDifficulty();
  },
  setDifficulty: () => {
    task.removeClassByClassName("diff", "selectedSetting");
    task.addClassByClassName(settings.difficulty, "selectedSetting");
  },
  toggleSound: () => {
    settings.hasMutedSound = !settings.hasMutedSound;
    task.saveToLocalStorage("settings", settings);
    ui.setSound();
  },
  setSound: () => {
    task.removeClassByClassName("sound", "selectedSetting");
    if(settings.hasMutedSound){
      task.addClassByQuerySelector(".sound.sOptions.off", "selectedSetting");
    } else {
      task.addClassByQuerySelector(".sound.sOptions.on", "selectedSetting");
    }
  },
  toggleMusic: () => {
    settings.hasMutedMusic = !settings.hasMutedMusic;
    task.saveToLocalStorage("settings", settings);
    ui.setMusic();
  },
  setMusic: () => {
    task.removeClassByClassName("music", "selectedSetting");
    if(settings.hasMutedMusic){
      task.addClassByQuerySelector(".music.mOptions.off", "selectedSetting");
    } else {
      task.addClassByQuerySelector(".music.mOptions.on", "selectedSetting");
    }
  },
  showHint: () => {
    const index = task.getRandomIndexInArray(noBorders);
    const box = noBorders[index];
    task.addClassByClassName(box, "hint");
    setTimeout(() => {
      task.removeClassByClassName(box, "hint");
    }, 600);
  },
  setSettingsIfOnSettingsPage: (page) => {
    if(page === "settingsPage"){
      ui.setDifficulty();
      ui.setSound();
      ui.setMusic();
    }
  },
  animateScore: (prize, starTimeout) => {
    let remainingGold = parseInt(task.getTextByQuerySelector(".remainingGold"));
    const hasScore = remainingGold !== 0;
    if(hasScore){
      const changeNumber = () => {
        const gold = remainingGold;
        starTimeout += 100;
        setTimeout(() => {
          // task.addTextByQuerySelector(".remainingGold", gold);
          const currectGold = parseInt(task.getTextByQuerySelector(".currentGoldCount")) + 1;
          task.addTextByQuerySelector(".currentGoldCount", currectGold)
        }, starTimeout)
        remainingGold--;
        if(remainingGold > 0){
          changeNumber();
        }
      }
      changeNumber();
    }
    setTimeout(() => {
      // task.addTextByQuerySelector(".remainingGold", 0);
      ui.showGift(prize, starTimeout);
    }, starTimeout);
  },
  showGift: (prize, starTimeout) => {
    if(prize){
      setTimeout(() => {
        if(!getGameLevelObj.hasLargePrize){
          task.addClassByClassName("goldScreen", "smallPrize");
        } else {
          task.removeClassByClassName("goldScreen", "smallPrize");
          const prize = getGameLevelObj.hasLargePrize.prize;
          const img = document.querySelector(".goldScreen img")
          img.src = `./img/rewards/${prize}_reward.png`;
          const currentClass = img.classList[0];
          img.classList.remove(currentClass);
          img.classList.add(`${prize}_reward`);
        }
        task.addClassByClassName("rewardScreen", "showPrice");
        setTimeout(() => {
          task.addClassByQuerySelector("svg.redoBtn", "showBtn");
          task.addClassByQuerySelector("svg.nextBtn", "showBtn");
        }, 1000)
      }, 200);
    }
  },
  showEndGameScreen: (stars, yourScore, computerScore, currentGoldCount, prize) => {
    isFirstPlayerTurn = true;
    task.removeClassByClassName("gameCompleteBox", "hideGameComplete");
    task.addTextByQuerySelector(".yourScore", yourScore);
    task.addTextByQuerySelector(".computerScore", computerScore);
    const remainingGold = parseInt(yourScore) - parseInt(computerScore);
    task.addTextByQuerySelector(".remainingGold", remainingGold);
    task.addTextByQuerySelector(".currentGoldCount", currentGoldCount);
    setTimeout(() => {
      document.getElementsByClassName("rewardScreen")[0].style.opacity = 1;
    }, 1000);
    let starTimeout = 200;
    const showStars = (count) => {
      let starCount = count + 1;
      setTimeout(() => {
        document.getElementsByClassName(`completeStar${starCount}`)[0].style.opacity = 1;
      }, starTimeout);
      starTimeout += 200;
    }
    setTimeout(() => {
      for(let i = 0; i < stars; i++){
        showStars(i);
      }
      ui.animateScore(prize, starTimeout);
    }, starTimeout)
  },
  showCompleteScreen: () => {
    setTimeout(() => {
      const stars = task.setStarsForWinner(playerOneScore);
      const yourScore = playerOneScore;
      const computerScore = playerTwoScore;
      const currentGoldCount = 50;
      const prize = "cheetah";
      ui.showEndGameScreen(stars, yourScore, computerScore, currentGoldCount, prize);
    }, 500)
  },
  showText: (text) => {
    task.removeClassByClassName("helpTextP", "showHelpText");
    setTimeout(() => {
      task.addTextByQuerySelector(".helpTextP", text);
      task.addClassByClassName("helpTextP", "showHelpText");
    }, 500)
  },
  startLevelText: () => {
    if(!getGameLevelObj["help"]) {
      task.removeClassByQuerySelector(".helpTextP", "showHelpText");
      return null
    };

    const levelText = getGameLevelObj["help"]["boardHelpText"]();
    const turnsToShowText = levelText ? getGameLevelObj["help"]["helpTurns"] : [];

    if(track.turn === 0){
      helpText = levelText;
    }

    if(!helpText && levelText && turnsToShowText.includes(track.turn)){
      const text = helpText.next().value;
      ui.showText(text);
    } else if(helpText && turnsToShowText.includes(track.turn)) {
      const text = helpText.next().value;
      ui.showText(text);
    }
    if(turnsToShowText.indexOf(track.turn) === turnsToShowText.length - 1){
      setTimeout(() => {
        ui.showText("");
      }, 8000)
    }
  },
  fillPreFilledBoxes: () => {
    const {prefilledBoxes} = getGameLevelObj;
    if(prefilledBoxes){
      for(let box in gameBoard){
        if(prefilledBoxes.includes(box)){
          // fill box
          gameBoard[box].borders.top = true;
          gameBoard[box].borders.right = true;
          gameBoard[box].borders.bottom = true;
          gameBoard[box].borders.left = true;
          gameBoard[box].whoScored = "secondPlayerScored";
          // fill adj box
          const topAdj = boxInfo.getAdjBoxBySide(box, "top");
          const rightAdj = boxInfo.getAdjBoxBySide(box, "right");
          const leftAdj = boxInfo.getAdjBoxBySide(box, "left");
          const bottomAdj = boxInfo.getAdjBoxBySide(box, "bottom");
          if(topAdj){ gameBoard[topAdj].borders.bottom = true }
          if(rightAdj){ gameBoard[rightAdj].borders.left = true }
          if(bottomAdj){ gameBoard[bottomAdj].borders.top = true }
          if(leftAdj){ gameBoard[leftAdj].borders.right = true }
        }
      }
    }
  },
  undoFinishScreen: () => {
    task.addClassByClassName("gameCompleteBox", "hideGameComplete");
    task.addTextByQuerySelector(".yourScore", 0);
    task.addTextByQuerySelector(".computerScore", 0);
    task.addTextByQuerySelector(".remainingGold", 0);
    task.addTextByQuerySelector(".currentGoldCount", 0);
    document.getElementsByClassName("rewardScreen")[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar1`)[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar2`)[0].style.opacity = 0;
    document.getElementsByClassName(`completeStar3`)[0].style.opacity = 0;
    task.removeClassByClassName("rewardScreen", "showPrice");
    task.removeClassByQuerySelector("svg.redoBtn", "showBtn");
    task.removeClassByQuerySelector("svg.nextBtn", "showBtn");
  },
  redoBorder: () => {
    ui.undoFinishScreen();
    const click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel++;
    task.setGameLevelAndTips(gameLevel);
  },
  nextBorder: () => {
    ui.undoFinishScreen();
    const click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel+=2;
    task.setGameLevelAndTips(gameLevel);
  },
  click: () => {
    return clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
  },
  checkForGameBoardTextConditions: () => {
    if(pointsInArow > 10){
      boardText.showText("excellent");
    } else if (pointsInArow > 5) {
      boardText.showText("good");
    }
  },
  animateBombMovement: (boxNumber) => {
    const helper = document.querySelectorAll(".tool.selected > img")[0];
    const box = document.querySelectorAll(`.${boxNumber}`)[0];
    const boardHolder = document.getElementById("boardHolder");
    const {
      src, offsetHeight, offsetWidth, x, y
    } = helper;

    // position the image
    const node = document.createElement("img");
    document.getElementById("gameScreen").appendChild(node);
    node.id = "helperMovingImage"
    node.src = src;
    node.style.position = "absolute";
    node.style.left = `${x}px`;
    node.style.top = `${y}px`;
    node.style.height = `${offsetHeight}px`;
    node.style.width = `${offsetWidth}px`;
    node.style.transform = "scale(2)";
    node.style.transition = "all 0.15s";

    // get position of box
    var rect = box.getBoundingClientRect();
    var position = {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };

    // move the image to the box
    const helperMovingImage = document.getElementById("helperMovingImage");
    helperMovingImage.style.transform = "scale(1.1)";
    helperMovingImage.style.left = `${position.left}px`;
    helperMovingImage.style.top = `${position.top}px`;

    setTimeout(() => {
      helperMovingImage.remove();
    }, 250)
  },
  animateStars: () => {
    setInterval(() => {
      let timeoutToNext = 0;
      const nums = [0, 1, 2];
      nums.forEach(num => {
        timeoutToNext += 100;
        setTimeout(() => {
          task.addClassByClassName(`star${num}`, `up`);
          setTimeout(() => {
            task.removeClassByClassName(`star${num}`, `up`);
          }, 400)
        }, timeoutToNext)
      })
    }, 4000)
  },
  displayNoClickIndicator: (boxNumber, lineClicked) => {
    const incorrectLineClick = (box, classToAdd) => {
      task.addClassByClassName(box, classToAdd);
      setTimeout(() => {
        task.removeClassByClassName(box, classToAdd);
      }, 1000);
    }

    const lineClickClass = {
      top: {
        thisBox: "cantClickTop",
        adjBox: "cantClickBottom"
      },
      right: {
        thisBox: "cantClickRight",
        adjBox: "cantClickLeft"
      },
      bottom: {
        thisBox: "cantClickBottom",
        adjBox: "cantClickTop"
      },
      left: {
        thisBox: "cantClickLeft",
        adjBox: "cantClickRight"
      }
    }

    incorrectLineClick(boxNumber, lineClickClass[lineClicked].thisBox);

    let adjacentBox = null;
    let adjBoxNumber = null;
    const hasAdjacentBox = ((gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== null) && (gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`] !== undefined));
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[`${lineClicked}Box`].boxNumber;
      adjBoxNumber = `box${adjacentBox}`;
      incorrectLineClick(adjBoxNumber, lineClickClass[lineClicked].adjBox);
    }
  },
  togglePregameScreen: () => {
    if(task.hasClassByQuerySelector(".silverScreen", "hidePregameScreen")){
      task.removeClassByClassName("silverScreen", "hidePregameScreen")
    } else {
      task.addClassByClassName("silverScreen", "hidePregameScreen")
    }
  },
  uiPopulater: null,
  populateTheUI: () => {
    if(ui.uiPopulater === null){
      ui.populateBoard();
      ui.uiPopulater = 1;
    } else {
      clearTimeout(ui.uiPopulater);
      ui.uiPopulater = setTimeout(() => {
        ui.populateBoard();
      });
    }
  }
}
