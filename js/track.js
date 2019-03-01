const track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
    if(waterRemovalIndex.includes(track.turn)){
      ui.tools.forEach(data => {
        if(data.name === "bombEraser"){
          data.count++;
          setTimeout(() => {
            $(".tool.bombEraser > img").addClass("animate");
            setTimeout(() => {
              $(".tool.bombEraser > img").removeClass("animate");
            }, 1200)
          })
        }
      })
    }
  },
  winner: () => {
    firstPlayerPoints = $(".firstPlayerScored").length;
    secondPlayerPoints = $(".secondPlayerScored").length;
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
    $(".remainingBombs").text(bombsToLay);
  },
  incrementMissedBombCount: () => {
    let missedBombs = parseInt($(".missedBombs").text());
    missedBombs++;
    $(".missedBombs").text(missedBombs);
    track.decrementBombCount();
  }
}
