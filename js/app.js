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
let hasMuted = true;
let bombsToLay = 15;
let lockBombLocations = ["box0", "box1", "box6", "box7", "box15"];

ui.populateBoard(); // populate the gameboard into the UI
bomb.fillPopulationData();
