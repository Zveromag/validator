var webpack = require("webpack");
module.exports = {
  entry: {
    validator: "./src/validator.js"
  },
  output: {
    path: __dirname + "/dist/",
    filename: "[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "env"
            ]
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({})
  ]
}
