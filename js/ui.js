const ui = {
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
    $(".homePage").addClass("hide");
    $(".levelsPage").removeClass("hide");
    levels.levelInformation.forEach(data => {
      if(data.isLocked) {
        $(".levelsHolder").append(`
          <div class="level flexCol">
            <i class="fas fa-lock boardLock"></i>
          </div>
        `);
      } else {
        let stars = "";
        for(let i = 0; i < data.stars; i++){
          stars += `<img src="./img/star.png" alt="">`;
        }
        $(".levelsHolder").append(`
          <div class="level flexCol" onclick="startGame(${data.levelNumber})">
            <p>${data.levelNumber}</p>
            <div class="stars flexRow">
              ${stars}
            </div>
          </div>
        `);
      }
    })
  },
  populateBoard: () => { // populate the gameboard into the UI
    // document.getElementById("board").innerHTML = ""; // clear the board before rendering it
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
    gameScore.setScores();
    boxInfo.adjustBorderCountArrays(); // add boxes with one border to the oneBorderBoxes array, etc...
    ui.populateHelpers();
  },
  populateHelpers: () => {
    tools.forEach(data => {
      const tool = $(`.tool.${data.name}`);
      const toolExists = tool.length > 0;
      if(data.count !== 0 && !toolExists){
        const tool = $(`<div class="tool flexCol ${data.name}" onclick="selectHelper('${data.name}')">
          <img src=${data.src} alt="">
          <p class="${data.name}p">${data.count}</p>
        </div>`);
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
  removeScoreColorIfRemovingBorder: (box, subtractBorder) => {
    if (subtractBorder) {
      gameBoard[box].whoScored = null;
      $(`.${box}`).removeClass("firstPlayerScored").removeClass("secondPlayerScored");
    }
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
    task.removeClassWithClassName("completionScreen", "hide");
    task.removeClassWithClassName("ribbonHolder", "down");
  }
}
