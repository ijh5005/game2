// full board
// 0  1  2  3  4  5
// 6  7  8  9  10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34 35
const lionSquares = {
  box0: [null, null, null, null, 0, 1, null, 6, 7],
  box1: [null, null, null, 0, 1, 2, 6, 7, 8],
  box2: [null, null, null, 1, 2, 3, 7, 8, 9],
  box3: [null, null, null, 2, 3, 4, 8, 9, 10],
  box4: [null, null, null, 3, 4, 5, 9, 10, 11],
  box5: [null, null, null, 4, 5, null, 10, 11, null],
  box6: [null, 0, 1, null, 6, 7, null, 12, 13],
  box7: [0, 1, 2, 6, 7, 8, 12, 13, 14],
  box8: [1, 2, 3, 7, 8, 9, 13, 14, 15],
  box9: [2, 3, 4, 8, 9, 10, 14, 15, 16],
  box10: [3, 4, 5, 9, 10, 11, 15, 16, 17],
  box11: [4, 5, null, 10, 11, null, 16, 17, null],
  box12: [null, 6, 7, null, 12, 13, null, 18, 19],
  box13: [6, 7, 8, 12, 13, 14, 18, 19, 20],
  box14: [7, 8, 9, 13, 14, 15, 19, 20, 21],
  box15: [8, 9, 10, 14, 15, 16, 20, 21, 22],
  box16: [9, 10, 11, 15, 16, 17, 21, 22, 23],
  box17: [10, 11, null, 16, 17, null, 22, 23, null],
  box18: [null, 12, 13, null, 18, 19, null, 24, 25],
  box19: [12, 13, 14, 18, 19, 20, 24, 25, 26],
  box20: [13, 14, 15, 19, 20, 21, 25, 26, 27],
  box21: [14, 15, 16, 20, 21, 22, 26, 27, 28],
  box22: [15, 16, 17, 21, 22, 23, 27, 28, 29],
  box23: [16, 17, null, 22, 23, null, 28, 29, null],
  box24: [null, 18, 19, null, 24, 25, null, 30, 31],
  box25: [18, 19, 20, 24, 25, 26, 30, 31, 32],
  box26: [19, 20, 21, 25, 26, 27, 31, 32, 33],
  box27: [20, 21, 22, 26, 27, 28, 32, 33, 34],
  box28: [21, 22, 23, 27, 28, 29, 33, 34, 35],
  box29: [22, 23, null, 28, 29, null, 34, 35, null],
  box30: [null, 24, 25, null, 30, 31, null, null, null],
  box31: [24, 25, 26, 30, 31, 32, null, null, null],
  box32: [25, 26, 27, 31, 32, 33, null, null, null],
  box33: [26, 27, 28, 32, 33, 34, null, null, null],
  box34: [27, 28, 29, 33, 34, 35, null, null, null],
  box35: [28, 29,  null, 34, 35, null, null, null, null]
}

// full board
// 0  1  2  3  4  5
// 6  7  8  9  10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34 35
const pantherSquares = {
  box0: [0, 6, 12, 18, 24, 30],
  box1: [1, 7, 13, 19, 25, 31],
  box2: [2, 8, 14, 20, 26, 32],
  box3: [3, 9, 15, 21, 27, 33],
  box4: [4, 10, 16, 22, 28, 34],
  box5: [5, 11, 17, 23, 29, 35],
  box6: [0, 6, 12, 18, 24, 30],
  box7: [1, 7, 13, 19, 25, 31],
  box8: [2, 8, 14, 20, 26, 32],
  box9: [3, 9, 15, 21, 27, 33],
  box10: [4, 10, 16, 22, 28, 34],
  box11: [5, 11, 17, 23, 29, 35],
  box12: [0, 6, 12, 18, 24, 30],
  box13: [1, 7, 13, 19, 25, 31],
  box14: [2, 8, 14, 20, 26, 32],
  box15: [3, 9, 15, 21, 27, 33],
  box16: [4, 10, 16, 22, 28, 34],
  box17: [5, 11, 17, 23, 29, 35],
  box18: [0, 6, 12, 18, 24, 30],
  box19: [1, 7, 13, 19, 25, 31],
  box20: [2, 8, 14, 20, 26, 32],
  box21: [3, 9, 15, 21, 27, 33],
  box22: [4, 10, 16, 22, 28, 34],
  box23: [5, 11, 17, 23, 29, 35],
  box24: [0, 6, 12, 18, 24, 30],
  box25: [1, 7, 13, 19, 25, 31],
  box26: [2, 8, 14, 20, 26, 32],
  box27: [3, 9, 15, 21, 27, 33],
  box28: [4, 10, 16, 22, 28, 34],
  box29: [5, 11, 17, 23, 29, 35],
  box30: [0, 6, 12, 18, 24, 30],
  box31: [1, 7, 13, 19, 25, 31],
  box32: [2, 8, 14, 20, 26, 32],
  box33: [3, 9, 15, 21, 27, 33],
  box34: [4, 10, 16, 22, 28, 34],
  box35: [5, 11, 17, 23, 29, 35]
}

// full board
// 0  1  2  3  4  5
// 6  7  8  9  10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34 35
const cheetahSquares = {
  box0: [0, 1, 2, 3, 4, 5],
  box1: [0, 1, 2, 3, 4, 5],
  box2: [0, 1, 2, 3, 4, 5],
  box3: [0, 1, 2, 3, 4, 5],
  box4: [0, 1, 2, 3, 4, 5],
  box5: [0, 1, 2, 3, 4, 5],
  box6: [6, 7, 8, 9, 10, 11],
  box7: [6, 7, 8, 9, 10, 11],
  box8: [6, 7, 8, 9, 10, 11],
  box9: [6, 7, 8, 9, 10, 11],
  box10: [6, 7, 8, 9, 10, 11],
  box11: [6, 7, 8, 9, 10, 11],
  box12: [12, 13, 14, 15, 16, 17],
  box13: [12, 13, 14, 15, 16, 17],
  box14: [12, 13, 14, 15, 16, 17],
  box15: [12, 13, 14, 15, 16, 17],
  box16: [12, 13, 14, 15, 16, 17],
  box17: [12, 13, 14, 15, 16, 17],
  box18: [18, 19, 20, 21, 22, 23],
  box19: [18, 19, 20, 21, 22, 23],
  box20: [18, 19, 20, 21, 22, 23],
  box21: [18, 19, 20, 21, 22, 23],
  box22: [18, 19, 20, 21, 22, 23],
  box23: [18, 19, 20, 21, 22, 23],
  box24: [24, 25, 26, 27, 28, 29],
  box25: [24, 25, 26, 27, 28, 29],
  box26: [24, 25, 26, 27, 28, 29],
  box27: [24, 25, 26, 27, 28, 29],
  box28: [24, 25, 26, 27, 28, 29],
  box29: [24, 25, 26, 27, 28, 29],
  box30: [30, 31, 32, 33, 34, 35],
  box31: [30, 31, 32, 33, 34, 35],
  box32: [30, 31, 32, 33, 34, 35],
  box33: [30, 31, 32, 33, 34, 35],
  box34: [30, 31, 32, 33, 34, 35],
  box35: [30, 31, 32, 33, 34, 35]
}

// full board
// 0  1  2  3  4  5
// 6  7  8  9  10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34 35
// helper numbers
// 0, 1, 2, 3, 4, 5,
// 6, 7, 8, 9, 10, 11,
// 12, 13, 14, 15, 16, 17,
// 18, 19, 20, 21, 22, 23,
// 24, 25, 26, 27, 28, 29,
// 30, 31, 32, 33, 34, 35,
// 0, 6, 12, 18, 24, 30,
// 1, 7, 13, 19, 25, 31,
// 2, 8, 14, 20, 26, 32,
// 3, 9, 15, 21, 27, 33,
// 4, 10, 16, 22, 28, 34,
// 5, 11, 17, 23, 29, 35,
const queen_makedaSquares = {
  box0:  [0 , 1 , 2 , 3 , 4 , 5 , 0 , 6 , 12, 18, 24, 30],
  box1:  [0 , 1 , 2 , 3 , 4 , 5 , 1 , 7 , 13, 19, 25, 31],
  box2:  [0 , 1 , 2 , 3 , 4 , 5 , 2 , 8 , 14, 20, 26, 32],
  box3:  [0 , 1 , 2 , 3 , 4 , 5 , 3 , 9 , 15, 21, 27, 33],
  box4:  [0 , 1 , 2 , 3 , 4 , 5 , 4 , 10, 16, 22, 28, 34],
  box5:  [0 , 1 , 2 , 3 , 4 , 5 , 5 , 11, 17, 23, 29, 35],
  box6:  [6 , 7 , 8 , 9 , 10, 11, 0 , 6 , 12, 18, 24, 30],
  box7:  [6 , 7 , 8 , 9 , 10, 11, 1 , 7 , 13, 19, 25, 31],
  box8:  [6 , 7 , 8 , 9 , 10, 11, 2 , 8 , 14, 20, 26, 32],
  box9:  [6 , 7 , 8 , 9 , 10, 11, 3 , 9 , 15, 21, 27, 33],
  box10: [6 , 7 , 8 , 9 , 10, 11, 4 , 10, 16, 22, 28, 34],
  box11: [6 , 7 , 8 , 9 , 10, 11, 5 , 11, 17, 23, 29, 35],
  box12: [12, 13, 14, 15, 16, 17, 0 , 6 , 12, 18, 24, 30],
  box13: [12, 13, 14, 15, 16, 17, 1 , 7 , 13, 19, 25, 31],
  box14: [12, 13, 14, 15, 16, 17, 2 , 8 , 14, 20, 26, 32],
  box15: [12, 13, 14, 15, 16, 17, 3 , 9 , 15, 21, 27, 33],
  box16: [12, 13, 14, 15, 16, 17, 4 , 10, 16, 22, 28, 34],
  box17: [12, 13, 14, 15, 16, 17, 5 , 11, 17, 23, 29, 35],
  box18: [18, 19, 20, 21, 22, 23, 0 , 6 , 12, 18, 24, 30],
  box19: [18, 19, 20, 21, 22, 23, 1 , 7 , 13, 19, 25, 31],
  box20: [18, 19, 20, 21, 22, 23, 2 , 8 , 14, 20, 26, 32],
  box21: [18, 19, 20, 21, 22, 23, 3 , 9 , 15, 21, 27, 33],
  box22: [18, 19, 20, 21, 22, 23, 4 , 10, 16, 22, 28, 34],
  box23: [18, 19, 20, 21, 22, 23, 5 , 11, 17, 23, 29, 35],
  box24: [24, 25, 26, 27, 28, 29, 0 , 6 , 12, 18, 24, 30],
  box25: [24, 25, 26, 27, 28, 29, 1 , 7 , 13, 19, 25, 31],
  box26: [24, 25, 26, 27, 28, 29, 2 , 8 , 14, 20, 26, 32],
  box27: [24, 25, 26, 27, 28, 29, 3 , 9 , 15, 21, 27, 33],
  box28: [24, 25, 26, 27, 28, 29, 4 , 10, 16, 22, 28, 34],
  box29: [24, 25, 26, 27, 28, 29, 5 , 11, 17, 23, 29, 35],
  box30: [30, 31, 32, 33, 34, 35, 0 , 6 , 12, 18, 24, 30],
  box31: [30, 31, 32, 33, 34, 35, 1 , 7 , 13, 19, 25, 31],
  box32: [30, 31, 32, 33, 34, 35, 2 , 8 , 14, 20, 26, 32],
  box33: [30, 31, 32, 33, 34, 35, 3 , 9 , 15, 21, 27, 33],
  box34: [30, 31, 32, 33, 34, 35, 4 , 10, 16, 22, 28, 34],
  box35: [30, 31, 32, 33, 34, 35, 5 , 11, 17, 23, 29, 35]
}

// full board
// 0  1  2  3  4  5
// 6  7  8  9  10 11
// 12 13 14 15 16 17
// 18 19 20 21 22 23
// 24 25 26 27 28 29
// 30 31 32 33 34 35
const template = {
  box0: [],
  box1: [],
  box2: [],
  box3: [],
  box4: [],
  box5: [],
  box6: [],
  box7: [],
  box8: [],
  box9: [],
  box10: [],
  box11: [],
  box12: [],
  box13: [],
  box14: [],
  box15: [],
  box16: [],
  box17: [],
  box18: [],
  box19: [],
  box20: [],
  box21: [],
  box22: [],
  box23: [],
  box24: [],
  box25: [],
  box26: [],
  box27: [],
  box28: [],
  box29: [],
  box30: [],
  box31: [],
  box32: [],
  box33: [],
  box34: [],
  box35: [],
}
