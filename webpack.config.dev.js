/* eslint linebreak-style: ["error", "windows"] */

const path = require('path');
const webpack = require('webpack');

module.exports = {
    entry: [
        'webpack-hot-middleware/client',
        path.join(__dirname, './client/index.js')
    ],
    output: {
        filename: 'bundle.js',
        path: __dirname,
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                include: path.join(__dirname, 'client'),
                loaders: ['react-hot-loader/webpack', 'babel-loader']
            },
            {
                test: /\.scss$/,
                loaders: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.css$/,
                loader: "style-loader!css-loader"
              },
        ]
    },
    resolve: {
        extensions: [ '.js' ]
    },
    node: {
        net: 'empty',
        dns: 'empty'
    }
};