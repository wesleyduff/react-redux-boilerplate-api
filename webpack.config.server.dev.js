const path = require('path')
const webpack = require('webpack')
const nodeExternals = require('webpack-node-externals');

process.env.NODE_ENV = "development";

module.exports = {
  entry: {
    server: './tools/apiServer.js',
  },
  devtool: "source-map",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: '/',
    filename: '[name].js'
  },
  target: 'web',
  node: {
    // Need this when working with express, otherwise the build fails
    __dirname: false,   // if you don't put this is, __dirname
    __filename: false,  // and __filename return blank or /
  },
  externals: [nodeExternals()], // Need this to avoid error when working with Express
  plugins: [
    new webpack.DefinePlugin({
      "process.env.API_URL": JSON.stringify("http://localhost:3001"),
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
  ],
  resolve: {
    alias: {
      api: path.resolve(__dirname, 'src/api/')
    }
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader", "eslint-loader"]
      },
      {
        test: /(\.css)$/,
        use: ["style-loader", "css-loader"]
      },
      {
        // Loads the javacript into html template provided.
        // Entry point is set below in HtmlWebPackPlugin in Plugins
        test: /\.html$/,
        use: [{loader: "html-loader"}]
      }
    ]
  }
}
