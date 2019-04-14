const obj = {};

// right out the border and change the variables to print out the board
const size = 36;
const difference = 6;

const topRightCorner = [5, 0, 3];
const topLeftCorner = [0, 2, 5];
const bottomRightCorner = [35, 31];
const bottomLeftCorner = [30, 34];

const topSideRow = [7, 10];
const rightSideRow = [11, 17, 23, 29, 25];
const bottomSideRow = [20, 21];
const leftSideRow = [6, 12, 18, 24, 28];

const disabled = [1, 4, 26, 27, 32, 33];

for (let i = 0; i < size; i++) {
  let addition = {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: i - difference,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: i + 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: i + difference,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: i - 1,
        isConnected: true,
        borders: null
      }
    }
  };

  if (topRightCorner.includes(i)) {
    addition.surroundingBoxes.topBox = null;
    addition.surroundingBoxes.rightBox = null;
    addition.isTopRightCornerBox = true;
  }
  if (topLeftCorner.includes(i)) {
    addition.surroundingBoxes.topBox = null;
    addition.surroundingBoxes.leftBox = null;
    addition.isTopLeftCornerBox = true;
  }
  if (bottomRightCorner.includes(i)) {
    addition.surroundingBoxes.bottomBox = null;
    addition.surroundingBoxes.rightBox = null;
    addition.isBottomRightCornerBox = true;
  }
  if (bottomLeftCorner.includes(i)) {
    addition.surroundingBoxes.bottomBox = null;
    addition.surroundingBoxes.leftBox = null;
    addition.isBottomLeftCornerBox = true;
  }
  if (topSideRow.includes(i)) {
    addition.surroundingBoxes.topBox = null;
    addition.isTopSideRow = true;
  }
  if (rightSideRow.includes(i)) {
    addition.surroundingBoxes.rightBox = null;
    addition.isRightSideRow = true;
  }
  if (bottomSideRow.includes(i)) {
    addition.surroundingBoxes.bottomBox = null;
    addition.isBottomSideRow = true;
  }
  if (leftSideRow.includes(i)) {
    addition.surroundingBoxes.leftBox = null;
    addition.isLeftSideRow = true;
  }
  if(disabled.includes(i)){
    addition.disabled = true;
  }

  obj[`box${i}`] = addition;
}
console.log(JSON.stringify(obj))
