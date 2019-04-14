const helpTextArray = [
    {
      levelNumber: 1,
      help: {
        boardHelpText: function* gen(){
          // yield "tap the <span class='highlightText'>blinking line</span> on the board";
          // yield "it's your turn. Tap another line";
          yield "create a <span class='highlightText'>box</span> to score";
          yield "take <span class='highlightText'>another turn</span> because you scored!";
          yield "your turn!";
          yield "";
        },
        helpTurns: [4, 5, 7, 8]
      },
    },
    {
      levelNumber: 2,
      help: {
        boardHelpText: function* gen(){
          // yield "tap the <span class='highlightText'>cheetah</span> to explode the boxes!";
          yield "the cheetah explodes the <span class='highlightText'>row</span>";
          yield "if the cheetah is in a <span class='highlightText'>box</span> it explodes";
          yield "";
        },
        helpTurns: [0, 1, 3, 5]
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
      levelNumber: 4,
      help: {
        boardHelpText: function* gen(){
          yield "that was a <span class='highlightText'>chain explosion</span>!";
          yield "the <span class='highlightText'>lion</span> explodes surrounding boxes!";
          yield "";
        },
        helpTurns: [1, 3, 5]
      },
    },
    {
      levelNumber: 5,
      help: {
        boardHelpText: function* gen(){
          yield "explode the <span class='highlightText'>Foot Of Oppression</span>";
          yield "You <span class='highlightText'>cannot</span> click lines <span class='highlightText'>around</span> The Foot Of Oppression";
          yield "If The Foot Of Oppression <span class='highlightText'>is not</span> destroyed You Lose";
          yield "";
        },
        helpTurns: [0, 1, 3, 5]
      },
    },
    {
      levelNumber: 6,
    },
    {
      levelNumber: 7,
    },
    {
      levelNumber: 8,
    },
    {
      levelNumber: 9,
    },
    {
      levelNumber: 10,
    }
  ];
