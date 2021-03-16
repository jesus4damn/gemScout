const path = require("path");
const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const autoprefixer = require('autoprefixer')
const ImageminPlugin = require("imagemin-webpack-plugin").default;

const isDev = process.env.NODE_ENV === 'development';

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all'
    }
  }

  if (!isDev) {
    config.minimize = true;
    config.minimizer = [
        new TerserWebpackPlugin(),
        new OptimizeCssAssetsWebpackPlugin()
    ]
  }
  return config;
}

const filename = ext => isDev ? `[name].${ext}` : `[name].[hash].${ext}`

module.exports = {
  context: path.resolve(__dirname, "src"),
  devtool: isDev ? 'source-map' : false,
  entry: {
    main: ["@babel/polyfill", "./index.tsx"]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: filename('js')
  },
  resolve: {
    extensions: ['.js', '.json', '.jsx', '.ts', '.tsx']
  },
  optimization: optimization(),
  devServer: {
    inline: true,
    port: 3000,
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        },
      },
      {
        test: /\.(ts|tsx)?$/,
        exclude: '/node_modules/',
        use: {
          loader: 'ts-loader'
        }
      },
      {
        test: /\.(sc|sa|c)?ss$/,
        exclude: '/node_modules/',
        use: [
          isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              sourceMap: isDev
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  autoprefixer({
                    browsers:['ie >= 11', 'last 4 version']
                  }),
                  [
                    'postcss-preset-env',
                    {
                      browsers: 'last 4 versions'
                    },
                  ],
                ]
              },
              sourceMap: isDev
            }
          },
          {
            loader: 'sass-loader',
                options: {
                sourceMap: isDev
              }
          }
        ]
      },
      {
        test: /\.(png|jpe?g|gif|svg|ico|ttf|woff|woff2|eot)$/,
        use: ["file-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: !isDev
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          context: path.resolve(__dirname),
          from: 'src/assets/favicon.ico',
          to: 'favicon.ico'
        },
        {
          context: path.resolve(__dirname),
          from: 'src/assets/manifest.json',
          to: 'manifest.json'
        }
      ]
    }),
    new MiniCssExtractPlugin({
      filename: isDev ? '[name].css' : '[name].[hash].css',
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ImageminPlugin({
      test: /\.(png|jpe?g|gif|svg)$/,
      disable: isDev,
      pngquant: {
        quality: '95-100'
      }
    })
  ]
};
