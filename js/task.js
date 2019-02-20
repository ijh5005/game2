const task = {
  setTurnPlayer: () => {
    setTimeout(() => {
      const lockBoxesWasNotCleared = (twoBorderBoxes.length === 0)
                                  && (noBorders.length === 0)
                                  && (oneBorderBoxes.length === 0)
                                  && (threeBorderBoxes.length !== 0);
      const hasLockedBoxes = (lockBombLocations.length > 0);
      if(lockBoxesWasNotCleared && hasLockedBoxes){
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
  removeClassWithClassName: (className, classToRemove) => {
    const ele = document.getElementsByClassName(className)[0];
    ele.classList.remove(classToRemove);
  },
  setGameLevel: (level) => {
    gameLevel = level - 1;
  },
  setStarsForWinner: (score) => {
    const starRubric = levels.levelInformation[gameLevel].starRating;
    if(score >= starRubric[2].score){
      starsEarned = starRubric[2].stars;
      task.animateStarCount(["completeStar1", "completeStar2", "completeStar3"])
    } else if(score >= starRubric[1].score){
      starsEarned = starRubric[1].stars;
      task.animateStarCount(["completeStar1", "completeStar2", false])
    } else if(score >= starRubric[0].score){
      starsEarned = starRubric[0].stars;
      task.animateStarCount(["completeStar1", false, false])
    }
  },
  animateStarCount: (score) => {
    setTimeout(() => {
      if(score[0]){
        task.removeClassWithClassName(score[0], "hide");
        setTimeout(() => {
          if(score[1]){
            task.removeClassWithClassName(score[1], "hide");
            setTimeout(() => {
              if(score[2]){
                task.removeClassWithClassName(score[2], "hide");
              }
            }, 200)
          }
        }, 200)
      }
    }, 500)
  },
  setDifficulty: (difficulty) => {
    if (difficulty === "easy") {
      chanceToGiveAWayPoint = 0.4;
    } else if (difficulty === "medium") {
      chanceToGiveAWayPoint = 0.2;
    } else if (difficulty === "hard") {
      chanceToGiveAWayPoint = 0.01;
    }
  }
}
