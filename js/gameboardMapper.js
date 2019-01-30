const gameboardMapper = {
  getGameBoardClickBox: (clickBox) => {
    return gameBoard[clickBox];
  },
  getSurroundingBoxesInfo: (clickBox, boxSide) => {
    return gameBoard[clickBox].surroundingBoxes[boxSide]
  },
  getSurroundingBoxesKeys: (clickBox) => {
    return Object.keys(gameboardMapper.getGameBoardClickBox(clickBox).surroundingBoxes);
  }
}