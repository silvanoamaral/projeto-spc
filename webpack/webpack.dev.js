const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const common = require('./webpack.common.js')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    historyApiFallback: true,
    port: 8002,
    proxy: {
      '/api': {
        target: 'http://localhost:5002'
      }
    }
  },
  plugins: [
    new HtmlWebpackPlugin ({
      title: 'Development Title',
      template:path.join(__dirname, '../public/index.html'),
      inject: true
    })
  ]
})