// var path = require("path");
// var webpack = require('webpack');

// var PROD = JSON.parse(process.env.PROD_ENV || '0');

// module.exports = {
//     entry: {
//         Pan: "./src/pan.class.js"
// 	},

//     output: {
// 		path: path.join(__dirname, "builds"),
// 		filename: PROD ? "[Name].min.js" : "[name].js",
//         library: ["[name]"],
// 		libraryTarget: "umd"
// 	},
//     externals: {
//         // require("jquery") is external and available
//         //  on the global var jQuery
//         "P": "Pan"
//     },

//     module: {
//         loaders: [
//             {
//                 test: /\.js$/,
//                 exclude: /(node_modules|bower_components)/,
//                 loader: 'babel-loader',
//                 query: {
//                     presets: ['es2015']
//                 }
//             }
//         ]
//     },

//     plugins: PROD ? [
//         new webpack.optimize.UglifyJsPlugin({ minimize: true })
//     ] : []
// };

var path = require("path");
var webpack = require('webpack');

// var PROD = JSON.parse(process.env.PROD_ENV || '0');
var PROD = 1;

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
        // require("jquery") is external and available
        //  on the global var jQuery
        "P": "Pan"
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },


    module: {
        loaders: [
            // {
            //     test: /\.tsx$/,
            //     exclude: /(node_modules|bower_components)/,
            //     loader: 'ts-loader',
            // }

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