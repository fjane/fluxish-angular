var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: {
        app: ['./src/app.js'
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