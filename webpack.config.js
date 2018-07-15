var path = require('path');
var webpack = require('webpack');
var LiveReloadPlugin = require('webpack-livereload-plugin');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const CleanPlugin = require('clean-webpack-plugin');
var PROD = JSON.parse(process.env.PROD || '0');
;
//var PROD=1
module.exports = {
    context: __dirname + "/client",
    entry: {
        javascript: "./app.js"
    },
    debug: (PROD) ? false : true,
    //devtool: (PROD) ? "eval" : 'source-map',

    output: {
        //path: __dirname,
        path: path.join(__dirname, './public'),
        filename: "bundle.js"
    },
    module: {

        loaders: [
            // {
            //    test: /\.css$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader")
            //},
            //{
            //    test: /\.less$/,
            //    loader: ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")
            //},
            { test: /\.css$/, loader: "style!css" },
            { test: /\.less$/,loader: "style!css!less"
            },
            // the url-loader uses DataUrls. 
            // the file-loader emits files. 
            { test: /\.(woff|woff2)$/, loader: "url-loader?limit=10000&mimetype=application/font-woff" },
            { test: /\.ttf$/, loader: "file-loader" },
            { test: /\.eot$/, loader: "file-loader" },
            { test: /\.svg$/, loader: "file-loader" },
            {
                test: /.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: (PROD) ? [
        //new webpack.optimize.DedupePlugin(),
        //new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            minimize: true,
            output: {
                comments: false
            },
            compress: {
                warnings: false
            }
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify('production')
            },
            PROD: PROD
        })
    ] : [
            new webpack.ProvidePlugin({
                $: "jquery",
                jQuery: "jquery",
                "window.jQuery": "jquery"
            }),
            new LiveReloadPlugin(), // <script src="http://localhost:35729/livereload.js"></script>  
            new webpack.DefinePlugin({

                PROD: PROD

            })

        ]
};
