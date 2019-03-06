'use strict';
// homepage btn functions
const noBorders = [];
const oneBorderBoxes = [];
const twoBorderBoxes = [];
const threeBorderBoxes = [];

let selectedBombFunction;
let playerOneScore = 0;
let playerTwoScore = 0;
let gameBoardLength;
let gameBoardSize = "level1"; // this will be a variable for the user to select
let rowLength = 6;
let gameBoard;
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
let bombsToLay = 0;
let lockBombLocations = [];
const possibleBombs = [];
let lockedBoxLimit = 5;

let waterRemoval = 0;
let waterRemovalIndex;
let initialBombs;

task.setFromLocalStorage();
lineClickAction.setEdgeBoxClickEvent();
track.goToPage("homePage");
soundEffects.playGameMusic();
task.changeTitleColor();

setTimeout(() => {
  $(".interactiveText p").addClass("showText")
}, 10000)
