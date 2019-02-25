const explosions = {
  lion: {
    isExplosion: true,
    power: 2,
    positions: [-7, -6, -5, -1, 0, 1, 5, 6, 7],
    linesToPosition: [
      ["right", "bottom"],
      ["right", "bottom", "left"],
      ["bottom", "left"],
      ["top", "right", "bottom"],
      ["top", "right", "bottom", "left"],
      ["top", "bottom", "left"],
      ["top", "right"],
      ["top", "right", "left"],
      ["top", "left"]
    ],
    conditions: [
      {
        position: 0,
        not: [""]
      }
    ]
  },
  cheetah: {
    power: 2,
    isExplosion: true,
    positions: [0, 1, 2, 3, 4, 5],
    linesToPosition: [
      ["right"],
      ["right", "left"],
      ["right", "left"],
      ["right", "left"],
      ["right", "left"],
      ["left"]
    ]
  },
  pather: {
    power: 2,
    isExplosion: true,
    positions: [0, -1, -2, -3, -4, -5],
    linesToPosition: [
      ["left"],
      ["right", "left"],
      ["right", "left"],
      ["right", "left"],
      ["right", "left"],
      ["right"]
    ]
  },
  hyena: {
    power: 1,
    isExplosion: true,
    positions: [-6, -1, 0, 1, 6],
    [
      ["bottom"],
      ["right"],
      ["top", "right", "bottom", "left"],
      ["right"],
      ["top"]
    ]
  },
  monkey: {
    power: 1,
    isRedirect: true,
    chooses: [
      {
        positions: [-6, -12]
      },
      {
        positions: [6, 12]
      }
    ]
  },
  gorilla: {
    power: 2,
    isRedirect: true,
    chooses: [
      {
        positions: [-6, -12, -18]
      },
      {
        positions: [6, 12, 18]
      }
    ]
  }
}
