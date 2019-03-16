const ui = {
  startGame: () => {
    on_game_board = true;
    task.resetPlayerTurn();
    task.resetScore();
    track.goToPage(settings.startUpPage);
    task.setDifficulty(settings.difficulty);
    initialBombs = task.breakRefAndCopy(getGameLevelObj.initialBombs);
    waterRemovalIndex = task.breakRefAndCopy(getGameLevelObj.waterRemovalIndex);
    bombsToLay = task.breakRefAndCopy(getGameLevelObj.bombsToLay);
    // track.setRemainingBombs();
    lockBombLocations = task.breakRefAndCopy(getGameLevelObj.lockBoxes);

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
    ui.populateBoard();
    bomb.fillPopulationData()
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
    tools = null;
    track.goToPage("levelsPage");
    document.querySelectorAll(".levelsHolder")[0].innerHTML = "";
    const node = document.getElementsByClassName("levelsHolder")[0];
    settings.levels.levelInformation.forEach(data => {
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
        const gridBox = document.createElement("div");
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
    if(!tools){
      tools = task.getTools();
    }
    tools.forEach(data => {
      const tools = document.querySelectorAll(`.tool.${data.name}`);
      const toolExists = tools.length > 0;
      if(data.count !== 0 && !toolExists){
        const tool = ui.uiComponents.helper(data);
        const node = document.getElementsByClassName("bombToolsBar")[0];
        node.insertAdjacentHTML('beforeend', tool);
      } else if (data.count !== 0) {
        task.addTextByQuerySelector(`.${data.name}p`, data.count);
      } else if (data.count === 0 && toolExists) {
        tools[0].remove();
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
    task.removeClassByClassName("box", "firstPlayerScored");
    task.removeClassByClassName("box", "secondPlayerScored");
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
  showFinishScreen: () => {
    setTimeout(() => {
      task.removeClassByClassName("completionScreen", "removePage");
      task.removeClassByClassName("ribbonHolder", "down");
    }, 1000)
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
        stars += `<img src="./img/star.png" alt="">`;
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
          <i class="fas fa-lock boardLock"></i>
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
  }
}
