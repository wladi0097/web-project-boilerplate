const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const common = require('./webpack.common.js');
const merge = require('webpack-merge');
const {prod_Path, src_Path} = require('./path');

module.exports = merge(common, {
    module: {
        rules: [
            {
                test: /\.(scss|css)$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader'
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(path.resolve(__dirname, prod_Path), {
            root: process.cwd()
        }),
        new MiniCssExtractPlugin({
            filename: 'style.[contenthash].css'
        }),
        new HtmlWebpackPlugin({
            inject: false,
            hash: true,
            template: './' + src_Path + '/index.html',
            filename: 'index.html'
        }),
        new WebpackMd5Hash()
    ]
});
