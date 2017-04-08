var path = require("path");
var webpack = require('webpack');

// var PROD = JSON.parse(process.env.PROD_ENV || '0');
var PROD = 1;

module.exports = {
    entry: {
        Pan: "./src/pan.class.ts"
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

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },


    module: {
        loaders: [
            {
                test: /\.ts(x?)$/,
                loader: "babel-loader?presets[]=es2015!ts-loader"
            },
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