// this file contains the exploding patterns of the animal bombs

const animalExplosions = {
  lion: { // exploding pattern for the lion
    boxes: (box) => {
      /*
        explodes around animal
        ex:    6   7   8
              12  13  14
              18  19  20
      */

      // cache every box that will be exploded
      const boxNumber = parseInt(box.replace("box", ""));
      const topRightBoxNumber = boxInfo.getTopRightBoxNumber(boxNumber);
      const topLeftBoxNumber = boxInfo.getTopLeftBoxNumber(boxNumber);
      const bottomRightBoxNumber = boxInfo.getBottomRightBoxNumber(boxNumber);
      const bottomLeftBoxNumber = boxInfo.getBottomLeftBoxNumber(boxNumber);
      const topBox = boxInfo.getTopBox(boxNumber);
      const leftBox = boxInfo.getLeftBox(boxNumber);
      const bottomBox = boxInfo.getBottomBox(boxNumber);
      const rightBox = boxInfo.getRightBox(boxNumber);

      // places those exploding boxes into an array and filter out invalid boxes
      // invalid boxes include boxes that are on the edge of the board
      const boxesToExplode = [
        `box${boxNumber}`,
        topRightBoxNumber,
        topLeftBoxNumber,
        bottomRightBoxNumber,
        bottomLeftBoxNumber,
        topBox,
        leftBox,
        bottomBox,
        rightBox
      ].filter(data => data);

      // match the boxes with the lines that will be remove and a result of the explosion
      const linesToRemove = [
        { box: topRightBoxNumber, lines: ["bottom", "left"] },
        { box: topLeftBoxNumber, lines: ["bottom", "right"] },
        { box: bottomRightBoxNumber, lines: ["top", "left"] },
        { box: bottomLeftBoxNumber, lines: ["top", "right"] },
        { box: topBox, lines: ["right", "bottom", "left"] },
        { box: rightBox, lines: ["top", "bottom", "left"] },
        { box: bottomBox, lines: ["top", "right", "left"] },
        { box: leftBox, lines: ["top", "right", "bottom"] },
        { box: `box${boxNumber}`, lines: ["top", "right", "bottom", "left"] }
      ];
      return {
        linesToRemove,
        boxesToExplode
      }
    }
  },
  cheetah: {
    boxes: (box) => {
      /*
        explodes animal column
        ex:    0 1 2 3 4 5
      */
      const boxNumber = parseInt(box.replace("box", ""));
      let boxesToExplode = [`box${boxNumber}`];
      let keepGoingLeft = true;
      let keepGoingRight = true;
      let boxToCheck = boxNumber;
      while(keepGoingLeft){
        const leftBox = boxInfo.getLeftBox(boxToCheck);
        if(leftBox){
          boxesToExplode.push(leftBox)
          boxToCheck = parseInt(leftBox.replace("box", ""));
        } else {
          keepGoingLeft = false;
        }
      }
      while(keepGoingRight){
        const rightBox = boxInfo.getRightBox(boxToCheck);
        if(rightBox){
          boxesToExplode.push(rightBox)
          boxToCheck = parseInt(rightBox.replace("box", ""));
        } else {
          keepGoingRight = false;
        }
      }
      const temp = boxesToExplode.filter(data => data);
      const temp2 = task.removedDoublesFromArray(temp);
      boxesToExplode = temp2;
      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["right", "left"]
        })
      })
      return {
        linesToRemove,
        boxesToExplode
      }
    }
  },
  panther: {
    boxes: (box) => {
      /*
        explodes animal row
        ex:    0
               6
              12
              18
              24
              30
      */
      const boxNumber = parseInt(box.replace("box", ""));
      let boxesToExplode = [`box${boxNumber}`];
      let keepGoingUp = true;
      let keepGoingDown = true;
      let boxToCheck = boxNumber;
      while(keepGoingUp){
        const topBox = boxInfo.getTopBox(boxToCheck);
        if(topBox){
          boxesToExplode.push(topBox)
          boxToCheck = parseInt(topBox.replace("box", ""));
        } else {
          keepGoingUp = false;
        }
      }
      while(keepGoingDown){
        const bottomBox = boxInfo.getBottomBox(boxToCheck);
        if(bottomBox){
          boxesToExplode.push(bottomBox)
          boxToCheck = parseInt(bottomBox.replace("box", ""));
        } else {
          keepGoingDown = false;
        }
      }
      const temp = boxesToExplode.filter(data => data);
      const temp2 = task.removedDoublesFromArray(temp);
      boxesToExplode = temp2;
      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["top", "bottom"]
        })
      })
      return {
        linesToRemove,
        boxesToExplode
      }
    }
  }
}
