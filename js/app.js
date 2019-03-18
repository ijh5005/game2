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
let rowLength = 6;
let gameBoard;
let hasScored = false;
let isFirstPlayerTurn = true;
let isPlayingComputer = true; // indicates if you are playing the computer
let disableComputer = false;
let totalPointsScored = 0;
let explodingBoxes = [];
let gameLevel;
let currentPage = "homePage";
let tools;
let getGameLevelObj;

// game controls
let chanceToGiveAWayPoint;
let bombsToLay = 0;
let lockBombLocations = [];
const possibleBombs = [];

let initialBombs;

let reset_settings = false;
let on_game_board = false;

let showTextUsed = false; // used to prevent multiple screen text showing on board
let timeToWaitBetweenText = 8000;

task.setFromLocalStorage();
lineClickAction.setEdgeBoxClickEvent();
track.goToPage("homePage");
soundEffects.playGameMusic();
task.changeTitleColor();
