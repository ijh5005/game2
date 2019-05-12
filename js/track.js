const track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
  },
  goToPage: (page) => {
    app.tools = null;
    app.currentPage = page;
    const allPages = document.getElementsByClassName("page");
    for(let i = 0; i < allPages.length; i++){
      allPages[i].classList.add("removePage");
    }
    const pageToShow = document.getElementsByClassName(page)[0];
    pageToShow.classList.remove("removePage");
    ui.setSettingsIfOnSettingsPage(page);
    if(page === "gameBoardPage"){
      gametask.resizeBoard();
      ui.populateBombSelectionScreen();
    } else {
      app.on_game_board = false;
    }

    if(page === "storePage"){
      ui.populateStore();
    }
  },
  youLose: () => {
    console.log("you lose")
  },
  setScores: () => {
    playerOneScore = 0;
    playerTwoScore = 0;
    for(let box in gameBoard){
      const personToScore = gameBoard[box].whoScored;
      if( personToScore === "firstPlayerScored"){
        playerOneScore++;
      } else if(personToScore === "secondPlayerScored"){
        playerTwoScore++;
      }
    }
  },
  adjustScore: (boxNumber, adjacentBoxNumber) => {
    track.setScores();

    document.getElementsByClassName("playerOneScore")[0].innerText = playerOneScore;
    document.getElementsByClassName("playerTwoScore")[0].innerText = playerTwoScore;

    const score = (box) => {
      if (!track.hasScored(box)) return null; // check to see if player scored a point
      bomb.explodeBoxes(box);
    }

    if (boxNumber) score(boxNumber);
    if (adjacentBoxNumber) score(adjacentBoxNumber);
  },
  hasScored: (boxNumber) => {
    const isTopClicked = gameBoard[boxNumber].borders.top;
    const isRightClicked = gameBoard[boxNumber].borders.right;
    const isBottomClicked = gameBoard[boxNumber].borders.bottom;
    const isLeftClicked = gameBoard[boxNumber].borders.left;
    return (isTopClicked && isRightClicked && isBottomClicked && isLeftClicked);
  },
  decrementBombCount: () => {
    bombsToLay--;
    // track.setRemainingBombs();
  },
  setRemainingBombs: () => {
    gametask.addTextByQuerySelector(".remainingBombs", bombsToLay);
  },
  incrementMissedBombCount: () => {
    const text = gametask.getTextByQuerySelector(".missedBombs");
    let missedBombs = parseInt(text);
    missedBombs++;
    gametask.addTextByQuerySelector(".missedBombs", missedBombs);
    track.decrementBombCount();
  },
  screenText: () => {
    app.showTextUsed = true;
    setTimeout(() => {
      app.showTextUsed = false; // prevents multiple calls for screen text
    }, app.timeToWaitBetweenText)
  }
}

module.exports = track;
