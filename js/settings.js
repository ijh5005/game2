let settings = {
  difficulty: "easy", // options: easy, medium, hard
  hasMutedMusic: false,
  hasMutedSound: false,
  startUpPage: "gameBoardPage",
  level_data: [
    {
      computerSpeed: 1500,
      isLocked: false,
      levelNumber: 1,
      stars: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 3, score: 9 },
        { stars: 5, score: 10 }
      ],
      help: {
        boardHelpText: function* gen(){
          // yield "tap the <span class='highlightText'>blinking line</span> on the board";
          // yield "it's your turn. Tap another line";
          yield "create a <span class='highlightText'>box</span> to score";
          yield "take <span class='highlightText'>another turn</span> because you scored!";
          yield "your turn!";
          yield "";
        },
        // helpTurns: [0, 2, 4, 5, 6]
        helpTurns: [4, 5, 7, 8]
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
          },
          {
            type: "highLightLine",
            turn: 5,
            boxOne: {
              box: "box21",
              side: "bottom"
            },
            boxTwo: {
              box: "box27",
              side: "top"
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
        heading: "how to",
        text: "Complete a box to score. You get another turn by scoring.",
        img_src: "./img/tips/howto.gif",
        height: "30%"
      }
    },
    {
      computerSpeed: 1000,
      isLocked: true,
      levelNumber: 2,
      stars: 0,
      prefilledBoxes: ["box7", "box8", "box10", "box25", "box27", "box28"],
      hasLargePrize: {
        prize: "cheetah",
        quantity: 1
      },
      initialBombs: [
        {
          box: "box9",
          bombType: "isCheetahExplosion"
        },
        {
          box: "box26",
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
          // yield "tap the <span class='highlightText'>cheetah</span> to explode the boxes!";
          yield "the cheetah explodes the <span class='highlightText'>row</span>";
          yield "if the cheetah is in a <span class='highlightText'>box</span> it explodes";
          yield "";
        },
        // helpTurns: [0, 1, 3, 5]
        helpTurns: [0, 1, 3, 5]
      },
      trainingRestrictions: {
        restrictions: [
          {
            type: "clickBox",
            turn: 0,
            clickBox: ["box9"]
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
        ]
      },
      computerMoves: [
        {
          turn: 1,
          box: "box26",
          line: "bottom"
        }
      ],
      tipsPage: {
        heading: "how to",
        text: "Exploding opponent's boxes decrease their score",
        img_src: "./img/tips/bomb_example.gif",
        height: "30%"
      }
    },
    {
      isLocked: true,
      levelNumber: 3,
      stars: 0,
      prefilledBoxes: ["box9", "box15", "box27"],
      clickAnimal: "panther",
      hasLargePrize: {
        prize: "panther",
        quantity: 1
      },
      starRating: [
        { stars: 1, score: 11 },
        { stars: 2, score: 12 },
        { stars: 3, score: 13 }
      ],
      tools: [
        {
          name: "panther",
          src: "./img/color_animals/asset_panther.png",
          count: 1
        }
      ],
      help: {
        boardHelpText: function* gen(){
          yield "the panther explodes the <span class='highlightText'>column</span>";
          yield "";
        },
        helpTurns: [2, 4]
      },
      trainingRestrictions: {
        restrictions: [
          {
            type: "layBomb",
            turn: 0,
            clickBox: ["box21"],
            clickWhenLayed: true
          }
        ]
      },
      tipsPage: {
        heading: "how to",
        text: "place the bomb on the board by selecting it and a box",
        img_src: "./img/tips/drop_example.png",
        height: "64%"
      }
    },
    {
      isLocked: true,
      levelNumber: 4,
      stars: 0,
      initialBombs: [
        {
          box: "box21",
          bombType: "isLionExplosion"
        }
      ],
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
      clickAnimal: "cheetah",
      help: {
        boardHelpText: function* gen(){
          yield "that was a <span class='highlightText'>chain explosion</span>!";
          yield "the <span class='highlightText'>lion</span> explodes surrounding boxes!";
          yield "";
        },
        helpTurns: [1, 3, 5]
      },
      trainingRestrictions: {
        restrictions: [
          {
            type: "layBomb",
            turn: 0,
            clickBox: ["box14", "box15", "box16", "box20", "box22", "box26", "box27", "box28"],
            then: {
              type: "clickBox",
              clickBox: ["box21"]
              // withClickBox: true
            }
          }
        ]
      }
    },
    {
      isLocked: true,
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
      initialBombs: [
        {
          box: "box27",
          bombType: "isPantherExplosion"
        }
      ],
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ],
      help: {
        boardHelpText: function* gen(){
          yield "explode the <span class='highlightText'>Foot Of Oppression</span>";
          yield "You <span class='highlightText'>cannot</span> click lines <span class='highlightText'>around</span> The Foot Of Oppression";
          yield "If The Foot Of Oppression <span class='highlightText'>is not</span> destroyed You Lose";
          yield "";
        },
        helpTurns: [0, 1, 3, 5]
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
      ],
      trainingRestrictions: {
        restrictions: [
          {
            type: "clickBox",
            turn: 0,
            clickBox: ["box27"]
          }
        ]
      }
    },
    {
      isLocked: true,
      levelNumber: 6,
      stars: 0,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ]
    },
    {
      isLocked: true,
      levelNumber: 7,
      stars: 0,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ]
    },
    {
      isLocked: true,
      levelNumber: 8,
      stars: 0,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ]
    },
    {
      isLocked: true,
      levelNumber: 9,
      stars: 0,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ]
    },
    {
      isLocked: true,
      levelNumber: 10,
      stars: 0,
      lockBoxes: [],
      initialBombs: [],
      bombsToLay: 0,
      starRating: [
        { stars: 1, score: 8 },
        { stars: 2, score: 9 },
        { stars: 3, score: 10 }
      ]
    }
  ]
}
