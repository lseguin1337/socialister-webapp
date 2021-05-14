const HtmlWebpackPlugin = require('html-webpack-plugin');
const autoPreprocess = require('svelte-preprocess');
const { join } = require('path');

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: {
    'app': join(__dirname, 'src/main.ts'),
  },
  devServer: {
    contentBase: join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts$/,
        use: 'ts-loader',
      },
      {
        exclude: /node_modules/,
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            hotReload: true,
            preprocess: autoPreprocess()
          }
        }
      }
    ],
  },
  resolve: {
    extensions: ['.ts', '.svelte', '.mjs', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      chunks: ['app'],
    }),
  ]
};