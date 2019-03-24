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
      const temp = lionSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const topLeftBoxNumber = lionSquares[box][0];
      const topBox = lionSquares[box][1];
      const topRightBoxNumber = lionSquares[box][2];
      const leftBox = lionSquares[box][3];
      const thisBox = lionSquares[box][4];
      const rightBox = lionSquares[box][5];
      const bottomLeftBoxNumber = lionSquares[box][6];
      const bottomBox = lionSquares[box][7];
      const bottomRightBoxNumber = lionSquares[box][8];

      // match the boxes with the lines that will be remove and a result of the explosion
      const linesToRemove = [
        { box: `box${topRightBoxNumber}`, lines: ["bottom", "left"] },
        { box: `box${topLeftBoxNumber}`, lines: ["bottom", "right"] },
        { box: `box${bottomRightBoxNumber}`, lines: ["top", "left"] },
        { box: `box${bottomLeftBoxNumber}`, lines: ["top", "right"] },
        { box: `box${topBox}`, lines: ["right", "bottom", "left"] },
        { box: `box${rightBox}`, lines: ["top", "bottom", "left"] },
        { box: `box${bottomBox}`, lines: ["top", "right", "left"] },
        { box: `box${leftBox}`, lines: ["top", "right", "bottom"] },
        { box: `box${thisBox}`, lines: ["top", "right", "bottom", "left"] }
      ].filter(data => data.box !== "boxnull");

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

      const temp = cheetahSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["right", "left"]
        })
      });

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

      const temp = pantherSquares[box].filter(data => data !== null);
      const boxesToExplode = temp.map(data => `box${data}`);

      const linesToRemove = [];
      boxesToExplode.forEach(data => {
        linesToRemove.push({
          box: data,
          lines: ["top", "bottom"]
        })
      });

      return {
        linesToRemove,
        boxesToExplode
      }
    }
  }
}
