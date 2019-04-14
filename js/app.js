'use strict';
// will contain boxes with no lines clicked
const noBorders = [];
// will contain boxes with one line clicked
const oneBorderBoxes = [];
// will contain boxes with two lines clicked
const twoBorderBoxes = [];
// will contain boxes with three lines clicked
const threeBorderBoxes = [];

// offset from line to be considered a line click
const lineClickOffset = 12;

// tracks who click the line
let whoClickedLine = task.breakRefAndCopy(whoClickTheLine);

// this is the selected animal to be placed on the board from the help section
let selectedBombFunction;

// these are the players' scores
let playerOneScore = 0;
let playerTwoScore = 0;

// the amount of boxes on the board
let gameBoardLength;
//tot maximum amount of the boxes in each row
let rowLength = 6;
// the ibformtaion for each box on the game board
let gameBoard;
// the current game level we are on
let gameLevel;
// all infoemation for the current level
let getGameLevelObj;

// trcak if a play has score (used to determin the player turn)
let takeAnotherTurn = false;
// will be tru if first player turn
let isFirstPlayerTurn = true;
// disable the computer while debugging
let disableComputer = false;
// track previously used boardtext type to avoid resaying the same type in a row
let textType;
// help to take another turn after laying a bomb
let layedBomb;
// has clicked a bomb
let clickedExplosion;
// help to passTurn during computer move
let computerHasScored = false;

// tracks points scored and used with gameBoardLength to determine if the game is over
let totalPointsScored = 0;
// tools that are being use in game
let tools;
// this is the currently exploding boex
let explodingBoxes = [];
// amount aof bomb that will be layed in the game
let bombsToLay = 0;
// all lock box locations on the board
let lockBombLocations = [];
// possible bombs to lay
const possibleBombs = [];
// initial bomb on the screen
let initialBombs;
// number of points scored in a row by isFirstPlayerTurn
let pointsInArow = 0;

// current page we are on
let currentPage = "homePage";

// used for difficulty
let chanceToGiveAWayPoint;


let reset_settings = true;
//determines if we are on the game board
let on_game_board = false;

// used to prevent multiple game board text showing on board
let showTextUsed = false;
// time to wait before show more game board text
let timeToWaitBetweenText = 8000;

// help text shown when learning on the game board
let helpText;

// traning helping variable
let restrictionLineClicks;
let restrictionClickBox;
let restrictionLayBomb;
let nextRestriction;

// set any saved field in local storage
task.setFromLocalStorage();

// adjust click event for edge boxes
lineClickAction.setEdgeBoxClickEvent();

// star of on the home screen
track.goToPage("homePage");

// set game music event listener
soundEffects.playGameMusic();

// animal text on home screen
task.changeTitleColor();

// animate the board selecting page stars
ui.animateStars();
// ui.animateDots();

task.setToolClickEvent();
