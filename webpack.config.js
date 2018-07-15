const path = require('path');
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath:'/dist/',
    filename: 'js/app.js'
  },
  module: {
    rules:[
      //jsx
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use:{
          loader: 'babel-loader', 
          options: {
            presets: ['env','react']
          }
        }
      },
      //css
       {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      //sass
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      //图片
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      },
      //字体
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name:'resource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins:[
    //处理html文件
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    }),
    //独立CSS文件
    new ExtractTextPlugin("css/[name].css"),
    //提出公共模块的插件
    new webpack.optimize.CommonsChunkPlugin({
      name:'common',
      filename:'js/base.js'
    })
  ],
  devServer: {
    port:8086
  }
};