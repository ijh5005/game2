'use strict';

// homepage btn functions
const chooseBoard = () => {
  ui.chooseBoard();
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
const debugMode = () => {
  disableComputer = !disableComputer;
}
const tryFunction = () => {
  bomb.isVeryLargeExplosion();
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
let gameBoard = gameBoardMapperObj[gameBoardSize]; // map the selected gameBoard with its corresponding object
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

// game controls
let chanceToGiveAWayPoint;
let isEasyDifficulty = false;
let isMediumDifficulty = false;
let isHardDifficulty = true;
if (isEasyDifficulty) {
  chanceToGiveAWayPoint = 0.4;
} else if (isMediumDifficulty) {
  chanceToGiveAWayPoint = 0.2;
} else if (isHardDifficulty) {
  chanceToGiveAWayPoint = 0.01;
}
let hasMuted = false;
let bombsToLay = 0;

let lockBombLocations = [];
const possibleBombs = [];
let lockedBoxLimit = 5;
for(let i = 0; i < 36; i++){
  if(!boxInfo.isBoxDisabled(`box${i}`)){
    possibleBombs.push(`box${i}`);
  }
}

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

const startGame = (level) => {
  gameBoard = gameBoardMapperObj[`level${level}`];
  gameBoardLength = ui.getGameBoardLength();
  const lockBoxesAmount = lockBoxes[level];
  possibleBombs.forEach((data, index) => {
    if(index < lockBoxesAmount){
      const box = task.getRandomIndexInArray(possibleBombs);
      const index = possibleBombs.indexOf(box);
      possibleBombs.splice(index, 1);
    }
  })
  $(".levelsPage").addClass("hide");
  $(".topBar").removeClass("hide");
  $(".bombToolsBar").removeClass("hide");
  $("#board").removeClass("hide");
  initialBombs = levels.levelInformation[level - 1].initialBombs;
  waterRemovalIndex = levels.levelInformation[level - 1].waterRemovalIndex;
  bombsToLay = levels.levelInformation[level - 1].bombsToLay;
  lockBombLocations = levels.levelInformation[level - 1].lockBoxes;
  ui.addInitialBombs();
  ui.populateBoard();
  bomb.fillPopulationData()
};
