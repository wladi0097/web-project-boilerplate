const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const merge = require('webpack-merge');
const {src_Path} = require('./path');
const common = require('./webpack.common.js');

module.exports = merge(common, {
    devtool: 'source-map',
    devServer: {
        open: true,
    },
    module: {
        rules: [{
            test: /\.(scss|css)$/,
            use: [
                {
                    loader: MiniCssExtractPlugin.loader
                },
                {
                    loader: 'css-loader',
                    options: {
                        modules: false,
                        sourceMap: true
                    }
                },
                {
                    loader: 'postcss-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: false,
            template: './' + src_Path + '/index.html',
            filename: 'index.html'
        })
    ]
});
