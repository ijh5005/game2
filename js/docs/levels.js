const level_data = [
  {
    isLocked: false,
    levelNumber: 1,
    stars: 3,
    lockBoxes: [],
    starRating: [
      { stars: 1, score: 8 },
      { stars: 2, score: 9 },
      { stars: 3, score: 10 }
    ],
    tipsPage: {
      hey: "hey",
      heading: "how to",
      text: "Take turns clicking lines. Complete a box to score and go again.",
      img_src: "./img/tips/howto.gif"
    }
  },
  {
    isLocked: false,
    levelNumber: 2,
    stars: 2,
    lockBoxes: [
      {
        box: "box8",
        toughness: 1
      },{
        box: "box10",
        toughness: 1
      },{
        box: "box14",
        toughness: 1
      },{
        box: "box21",
        toughness: 1
      }
    ],
    takenBoxes: [],
    initialBombs: [
      {
        box: "box9",
        bombType: "isCheetahExplosion"
      }
    ],
    starRating: [
      { stars: 1, score: 8 },
      { stars: 2, score: 9 },
      { stars: 3, score: 10 }
    ]
  },
  {
    isLocked: true,
    levelNumber: 3,
    stars: 2,
    lockBoxes: [
      {
        box: "box15",
        toughness: 1
      }, {
        box: "box20",
        toughness: 1
      }],
      initialBombs: [{
        box: "box14",
        bombType: "isLionExplosion"
      }, {
        box: "box14",
        bombType: "isCheetahExplosion"
      }
    ],
    starRating: [
      { stars: 1, score: 11 },
      { stars: 2, score: 12 },
      { stars: 3, score: 13 }
    ]
  },
  {
    isLocked: true,
    levelNumber: 4,
    stars: 1,
    lockBoxes: [
      {
        box: "box7",
        toughness: 1
      }, {
        box: "box28",
        toughness: 1
      }],
      initialBombs: [{
        box: "box21",
        bombType: "isPantherExplosion"
      },{
        box: "box19",
        bombType: "isPantherExplosion"
      }
    ],
    bombsToLay: 6,
    waterRemovalIndex: [],
    starRating: [
      { stars: 1, score: 10 },
      { stars: 2, score: 11 },
      { stars: 3, score: 12 }
    ]
  },
  {
    isLocked: false,
    levelNumber: 5,
    stars: 0,
    lockBoxes: [
      {
        box: "box14",
        toughness: 1
      }, {
        box: "box15",
        toughness: 1
      }, {
        box: "box20",
        toughness: 1
      }, {
        box: "box21",
        toughness: 1
      }
    ],
    initialBombs: [],
    bombsToLay: 4,
    waterRemovalIndex: [],
    starRating: [
      { stars: 1, score: 8 },
      { stars: 2, score: 9 },
      { stars: 3, score: 10 }
    ],
    tools: [
      {
        name: "lion",
        src: "./img/color_animals/asset_lion.png",
        count: 1
      },
      {
        name: "cheetah",
        src: "./img/color_animals/asset_cheetah.png",
        count: 1
      },
      {
        name: "panther",
        src: "./img/color_animals/asset_panther.png",
        count: 1
      }
    ]
  },
  {
    isLocked: true,
    levelNumber: 6,
    stars: 2,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
  },
  {
    isLocked: true,
    levelNumber: 7,
    stars: 2,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
  },
  {
    isLocked: true,
    levelNumber: 8,
    stars: 2,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
  },
  {
    isLocked: true,
    levelNumber: 9,
    stars: 2,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
  },
  {
    isLocked: true,
    levelNumber: 10,
    stars: 2,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
  }
]
