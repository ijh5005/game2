'use strict';
// homepage btn functions
const chooseBoard = () => {
  ui.chooseBoard();
};
const startGame = (level) => {
  track.goToPage("gameBoardPage");
  task.setDifficulty("hard");

  task.setGameLevel(level)
  initialBombs = task.breakRefAndCopy(levels.levelInformation[gameLevel].initialBombs);
  waterRemovalIndex = task.breakRefAndCopy(levels.levelInformation[gameLevel].waterRemovalIndex);
  bombsToLay = task.breakRefAndCopy(levels.levelInformation[gameLevel].bombsToLay);
  lockBombLocations = task.breakRefAndCopy(levels.levelInformation[gameLevel].lockBoxes);

  gameBoard = task.breakRefAndCopy(gameBoardMapperObj[`level${level}`]);
  gameBoardLength = ui.getGameBoardLength();

  const lockBoxesAmount = lockBoxes[level];
  for(let i = 0; i < 36; i++){
    if(!boxInfo.isBoxDisabled(`box${i}`)){
      possibleBombs.push(`box${i}`);
    }
  }

  possibleBombs.forEach((data, index) => {
    if(index < lockBoxesAmount){
      const box = task.getRandomIndexInArray(possibleBombs);
      const index = possibleBombs.indexOf(box);
      possibleBombs.splice(index, 1);
    }
  })

  ui.addInitialBombs();
  ui.populateBoard();
  bomb.fillPopulationData()
};
const redo = () => {
  task.clearBoard();
  track.goToPage('gameBoardPage');
}

const noBorders = [];
const oneBorderBoxes = [];
const twoBorderBoxes = [];
const threeBorderBoxes = [];
const complementBorder = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}
const gameBoardMapperObj = {
  thirtysix,
  level1,
  level2,
  level3,
  level4
}
const selectHelper = (bombFunction) => {
  if($(`.tool[class*=${bombFunction}]`).hasClass("selected")){
    $(".tool").removeClass("selected");
  } else {
    $(".tool").removeClass("selected");
    $(`.tool[class*=${bombFunction}]`).addClass("selected");
    selectedBombFunction = bombFunction;
  }
}

let selectedBombFunction;
let playerOneScore = 0;
let playerTwoScore = 0;
let gameBoardLength;
let gameBoardSize = "level1"; // this will be a variable for the user to select
let rowLength = 6;
let gameBoard; // map the selected gameBoard with its corresponding object
let hasScored = false;
let isFirstPlayerTurn = true;
let isPlayingComputer = true; // indicates if you are playing the computer
let count = 400;
let counter;
let disableComputer = false;
let totalPointsScored = 0;
let conserveMoveUsed = false;
let explodingBoxes = [];
let gameMode = true;
let gameLevel;
let starsEarned;
let currentPage = "homePage";

// game controls
let chanceToGiveAWayPoint;
let hasMuted = false;
let bombsToLay = 0;
let lockBombLocations = [];
const possibleBombs = [];
let lockedBoxLimit = 5;

let waterRemoval = 0;
let waterRemovalIndex;
let initialBombs;
const tools = [
  {
    name: "bombEraser",
    src: "./img/bombEraser.png",
    count: 0
  },
  {
    name: "mediumBomb",
    src: "./img/mediumBomb.png",
    count: 0
  },
  {
    name: "largeBomb",
    src: "./img/largeBomb.png",
    count: 0
  },
  {
    name: "verticalBomb",
    src: "./img/verticalBomb.png",
    count: 0
  },
  {
    name: "horizontalBomb",
    src: "./img/horizontalBomb.png",
    count: 0
  },
  {
    name: "veryLarge",
    src: "./img/veryLarge.png",
    count: 0
  },
]

const getRowClick = (positionFromTopOfGameBoard, heightOfBoxes) => {
  let row = (positionFromTopOfGameBoard/heightOfBoxes);
  // collaboration of row
  if(row < 0.9){ row = 0; }
  else if(row < 1 && row > 0.9){ row = 1; }
  else if(row < 2 && row > 1.88){ row = 2; }
  else if(row < 3 && row > 2.85){ row = 3; }
  else if(row < 4 && row > 3.76){ row = 4; }
  return Math.floor(row);
}

const getEdgePositions = (rowInformation) => {
  const edgeBoxes = rowInformation.filter(box => {
    const boxInfo = gameBoard[box];
    return (
      boxInfo.isTopRightCornerBox
      || boxInfo.isTopLeftCornerBox
      || boxInfo.isBottomRightCornerBox
      || boxInfo.isBottomLeftCornerBox
      || boxInfo.isTopSideRow
      || boxInfo.isRightSideRow
      || boxInfo.isBottomSideRow
      || boxInfo.isLeftSideRow
      && !boxInfo.disabled
    );
  });
  return edgeBoxes;
}

lineClickAction.setEdgeBoxClickEvent();
track.goToPage("homePage");
