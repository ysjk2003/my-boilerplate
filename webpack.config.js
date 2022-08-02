const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path')

const mode = process.env.NODE_ENV || 'development';

module.exports = {
    mode: mode,
    entry: {
        main: './src/index.ts'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.css$/ ,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader'
                ]
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    publicPath: './dist/',
                    name: '[name].[ext]?[hash]',
                    limit: 20000,
                }
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
            },
        ]
    },
    devServer: {
        port: 3001,
        client: {
          overlay: {
            errors: true,
            warnings: false,
          },
        },
        hot: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './public/index.html',
            minify:
              mode === 'production'
                ? {
                    collapseWhitespace: true,
                    removeComments: true,
                  }
                : false,
          }),
          ...(mode === 'production'
            ? [new MiniCssExtractPlugin({ filename: `[name].css` }), new webpack.HotModuleReplacementPlugin()]
            : []),
          new MiniCssExtractPlugin(),
          new CleanWebpackPlugin(),
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
}