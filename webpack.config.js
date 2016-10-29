var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var a  = new ExtractTextPlugin('dist/aa.css');

module.exports = {
    entry: {
        app: ['./js/app.js',
            './js/controller.js',
            './js/action/VendingMachineAction.js',
            './js/store/ScreenStore.js',
            './js/directives/controlPadComponent.js',
            './js/directives/productImageDirective.js',
            './js/flowLogger.js'
        ]
    },
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "dist"),
        filename: "./bundle.js"
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint-loader'
            },
        ],
        loaders: [
            {
                test: /\.less$/,
                loader: a.extract(['css','less'])
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel', // 'babel-loader' is also a valid name to reference
                query: {
                    presets: ['es2015']
                }
            }
        ]
    }
}