const ui = {
  startGame: () => {
    on_game_board = true;
    task.resetPlayerTurn();
    task.resetScore();
    track.goToPage(settings.startUpPage);
    task.setDifficulty(settings.difficulty);
    initialBombs = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].initialBombs);
    waterRemovalIndex = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].waterRemovalIndex);
    bombsToLay = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].bombsToLay);
    // track.setRemainingBombs();
    lockBombLocations = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].lockBoxes);

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
    track.goToPage("levelsPage");
    $(".levelsHolder").html("");
    settings.levels.levelInformation.forEach(data => {
      (data.isLocked) ?
      $(".levelsHolder").append(ui.uiComponents.lockedBoardBox()) :
      $(".levelsHolder").append(ui.uiComponents.boardBox(data));
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
        // boxInfo.getNumberText(box, gridBox);
        // $(gridBox).html(`<img class="explosionBox ${box}Explosion hideExplosion">`)
        $(gridBox).html(ui.uiComponents.spriteSheet(box));
        gridBox.addEventListener("click", (e) => { // add a click event to the box click on borders
          if (!isFirstPlayerTurn || boxInfo.isBoxDisabled(box)) return null; // prevent out of turn clicks
          lineClickAction.highlightClickedBorder(e.offsetX, e.offsetY, box, board);
        });
        $("#board").append(gridBox); // add the box to the game board
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
      const tool = $(`.tool.${data.name}`);
      const toolExists = tool.length > 0;
      if(data.count !== 0 && !toolExists){
        const tool = $(ui.uiComponents.helper(data));
        $(".bombToolsBar").append(tool);
      } else if (data.count !== 0) {
        $(`.${data.name}p`).text(data.count);
      } else if (data.count === 0 && toolExists) {
        $(tool).remove();
      }
    })
  },
  removeAllLockBoxes: () => {
    $(".box").removeClass("locked");
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
    $(`.${box}`).removeClass("firstPlayerScored").removeClass("secondPlayerScored");
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
      task.removeClassWithClassName("completionScreen", "removePage");
      task.removeClassWithClassName("ribbonHolder", "down");
    }, 1000)
  },
  selectHelper: (bombFunction) => {
    if($(`.tool[class*=${bombFunction}]`).hasClass("selected")){
      $(".tool").removeClass("selected");
    } else {
      $(".tool").removeClass("selected");
      $(`.tool[class*=${bombFunction}]`).addClass("selected");
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
    $(".diff").removeClass("selectedSetting");
    $(`.${settings.difficulty}`).addClass("selectedSetting");
  },
  toggleSound: () => {
    settings.hasMutedSound = !settings.hasMutedSound;
    task.saveToLocalStorage("settings", settings);
    ui.setSound();
  },
  setSound: () => {
    $(".sound").removeClass("selectedSetting");
    if(settings.hasMutedSound){
      $(".sound.sOptions.off").addClass("selectedSetting");
    } else {
      $(".sound.sOptions.on").addClass("selectedSetting");
    }
  },
  toggleMusic: () => {
    settings.hasMutedMusic = !settings.hasMutedMusic;
    task.saveToLocalStorage("settings", settings);
    ui.setMusic();
  },
  setMusic: () => {
    $(".music").removeClass("selectedSetting");
    if(settings.hasMutedMusic){
      $(".music.mOptions.off").addClass("selectedSetting");
    } else {
      $(".music.mOptions.on").addClass("selectedSetting");
    }
  },
  showHint: () => {
    const index = task.getRandomIndexInArray(noBorders);
    const box = noBorders[index];
    $(`.${box}`).addClass("hint");
    setTimeout(() => {
      $(`.${box}`).removeClass("hint");
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
