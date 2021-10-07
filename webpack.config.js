const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development',  
  entry: path.resolve(__dirname, './client/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: ['style-loader', 'css-loader', 'sass-loader']
      }
    ]
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'client')
    },
    compress: true,
    port: 8080,
    proxy: {
      '/api/*': 'http://localhost:3000',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html',
      filename: 'index.html'
    })
  ],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};