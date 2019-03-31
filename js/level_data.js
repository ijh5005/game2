const level_data = [
  {
    computerSpeed: 1500,
    isLocked: false,
    levelNumber: 1,
    stars: 3,
    lockBoxes: [],
    starRating: [
      { stars: 1, score: 8 },
      { stars: 3, score: 9 },
      { stars: 5, score: 10 }
    ],
    isTrainingBoard: true,
    help: {
      boardHelpText: function* gen(){
        yield "Tap a line on the board";
        yield "It's your turn when the above dot is gold. Tap another line";
        yield "Create a box to score";
        yield "Take another turn because you scored!";
        yield "";
      },
      helpTurns: [0, 2, 4, 5, 6]
    },
    trainingRestrictions: {
      restrictions: [
        {
          type: "highLightLine",
          turn: 0,
          boxOne: {
            box: "box15",
            side: "left"
          },
          boxTwo: {
            box: "box14",
            side: "right"
          }
        },
        {
          type: "highLightLine",
          turn: 2,
          boxOne: {
            box: "box20",
            side: "bottom"
          },
          boxTwo: {
            box: "box26",
            side: "top"
          }
        },
        {
          type: "highLightLine",
          turn: 4,
          boxOne: {
            box: "box15",
            side: "right"
          },
          boxTwo: {
            box: "box16",
            side: "left"
          }
        }
      ]
    },
    computerMoves: [
      {
        turn: 1,
        box: "box9",
        line: "bottom"
      },
      {
        turn: 3,
        box: "box15",
        line: "bottom"
      }
    ],
    tipsPage: {
      hey: "hey",
      heading: "how to",
      text: "Take turns clicking lines. Complete a box to score and take another turn.",
      img_src: "./img/tips/howto.gif"
    }
  },
  {
    isLocked: false,
    levelNumber: 2,
    stars: 2,
    prefilledBoxes: ["box7", "box8", "box10"],
    hasLargePrize: {
      prize: "cheetah",
      quantity: 1
    },
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
    ],
    help: {
      boardHelpText: function* gen(){
        yield "Tap the cheetah! Watch the computer's score drop";
        yield "";
      },
      helpTurns: [0, 1]
    },
    trainingRestrictions: {
      restriction: {
        explodeBomb: {
          bomb: "cheetah",
          boxesToClick: ["box14", "box15", "box16", "box20", "box22", "box26", "box27", "box28"]
        }
      },
      directionTurns: [0]
    }
  },
  {
    isLocked: false,
    levelNumber: 3,
    stars: 2,
    starRating: [
      { stars: 1, score: 11 },
      { stars: 2, score: 12 },
      { stars: 3, score: 13 }
    ],
    tools: [
      {
        name: "cheetah",
        src: "./img/color_animals/asset_cheetah.png",
        count: 1
      }
    ],
    help: {
      boardHelpText: function* gen(){
        yield "Tap the cheetah. Then tap any box. Then take your turn.";
        yield "The cheetah explodes if it is inside a box.";
        yield "";
      },
      helpTurns: [0, 2, 4]
    }
  },
  {
    isLocked: false,
    levelNumber: 4,
    stars: 1,
    initialBombs: [
      {
        box: "box21",
        bombType: "isLionExplosion"
      }
    ],
    waterRemovalIndex: [],
    starRating: [
      { stars: 1, score: 10 },
      { stars: 2, score: 11 },
      { stars: 3, score: 12 }
    ],
    hasLargePrize: {
      prize: "lion",
      quantity: 1
    },
    tools: [
      {
        name: "cheetah",
        src: "./img/color_animals/asset_cheetah.png",
        count: 1
      }
    ],
    help: {
      boardHelpText: function* gen(){
        yield "Place the Cheetah next to the Lion. Then tap either one";
        yield "Chain explosions help explode more boxes at once";
        yield "";
      },
      helpTurns: [0, 1, 3]
    }
  },
  {
    isLocked: false,
    levelNumber: 5,
    stars: 0,
    hasLargePrize: {
      prize: "panther",
      quantity: 1
    },
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
    initialBombs: [
      {
        box: "box27",
        bombType: "isPantherExplosion"
      }
    ],
    // bombsToLay: 4,
    waterRemovalIndex: [],
    starRating: [
      { stars: 1, score: 8 },
      { stars: 2, score: 9 },
      { stars: 3, score: 10 }
    ],
    help: {
      boardHelpText: function* gen(){
        yield "Tap the panther to explode The Foot Of Oppression";
        yield "You cannot click lines around The Foot Of Oppression";
        yield "If The Foot Of Oppression isn't destroyed You Lose";
        yield "";
      },
      helpTurns: [0, 1, 3, 4]
    },
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
