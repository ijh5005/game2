'use strict';

const noBorders = [];
const oneBorderBoxes = [];
const twoBorderBoxes = [];
const threeBorderBoxes = [];
const extendedPathBoxes = [];
const complementBorder = {
  top: "bottom",
  right: "left",
  bottom: "top",
  left: "right"
}
const totalPointsToScore = {
  nine: 9,
  thirtysix: 36,
  onehundred: 100
}
const setHelper = (helper) => {
  helperButtonSelected = helper;
}
const gameBoardMapperObj = {
  nine,
  thirtysix,
  onehundred
}
const debugMode = () => {
  disableComputer = !disableComputer;
}
const tryFunction = () => {
  helper.isVeryLargeExplosion();
}

let playerOneScore = 0;
let playerTwoScore = 0;
let gameBoardSize = "thirtysix"; // this will be a variable for the user to select
let rowLength = 6;
let gameBoard = gameBoardMapperObj[gameBoardSize]; // map the selected gameBoard with its corresponding object
let hasScored = false;
let isFirstPlayerTurn = true;
let isPlayingComputer = true; // indicates if you are playing the computer
let helperButtonSelected = null;
let count = 400;
let counter;
let disableComputer = false;
let totalPointsScored = 0;
let turnNumber = 0;
let calculatedTotalTurns = totalPointsToScore[gameBoardSize] * 4;
let conserveMoveUsed = false;

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

ui.populateBoard(); // populate the gameboard into the UI
gameTimer.startTimer();