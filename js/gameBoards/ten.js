//  six by six board
//  0   1   2   3   4   5   6   7   8   9
// 10  11  12  13  14  15  16  17  18  19
// 20  21  22  23  24  25  26  27  28  29
// 30  31  32  33  34  35  36  37  38  39
// 40  41  42  43  44  45  46  47  48  49
// 50  51  52  53  54  55  56  57  58  59
// 60  61  62  63  64  65  66  67  68  69
// 70  71  72  73  74  75  76  77  78  79
// 80  81  82  83  84  85  86  87  88  89
// 90  91  92  93  94  95  96  97  98  99

const onehundred = {
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
        boxNumber: 10,
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
        boxNumber: 11,
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
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
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
      topBox: null,
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
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
      topBox: null,
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
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
      topBox: null,
      rightBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
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
      topBox: null,
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      }
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
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
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
      topBox: null,
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    }
  },
  box10: {
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
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box11: {
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
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    }
  },
  box12: {
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
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    }
  },
  box13: {
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
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    }
  },
  box14: {
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
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
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
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    }
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    }
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      }
    }
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    }
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    }
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    }
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      }
    }
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    }
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    }
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    }
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    }
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    }
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    }
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 42,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    }
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 43,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    }
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 44,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    }
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 45,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    }
  },
  box36: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 46,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      }
    }
  },
  box37: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 47,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      }
    }
  },
  box38: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 48,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      }
    }
  },
  box39: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 49,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      }
    }
  },
  box40: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 50,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box41: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 42,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 51,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      }
    }
  },
  box42: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 43,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 52,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      }
    }
  },
  box43: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 44,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 53,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 42,
        isConnected: true,
        borders: null
      }
    }
  },
  box44: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 45,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 54,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 43,
        isConnected: true,
        borders: null
      }
    }
  },
  box45: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 46,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 55,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 44,
        isConnected: true,
        borders: null
      }
    }
  },
  box46: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 47,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 56,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 45,
        isConnected: true,
        borders: null
      }
    }
  },
  box47: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 48,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 57,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 46,
        isConnected: true,
        borders: null
      }
    }
  },
  box48: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 49,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 58,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 47,
        isConnected: true,
        borders: null
      }
    }
  },
  box49: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 59,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 48,
        isConnected: true,
        borders: null
      }
    }
  },
  box50: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 51,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 60,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box51: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 52,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 61,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 50,
        isConnected: true,
        borders: null
      }
    }
  },
  box52: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 42,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 53,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 62,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 51,
        isConnected: true,
        borders: null
      }
    }
  },
  box53: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 43,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 54,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 63,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 52,
        isConnected: true,
        borders: null
      }
    }
  },
  box54: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 44,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 55,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 64,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 53,
        isConnected: true,
        borders: null
      }
    }
  },
  box55: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 45,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 56,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 65,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 54,
        isConnected: true,
        borders: null
      }
    }
  },
  box56: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 46,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 57,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 66,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 55,
        isConnected: true,
        borders: null
      }
    }
  },
  box57: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 47,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 58,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 67,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 56,
        isConnected: true,
        borders: null
      }
    }
  },
  box58: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 48,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 59,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 68,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 57,
        isConnected: true,
        borders: null
      }
    }
  },
  box59: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 49,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 69,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 58,
        isConnected: true,
        borders: null
      }
    }
  },
  box60: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 50,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 61,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 70,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box61: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 51,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 62,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 71,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 60,
        isConnected: true,
        borders: null
      }
    }
  },
  box62: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 52,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 63,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 72,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 61,
        isConnected: true,
        borders: null
      }
    }
  },
  box63: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 53,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 64,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 73,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 62,
        isConnected: true,
        borders: null
      }
    }
  },
  box64: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 54,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 65,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 74,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 63,
        isConnected: true,
        borders: null
      }
    }
  },
  box65: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 55,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 66,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 75,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 64,
        isConnected: true,
        borders: null
      }
    }
  },
  box66: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 56,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 67,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 76,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 65,
        isConnected: true,
        borders: null
      }
    }
  },
  box67: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 57,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 68,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 77,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 66,
        isConnected: true,
        borders: null
      }
    }
  },
  box68: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 58,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 69,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 78,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 67,
        isConnected: true,
        borders: null
      }
    }
  },
  box69: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 59,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 79,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 68,
        isConnected: true,
        borders: null
      }
    }
  },
  box70: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 60,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 71,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 80,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box71: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 61,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 72,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 81,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 70,
        isConnected: true,
        borders: null
      }
    }
  },
  box72: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 62,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 73,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 82,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 71,
        isConnected: true,
        borders: null
      }
    }
  },
  box73: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 63,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 74,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 83,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 72,
        isConnected: true,
        borders: null
      }
    }
  },
  box74: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 64,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 75,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 84,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 73,
        isConnected: true,
        borders: null
      }
    }
  },
  box75: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 65,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 76,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 85,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 74,
        isConnected: true,
        borders: null
      }
    }
  },
  box76: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 66,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 77,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 86,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 75,
        isConnected: true,
        borders: null
      }
    }
  },
  box77: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 67,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 78,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 87,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 76,
        isConnected: true,
        borders: null
      }
    }
  },
  box78: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 68,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 79,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 88,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 77,
        isConnected: true,
        borders: null
      }
    }
  },
  box79: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 69,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 89,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 78,
        isConnected: true,
        borders: null
      }
    }
  },
  box80: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 70,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 81,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 90,
        isConnected: true,
        borders: null
      },
      leftBox: null
    }
  },
  box81: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 71,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 82,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 91,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 80,
        isConnected: true,
        borders: null
      }
    }
  },
  box82: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 72,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 83,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 92,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 81,
        isConnected: true,
        borders: null
      }
    }
  },
  box83: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 73,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 84,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 93,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 82,
        isConnected: true,
        borders: null
      }
    }
  },
  box84: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 74,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 85,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 94,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 83,
        isConnected: true,
        borders: null
      }
    }
  },
  box85: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 75,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 86,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 95,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 84,
        isConnected: true,
        borders: null
      }
    }
  },
  box86: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 76,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 87,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 96,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 85,
        isConnected: true,
        borders: null
      }
    }
  },
  box87: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 77,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 88,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 97,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 86,
        isConnected: true,
        borders: null
      }
    }
  },
  box88: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 78,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 89,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 98,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 87,
        isConnected: true,
        borders: null
      }
    }
  },
  box89: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 79,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 99,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 88,
        isConnected: true,
        borders: null
      }
    }
  },
  box90: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 80,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 91,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    }
  },
  box91: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 81,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 92,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 90,
        isConnected: true,
        borders: null
      }
    }
  },
  box92: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 82,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 93,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 91,
        isConnected: true,
        borders: null
      }
    }
  },
  box93: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 83,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 94,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 92,
        isConnected: true,
        borders: null
      }
    }
  },
  box94: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 84,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 95,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 93,
        isConnected: true,
        borders: null
      }
    }
  },
  box95: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 85,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 96,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 94,
        isConnected: true,
        borders: null
      }
    }
  },
  box96: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 86,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 97,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 95,
        isConnected: true,
        borders: null
      }
    }
  },
  box97: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 87,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 98,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 96,
        isConnected: true,
        borders: null
      }
    }
  },
  box98: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 88,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 99,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 97,
        isConnected: true,
        borders: null
      }
    }
  },
  box99: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 89,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 98,
        isConnected: true,
        borders: null
      }
    }
  }
}