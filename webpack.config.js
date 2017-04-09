var path = require("path");
var webpack = require('webpack');

var PROD = false;

for (let arg of process.argv) {
    if (arg == '--env') {
        PROD = true;
    }
}

module.exports = {
    entry: {
        Pan: "./src/pan.class.ts"
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