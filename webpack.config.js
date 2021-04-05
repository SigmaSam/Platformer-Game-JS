const path = require('path');

module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.(png|jpeg|wav|psd)$/,
        use: 'file-loader',
      },
    ],
  },
  devServer: {
    contentBase: './dist',
  },
};