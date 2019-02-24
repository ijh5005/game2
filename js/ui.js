const ui = {
  startGame: (level) => {
    track.goToPage(settings.startUpPage);
    task.setDifficulty(settings.difficulty);

    task.setGameLevel(level)
    initialBombs = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].initialBombs);
    waterRemovalIndex = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].waterRemovalIndex);
    bombsToLay = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].bombsToLay);
    lockBombLocations = task.breakRefAndCopy(settings.levels.levelInformation[gameLevel].lockBoxes);

    gameBoard = task.breakRefAndCopy(ui.gameBoardMapperObj[`level${level}`]);
    gameBoardLength = ui.getGameBoardLength();

    const lockBoxesAmount = lockBoxes[level];
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
    level4
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
        $(gridBox).html(`<img class="explosionBox ${box}Explosion hideExplosion">`)
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
    ui.tools.forEach(data => {
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
        <div class="level flexCol" onclick="ui.startGame(${data.levelNumber})">
          <p>${data.levelNumber}</p>
          <div class="stars flexRow">
            ${stars}
          </div>
        </div>
      `)
    },
    lockedBoardBox: () => {
      return (`
        <div class="level flexCol">
          <i class="fas fa-lock boardLock"></i>
        </div>
      `);
    },
    helper: (data) => {
      return (`<div class="tool flexCol ${data.name}" onclick="selectHelper('${data.name}')">
        <img src=${data.src} alt="">
        <p class="${data.name}p">${data.count}</p>
      </div>`)
    }
  },
  tools: [
    {
      name: "bombEraser",
      src: "./img/bombEraser.png",
      count: 0
    },
    {
      name: "mediumBomb",
      src: "./img/mediumBomb.png",
      count: 0
    },
    {
      name: "largeBomb",
      src: "./img/largeBomb.png",
      count: 0
    },
    {
      name: "verticalBomb",
      src: "./img/verticalBomb.png",
      count: 0
    },
    {
      name: "horizontalBomb",
      src: "./img/horizontalBomb.png",
      count: 0
    },
    {
      name: "veryLarge",
      src: "./img/veryLarge.png",
      count: 0
    },
  ]
}
