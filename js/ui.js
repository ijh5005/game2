const ui = {
  startGame: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("playGame")

    task.removeClassByClassName("helpTextP", "showHelpText");

    restrictionLineClicks = null;
    restrictionClickBox = null;
    restrictionLayBomb = null;
    nextRestriction =  null;

    settings.itemsSelected = [];

    task.startEndGameInterval();
    track.turn = 0;
    pointsInArow = 0;
    whoClickedLine = task.breakRefAndCopy(whoClickTheLine);
    textType = null;
    app.on_game_board = true;
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
    level1,
    level2,
    level3,
    level4,
    level5,
    level6,
    level7,
    level8,
    level9,
    level10
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
    if(settings.endGame) return null;
    track.goToPage("levelsPage");
    document.querySelectorAll(".levelsHolder")[0].innerHTML = "";
    const node = document.getElementsByClassName("levelsHolder")[0];
    settings.level_data.forEach(data => {
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

        const pointer = document.getElementsByClassName("helpPointer")[0];
        const clone = pointer.cloneNode(true);

        const gridBox = document.createElement("div");

        gridBox.appendChild(topRightDot);
        gridBox.appendChild(topLeftDot);
        gridBox.appendChild(bottomRightDot);
        gridBox.appendChild(bottomLeftDot);

        gridBox.appendChild(clone);

        gridBox.classList.add(...boxInfo.getAllBoxClasses(box));
        gridBox.insertAdjacentHTML('beforeend', ui.uiComponents.spriteSheet(box));
        gridBox.addEventListener("mousedown", (e) => { // add a click event to the box click on borders
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
    const keepSelected = document.querySelector("keepSelected");
    if(hasSelected && keepSelected){
      const helperDisabled = keepSelected.length > 0;
      if(helperDisabled) return null;
      task.removeClassByClassName("tool", "selected");
    } else {
      task.removeClassByClassName("tool", "selected");
      task.addClassByQuerySelector(`.tool[class*=${bombFunction}]`, "selected");
      selectedBombFunction = bombFunction;
    }
  },
  populateStore: () => {
    task.addTextByQuerySelector("#goldAmount", settings.gold);
    const merchHolder = document.getElementsByClassName("merchHolder")[0];
    merchHolder.innerHTML = "";
    const { store } = settings;
    for(let item in store) {
      const animalBox = ui.uiComponents.getStoreItem(store[item]);
      merchHolder.append(animalBox);
    }
  },
  populateBombSelectionScreen: () => {
    const selectBomb = document.getElementsByClassName("selectBomb")[0];
    selectBomb.innerHTML = "";
    const populated = [];
    settings.itemsPurchased.forEach(data => {
      if(!populated.includes(data)){
        const animalSelectBox = ui.uiComponents.getAnimalSelectBox(data);
        selectBomb.append(animalSelectBox);
        populated.push(data)
      }
    })
    const hasTakenLayTutorial = gameLevel > 4;
    if(populated.length === 0 || !hasTakenLayTutorial){
      ui.doneBombSelected();
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
      return (`<div class="tool flexRow ${data.name}" onclick="ui.selectHelper('${data.name}')">
        <img src=${data.src} alt="">
        <svg class="helpPointer" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hand-point-down" class="svg-inline--fa fa-hand-point-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M91.826 467.2V317.966c-8.248 5.841-16.558 10.57-24.918 14.153C35.098 345.752-.014 322.222 0 288c.008-18.616 10.897-32.203 29.092-40 28.286-12.122 64.329-78.648 77.323-107.534 7.956-17.857 25.479-28.453 43.845-28.464l.001-.002h171.526c11.812 0 21.897 8.596 23.703 20.269 7.25 46.837 38.483 61.76 38.315 123.731-.007 2.724.195 13.254.195 16 0 50.654-22.122 81.574-71.263 72.6-9.297 18.597-39.486 30.738-62.315 16.45-21.177 24.645-53.896 22.639-70.944 6.299V467.2c0 24.15-20.201 44.8-43.826 44.8-23.283 0-43.826-21.35-43.826-44.8zM112 72V24c0-13.255 10.745-24 24-24h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24zm212-24c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg>
      </div>`)
    },
    getStoreItem: (item) => {
      const { hasUnlocked, unlockedImgClass, lockedImgClass } = item;
      const animalBoxClasses = ["animalBox", "flexCol"];
      const animalClasses = ["animal", hasUnlocked ? unlockedImgClass : lockedImgClass];
      const priceClasses = ["price", "flexRow"];
      const goldMoneyClasses = ["goldMoney"];
      const totalForItemClasses = ["totalForItem"];
      const totalForItemPClasses = ["totalForItemP"];
      const costLabel = item.hasUnlocked ? item.cost : "?";

      const animalBox = document.createElement("div");
      let animal = document.createElement("div");
      let price = document.createElement("div");
      const goldMoney = document.createElement("div");
      const cost = document.createElement("span");
      const totalForItem = document.createElement("div");
      const totalForItemP = document.createElement("p");

      cost.innerText = costLabel;
      totalForItemP.innerText = item.hasUnlocked ? item.quantity : "";
      animalBox.classList.add(...animalBoxClasses);
      animal.classList.add(...animalClasses);
      price.classList.add(...priceClasses);
      goldMoney.classList.add(...goldMoneyClasses);
      totalForItem.classList.add(...totalForItemClasses);
      totalForItemP.classList.add(...totalForItemPClasses);

      price.append(cost);
      price.append(goldMoney);
      animalBox.append(animal);
      animalBox.append(price);
      totalForItem.append(totalForItemP);
      animalBox.append(totalForItem);

      animalBox.addEventListener("click", () => {
        const animal = item.unlockedImgClass.replace("buy_", "");
        const cost = (price.innerText === "?") ? 10000000 : parseInt(item.cost);
        task.selectStoreItem(animal, cost);
      });

      return animalBox;
    },
    getAnimalSelectBox: (animal) => {
      const animalBoxClasses = ["animalBombSelectBox", `buy_${animal}`];
      const animalBox = document.createElement("div");
      animalBox.classList.add(...animalBoxClasses);
      animalBox.addEventListener("click", () => {
        ui.selectPregameBomb(`buy_${animal}`);
      });
      return animalBox;
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
          settings.gold = currectGold;
        }, starTimeout)
        remainingGold--;
        if(remainingGold > 0){
          changeNumber();
        }
      }
      changeNumber();
    }
    setTimeout(() => {
      ui.showGift(prize, starTimeout);
    }, starTimeout);
  },
  showGift: (prize, starTimeout) => {
    if(prize){
      setTimeout(() => {
        const hasClaimed = getGameLevelObj.hasLargePrize && getGameLevelObj.hasLargePrize.hasClaimed;
        if(!getGameLevelObj.hasLargePrize || hasClaimed){
          task.addClassByClassName("goldScreen", "smallPrize");
        } else {
          settings.level_data[gameLevel].hasLargePrize.hasClaimed = true;
          task.saveToLocalStorage("settings", settings);
          task.removeClassByClassName("goldScreen", "smallPrize");
          const prize = getGameLevelObj.hasLargePrize.prize;
          const img = document.querySelector(".goldScreen img")
          img.src = `./img/rewards/${prize}_reward.png`;
          const currentClass = img.classList[0];
          img.classList.remove(currentClass);
          img.classList.add(`${prize}_reward`);
          settings.store[prize].hasUnlocked = true;
          const currentQuantity = settings.store[prize].quantity;
          settings.store[prize].quantity = currentQuantity + 1;
          settings.itemsPurchased.push(prize);
          task.saveToLocalStorage("settings", settings);
        }
        task.addClassByClassName("rewardScreen", "showPrice");
        setTimeout(() => {
          task.addClassByQuerySelector("svg.redoBtn", "showBtn");
          if(settings.level_data[gameLevel + 1]){
            task.addClassByQuerySelector("svg.nextBtn", "showBtn");
          }
        }, 1000)
      }, 200);
    }
  },
  showEndGameScreen: (stars, yourScore, computerScore, currentGoldCount, prize) => {
    task.resetPlayerTurn();
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
      const stars = task.getStarsForWinner(playerOneScore);
      task.setStarsForWinner(stars);
      task.openNextBoard(stars);
      const yourScore = playerOneScore;
      const computerScore = playerTwoScore;
      const currentGoldCount = settings.gold;
      const prize = "cheetah";
      ui.showEndGameScreen(stars, yourScore, computerScore, currentGoldCount, prize);
    }, 500)
  },
  showTextTimeout: 0,
  showText: (text) => {
    task.removeClassByClassName("helpTextP", "showHelpText");
    clearTimeout(ui.showTextTimeout);
    ui.showTextTimeout = setTimeout(() => {
      task.addHTMLByQuerySelector(".helpTextP", text);
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
      ui.showText(text || "");
    } else if(helpText && turnsToShowText.includes(track.turn)) {
      const text = helpText.next().value;
      ui.showText(text || "");
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
    if(currentPage !== "gameBoardPage") return null;
    ui.undoFinishScreen();
    const click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel++;
    task.setGameLevelAndTips(gameLevel);
  },
  nextBoard: () => {
    const notOnBoard = currentPage !== "gameBoardPage";
    const hasAnotherLevel = gameLevel && settings.level_data[gameLevel + 1];
    if(notOnBoard || (hasAnotherLevel === false)) return null;
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
      if(boxInfo.getBorderCount(boxNumber) === 4){
        bomb.explodeBoxes(boxNumber);
      }
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
  animateDots: () => {
    setInterval(() => {
      const topRightDot = document.querySelectorAll(".topRightDot");
      const topLeftDot = document.querySelectorAll(".topLeftDot");
      const bottomRightDot = document.querySelectorAll(".bottomRightDot");
      const bottomLeftDot = document.querySelectorAll(".bottomLeftDot");
      const length = 36;
      for(let i = 0; i < length; i++){
        if(Math.random() < 0.5){
          topRightDot[i].classList.add("lighterDot");
          topLeftDot[i].classList.add("lighterDot");
          bottomRightDot[i].classList.add("lighterDot");
          bottomLeftDot[i].classList.add("lighterDot");
        } else {
          topRightDot[i].classList.remove("lighterDot");
          topLeftDot[i].classList.remove("lighterDot");
          bottomRightDot[i].classList.remove("lighterDot");
          bottomLeftDot[i].classList.remove("lighterDot");
        }
      }
    }, 2000);
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
    task.setTurnRestrictions();
    track.adjustScore();
  },
  showHelper: (boxNumber) => {
    tools.forEach(data => {
      if(data.name === selectedBombFunction) data.count--;
    });
    let explosionType;
    if(selectedBombFunction === "lion") explosionType = "isLionExplosion";
    if (selectedBombFunction === "cheetah") explosionType = "isCheetahExplosion";
    if (selectedBombFunction === "panther") explosionType = "isPantherExplosion";
    if (selectedBombFunction === "queen_makeda") explosionType = "isQueenMakedaExplosion";
    if(explosionType) gameBoard[boxNumber][explosionType] = true;
  },
  addHighlightToClickBox: (clickBox) => {
    setTimeout(() => {
      task.addClassByClassName(clickBox, "clickBox");
    }, 500)
  },
  toggleBombSelected: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    const classList = selectBombScreen.classList;
    if(classList.contains("showBoard")){
      selectBombScreen.classList.remove("showBoard")
    } else {
      selectBombScreen.classList.add("showBoard")
    }
  },
  doneBombSelected: () => {
    const selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("showBoard");
    selectBombScreen.classList.add("playGame");
    if(!tools){
      tools = task.getTools();
    }
    const used = [];
    settings.itemsSelected.forEach(item => {
      const animalName = item.replace("buy_", "")
      let animal;
      if(animalName.includes("queen")){
        animal = {
          name: animalName,
          src: `./img/queens/asset_${animalName}.png`,
          count: 1
        }
      } else {
        animal = {
          name: animalName,
          src: `./img/color_animals/asset_${animalName}.png`,
          count: 1
        }
      }
      let isInTools = false;
      tools.forEach(data => {
        if(data.name === animalName){
          isInTools = true;
        }
      })
      if(!isInTools){
        tools = [
          ...tools,
          animal
        ]
        used.push(item);
      }
    })
    used.forEach(data => {
      const animalName = data.replace("buy_", "");
      const index = settings.itemsPurchased.indexOf(animalName);
      settings.itemsPurchased.splice(index, 1);
      const currentQuantity = settings.store[animalName].quantity;
      settings.store[animalName].quantity = currentQuantity - 1;
    })
    task.saveToLocalStorage("settings", settings);
    settings.itemsSelected = [];
    ui.populateHelpers();
  },
  selectPregameBomb: (selected) => {
    const animal = document.querySelector(`.${selected}.selectedBombForBoard`);
    if(animal){
      task.removeClassByQuerySelector(`.animalBombSelectBox.${selected}`, "selectedBombForBoard");
      const index = settings.itemsSelected.indexOf(selected);
      settings.itemsSelected.splice(index, 1)
    } else {
      task.addClassByQuerySelector(`.animalBombSelectBox.${selected}`, "selectedBombForBoard");
      settings.itemsSelected.push(selected);
    }
  },
  toggleConfirmScreen: () => {
    if(task.hasClassByClassName("buyItemContainer", "hidePurchaseScreen")){
      task.removeClassByClassName("buyItemContainer", "hidePurchaseScreen")
    } else {
      task.addClassByClassName("buyItemContainer", "hidePurchaseScreen")
    }
  }
}

module.exports = ui;
