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
      whoClickTheLine: "./whoClickTheLine.js",
      settings: "./settings.js",
      animalExplosionSquares: "./animalExplosionSquares.js",
      helpTextArray: "./helpTextArray.js"
    })
  ]
}

module.exports = config;
