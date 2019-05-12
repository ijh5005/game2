var webpack = require('webpack');
const path = require("path");

const config = {
  entry: ["babel-polyfill", "./js/app.js"],
  output: {
    path: path.resolve(__dirname, "bundle"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        use: "babel-loader",
        test: /\.js$/
      }
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      level1: "./gameBoards/level1.js",
      level2: "./gameBoards/level2.js",
      level3: "./gameBoards/level3.js",
      level4: "./gameBoards/level4.js",
      level5: "./gameBoards/level5.js",
      level6: "./gameBoards/level6.js",
      level7: "./gameBoards/level7.js",
      level8: "./gameBoards/level8.js",
      level9: "./gameBoards/level9.js",
      level10: "./gameBoards/level10.js",
      ui: "./ui.js",
      whoClickTheLine: "./whoClickTheLine.js",
      settings: "./settings.js",
      soundEffects: "./soundEffects.js",
      lineClickAction: "./lineClickAction.js",
      computerMove: "./computerMove.js",
      task: "./task.js",
      boxInfo: "./boxInfo.js",
      bomb: "./bomb.js",
      lockBoxes: "./lockBoxes.js",
      animalExplosions: "./animalExplosions.js",
      boardText: "./boardText.js",
      animalExplosionSquares: "./animalExplosionSquares.js",
      helpTextArray: "./helpTextArray.js",
      app: "./app.js",
      track: "./track.js"
    })
  ]
}

module.exports = config;
