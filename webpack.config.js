var path = require("path");
var webpack = require('webpack');

if (process.argv[2])
    var PROD = true

module.exports = {
    entry: {
        Pan: "./src/pan.class.js"
    },

    output: {
        path: path.join(__dirname, "builds"),
        filename: PROD ? "[Name].min.js" : "[name].js",
        library: ["[name]"],
        libraryTarget: "umd"
    },
    externals: {
        "P": "Pan"
    },

    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015']
                }
            }
        ]
    },

    plugins: PROD ? [
        new webpack.optimize.UglifyJsPlugin({ minimize: true })
    ] : []
};