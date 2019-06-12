'use strict';

var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var ManifestPlugin = require('webpack-manifest-plugin');
var fs = require('fs');
var isProduction = process.env.NODE_ENV == 'production';
var COMMON_SRC = path.join(__dirname, 'app/src/common/components/');
var COMMON_JS_SRC = path.join(__dirname, 'app/src/common/js/');
var NODE_MODULES = path.join(__dirname, 'node_modules/');
var COMMON_STYLES = path.join(__dirname, 'app/src/common/styles/');

var plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
    new ExtractTextPlugin("[name].css"),
    new ManifestPlugin()
];

var loaders = [{
    test: /\.jsx?$/,
    loaders: ['babel-loader'],
    exclude: NODE_MODULES
},
    {
        test: /\.css$/,
        loader: "style-loader!css-loader",
    },
    {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader",
    },
    {
        test: /\.scss$/,
        loader: 'style-loader!css-loader!sass-loader',
    },
    {
        test: /\.(jpe?g|gif|png|svg)$/i,
        loader: 'url-loader',
    }
];

var watch = true;
var output;

if (isProduction) {
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            compressor: {
                screw_ie8: true,
                warnings: false
            }
        }),
        new ExtractTextPlugin("[name].[chunkhash].css")
    );
    watch = false;
    output = {
        path: path.join(__dirname, 'app/dist/public/'),
        filename: '[name].[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js'
    }
} else {
    plugins.push(
        new ExtractTextPlugin("[name].bundle.css")
    );
    output = {
        path: path.join(__dirname, 'app/dist/public/'),
        filename: '[name].bundle.js'
    }
}

var config = {
    module: {
        loaders: loaders
    },
    watch: watch,
    entry: {
        main: ['./app/src/root/main.jsx'],
        login: ['./app/src/root/login.jsx'],

    },
    output: output,
    plugins: plugins,
    resolve: {
        extensions: ['', '.js', '.jsx', '.less','.css'],
        root: [COMMON_SRC, COMMON_JS_SRC, COMMON_STYLES]
    }
};

module.exports = config;
