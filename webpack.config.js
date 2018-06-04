const path = require('path');

module.exports = [{
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'pan.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd"
  }
},
{
  entry: './src/scroll.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ]
  },
  output: {
    filename: 'panscroll.js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: "umd"
  }
}];