'use strict';

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
  thirtysix
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
let gameBoardSize = "thirtysix"; // this will be a variable for the user to select
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
let bombsToLay = 30;

let lockBombLocations = [];
const possibleBombs = [];
let lockedBoxLimit = 5;
for(let i = 0; i < 36; i++){
  possibleBombs.push(`box${i}`)
}
possibleBombs.forEach((data, index) => {
  if(index < lockedBoxLimit){
    const box = task.getRandomIndexInArray(possibleBombs);
    const index = possibleBombs.indexOf(box);
    possibleBombs.splice(index, 1);
    lockBombLocations.push({
      box,
      toughness: 1
    })
  }
})

let waterRemoval = 0;
const waterRemovalIndex = [3, 5, 10, 30];
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

ui.populateBoard(); // populate the gameboard into the UI
bomb.fillPopulationData();
