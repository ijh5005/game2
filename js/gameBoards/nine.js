//  three by three board
//  0   1   2
//  3   4   5
//  6   7   8

const nine = { // 3 by 3 gameboard
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    }
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      borders: {
        top: null,
        right: null,
        bottom: null,
        left: null
      },
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    }
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    }
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    }
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    }
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    }
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  }
};