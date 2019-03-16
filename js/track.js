const track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
    if(waterRemovalIndex.includes(track.turn)){
      tools.forEach(data => {
        if(data.name === "bombEraser"){
          data.count++;
          setTimeout(() => {
            task.addClassByQuerySelector(".tool.bombEraser > img", "animate");
            setTimeout(() => {
              task.removeClassByQuerySelector(".tool.bombEraser > img", "animate");
            }, 1200)
          })
        }
      })
    }
  },
  winner: () => {
    firstPlayerPoints = task.getLengthOfElement(".firstPlayerScored");
    secondPlayerPoints = task.getLengthOfElement(".secondPlayerScored");
    totalPoints = firstPlayerPoints + secondPlayerPoints;
    if(totalPoints === gameBoardLength){
      task.setStarsForWinner(firstPlayerPoints);
      // ui.showFinishScreen();
    }
  },
  goToPage: (page) => {
    currentPage = page;
    const allPages = document.getElementsByClassName("page");
    for(let i = 0; i < allPages.length; i++){
      allPages[i].classList.add("removePage");
    }
    const pageToShow = document.getElementsByClassName(page)[0];
    pageToShow.classList.remove("removePage");
    ui.setSettingsIfOnSettingsPage(page);
    if(page === "gameBoardPage"){
      task.resizeBoard();
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
  highlightBoxIfScored: (boxNumber) => {
    if (boxInfo.getBorderCount(boxNumber) === 4) {
      gameBoard[boxNumber].whoScored = isFirstPlayerTurn ? "firstPlayerScored" : "secondPlayerScored";
      soundEffects.playScoreSound();
    }
  },
  adjustScore: (boxNumber, adjacentBoxNumber) => {
    track.setScores();

    document.getElementsByClassName("playerOneScore")[0].innerText = playerOneScore;
    document.getElementsByClassName("playerTwoScore")[0].innerText = playerTwoScore;

    const score = (box) => {
      if (!track.hasScored(box)) return null; // check to see if player scored a point
      bomb.explodeBoxes(box);
      hasScored = true;
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
    task.addTextByQuerySelector(".remainingBombs", bombsToLay);
  },
  incrementMissedBombCount: () => {
    const text = task.getTextByQuerySelector(".missedBombs");
    let missedBombs = parseInt(text);
    missedBombs++;
    task.addTextByQuerySelector(".missedBombs", missedBombs);
    track.decrementBombCount();
  },
  screenText: () => {
    showTextUsed = true;
    setTimeout(() => {
      showTextUsed = false; // prevents multiple calls for screen text
    }, timeToWaitBetweenText)
  }
}
