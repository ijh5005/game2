const task = {
  setTurnPlayer: () => {
    setTimeout(() => {
      const lockBoxesWasNotCleared = (twoBorderBoxes.length === 0)
                                  && (noBorders.length === 0)
                                  && (oneBorderBoxes.length === 0)
                                  && (threeBorderBoxes.length !== 0);
      if(lockBoxesWasNotCleared){
        console.log("game over");
      }
    })
    isFirstPlayerTurn = (hasScored || disableComputer) ? isFirstPlayerTurn : !isFirstPlayerTurn;
    hasScored = false;
    if (isPlayingComputer && !isFirstPlayerTurn) { // make the computer move
      computerMove.makeComputerMove();
    } else {
      // gameTimer.startTimer();
    }
  },
  isGameOver: () => {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(box => {
      const firstPlayerScored = $(`.${box}`).attr("class").includes("firstPlayerScored");
      const secondPlayerScored = $(`.${box}`).attr("class").includes("secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    })
  },
  getRandomIndexInArray: (boxArray) => {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
}
