const gameTimer = {
  startTimer: () => {
    const timer = () => {
      if (count <= 0) {
        gameScore.youLose();
        gameTimer.stopTimer()
        return;
      }
      count--;
      $("#time").text(count / 100);
    }
    gameTimer.stopTimer();
    counter = setInterval(timer, 10); // 10 will run it every 100th of a second
  },
  stopTimer: () => {
    clearInterval(counter);
  },
  getIncrement: (count) => {
    let increment;
    if (count < 1000) {
      increment = 300;
    } else if (count < 2000) {
      increment = 150;
    } else {
      increment = 75;
    }
    return increment;
  },
  incrementTimer: () => {
    let time;
    count += gameTimer.getIncrement(count);
    const timeInString = count.toString();
    const length = timeInString.length;
    if (length < 4) {
      time = `${timeInString.slice(0, 1)}.${timeInString.slice(1)}`
    } else {
      const beforeDecimal = timeInString.length - 2;
      time = `${timeInString.slice(0, beforeDecimal)}.${timeInString.slice(beforeDecimal)}`
    }
    $("#time").text(time);
  }
}