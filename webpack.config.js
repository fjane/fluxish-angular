var path = require('path');
var webpack = require('webpack');
plugins: [
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            screw_ie8: true,
            warnings: false
        }
    })
]

module.exports = {
    entry: {
        app: ['./js/app.js', './js/controller.js', './js/action/VendingMachineAction.js', './js/store/CounterStore.js', './js/store/ScreenStore.js']
    },
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
                loader: "style!css!less"
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
    }/*,
    plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                screw_ie8: true,
                warnings: false
            }
        })
    ]*/
}