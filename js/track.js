const track = {
  turn: 0,
  incrementTurn: () => {
    track.turn++;
    if(waterRemovalIndex.includes(track.turn)){
      tools.forEach(data => {
        if(data.name === "bombEraser"){
          data.count++;
        }
      })
    }
  }
}
