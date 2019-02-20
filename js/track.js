const track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
    if(waterRemovalIndex.includes(track.turn)){
      tools.forEach(data => {
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
      ui.showFinishScreen();
    }
  },
  goToPage: (page) => {
    const allPages = document.getElementsByClassName("page");
    for(let i = 0; i < allPages.length; i++){
      allPages[i].classList.add("removePage");
    }
    const currentPage = document.getElementsByClassName(page)[0];
    currentPage.classList.remove("removePage");
  }
}
