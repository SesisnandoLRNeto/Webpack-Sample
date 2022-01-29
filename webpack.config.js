const modeDev = process.env.NODE_ENV !== 'production'; // through the plugin cross-env this variable is setted

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// It is deprecated due compactibility problems with ECMS 6
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

// const TerserPlugin = require('terser-webpack-plugin'); // it was substituted the UglifyJs plugin
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = {
  mode: modeDev ? 'development' : 'production', // if production the file generated must be minified in oneline
  entry: './src/main.js',
  devServer: {
    contentBase: './public',
    port: 9000,
  },
  output: {
    filename: 'main.js',
    path: __dirname + '/public', //dirname will appoint to root folder
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
      }),
      // new TerserPlugin({
      //   parallel: true,
      //   terserOptions: {
      //     ecma: 6,
      //   },
      // }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'style.css',
    }),
  ],
  module: {
    rules: [
      {
        // test: /\.css$/,// only css file in this case
        test: /\.s?[ac]ss$/, // scss, sass and css files
        use: [
          // 'style-loader', // Inject the tag <style> add the css files in DOM
          MiniCssExtractPlugin.loader, // In this case the css file is externalized in a file
          'css-loader', // @import, url() are interpreted
          'sass-loader',
        ],
      },
      {
        test: /\.(png|jpg|svg|gif)$/,
        use: ['file-loader'],
      },
    ],
  },
};
