const task = {
  setTurnPlayer: () => {
    isFirstPlayerTurn = (hasScored || disableComputer) ? isFirstPlayerTurn : !isFirstPlayerTurn;
    hasScored = false;
    if (isPlayingComputer && !isFirstPlayerTurn) { // make the computer move
      computerMove.makeComputerMove();
    } else {
      gameTimer.startTimer();
    }
  },
  isGameOver: () => {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(box => {
      const firstPlayerScored = $(`.${box}`).attr("class").includes("firstPlayerScored");
      const secondPlayerScored = $(`.${box}`).attr("class").includes("secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    })
    if (totalPointsScored === (totalPointsToScore[gameBoardSize] - 1)) {
      console.log("game complete");
      gameTimer.stopTimer();
    }
  },
  getRandomIndexInArray: (boxArray) => {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
}