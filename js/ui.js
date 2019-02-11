const ui = {
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
          if (!isFirstPlayerTurn) return null; // prevent out of turn clicks
          lineClickAction.highlightClickedBorder(e.offsetX, e.offsetY, box, board);
        });
        $("#board").append(gridBox); // add the box to the game board
      }
    }
    gameScore.setScores();
    boxInfo.adjustBorderCountArrays(); // add boxes with one border to the oneBorderBoxes array, etc...
  },
  removeAllLockBoxes: () => {
    $(".box").removeClass("locked");
    for(let data in gameBoard){
      debugger
      gameBoard[data].isLocked = false;
    }
  },
  addLockBox: (box) => {
    if(boxInfo.isALockBox(box)){
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
  }
}
