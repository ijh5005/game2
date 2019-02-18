const obj = {};

// right out the border and change the variables to print out the board
const size = 36;
const difference = 6;

const topRightCorner = 10;
const topLeftCorner = 7;
const bottomRightCorner = 28;
const bottomLeftCorner = 25;

const topSideRow = [8, 9];
const rightSideRow = [16, 22];
const bottomSideRow = [26, 27];
const leftSideRow = [13, 19];

const disabled = [0, 1, 2, 3, 4, 5, 6, 12, 18, 24, 30, 11, 17, 23, 29, 35, 31, 32, 33, 34];

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

  if (i === topRightCorner) {
    addition.surroundingBoxes.topBox = null;
    addition.surroundingBoxes.rightBox = null;
    addition.isTopRightCornerBox = true;
  } else if (i === topLeftCorner) {
    addition.surroundingBoxes.topBox = null;
    addition.surroundingBoxes.leftBox = null;
    addition.isTopLeftCornerBox = true;
  } else if (i === bottomRightCorner) {
    addition.surroundingBoxes.bottomBox = null;
    addition.surroundingBoxes.rightBox = null;
    addition.isBottomRightCornerBox = true;
  } else if (i === bottomLeftCorner) {
    addition.surroundingBoxes.bottomBox = null;
    addition.surroundingBoxes.leftBox = null;
    addition.isBottomLeftCornerBox = true;
  } else if (topSideRow.includes(i)) {
    addition.surroundingBoxes.topBox = null;
    addition.isTopSideRow = true;
  } else if (rightSideRow.includes(i)) {
    addition.surroundingBoxes.rightBox = null;
    addition.isRightSideRow = true;
  } else if (bottomSideRow.includes(i)) {
    addition.surroundingBoxes.bottomBox = null;
    addition.isBottomSideRow = true;
  } else if (leftSideRow.includes(i)) {
    addition.surroundingBoxes.leftBox = null;
    addition.isLeftSideRow = true;
  }

  if(disabled.includes(i)){
    addition.disabled = true;
  }

  obj[`box${i}`] = addition;
}
console.log(JSON.stringify(obj))
