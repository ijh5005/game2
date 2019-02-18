const levels = {
  levelInformation: [
    {
      levelNumber: 1,
      stars: 3,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      waterRemovalIndex: []
    },
    {
      levelNumber: 2,
      stars: 2,
      lockBoxes: [{
        box: "box14",
        toughness: 1
      }],
      initialBombs: [{
        box: "box15",
        bombType: "isLargeExplosion"
      }],
      bombsToLay: 0,
      waterRemovalIndex: []
    },
    {
      levelNumber: 3,
      stars: 2,
      lockBoxes: [{
        box: "box15",
        toughness: 1
      }, {
        box: "box20",
        toughness: 1
      }],
      initialBombs: [{
        box: "box14",
        bombType: "isMediumExplosion"
      }, {
        box: "box14",
        bombType: "isMediumExplosion"
      }],
      bombsToLay: 0,
      waterRemovalIndex: []
    },
    {
      levelNumber: 4,
      stars: 1,
      lockBoxes: [{
        box: "box7",
        toughness: 1
      }, {
        box: "box28",
        toughness: 1
      }],
      initialBombs: [{
        box: "box21",
        bombType: "isLargeExplosion"
      },{
        box: "box19",
        bombType: "isVerticalExplosion"
      }],
      bombsToLay: 6,
      waterRemovalIndex: []
    }
  ]
}
