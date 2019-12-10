const path = require("path");

module.exports = {
  entry: "./src/index.js", // Your starting input file
  output: {
    filename: "main.js", // Your output filename
    path: path.resolve(__dirname, "./public/assets"), // Output file path
    publicPath: "/assets/" // Folder where all Webpack generated code will go
  },
  module: {
    rules: [
      {
        // Using Babel to support Internet Explorer and other legacy browsers
        test: /\.js$/i,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
      {
        // SASS
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    port: 7000, // Optional
    publicPath: "/assets/", // Folder where all Webpack generated code will go
    contentBase: path.resolve(__dirname, "./public"), // Folder that has your index.html file
    watchContentBase: true // Makes it so the browser will refresh when you make changes to the index.html file too
  }
};
