const path = require('path')

module.exports = {
  entry: {
    app: path.join(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(__dirname, '../dist'),
    publicPath: '/'
  },
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.js$/,
        loader: ['babel-loader']
      },
      {
        exclude: /node_modules/,
        test: /\.(s*)css$/,
        loader:['style-loader','css-loader', 'sass-loader']
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        include: path.resolve(__dirname, '../src/assets/image/'),
        use: ['file-loader']
      },
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        include: path.resolve(__dirname, '../src/assets/font/'),
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 1000,
              mimetype: 'application/font-woff'
            }
          }
        ]
      }
    ]
  }
}