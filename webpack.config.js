const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const path = require('path');
const srcPath = path.join(__dirname, 'src');
const distPath = path.join(__dirname, 'dist');

const sassLoaders = [
    'css-loader',
    'postcss-loader',
    /*'resolve-url',*/
    'sass-loader?includePaths[]=' + srcPath
];

module.exports = {
    target: 'web',
    cache: true,
    debug: true,
    /*devtool: 'eval',*/
    entry: {
        app: path.join(srcPath, 'index.js'),
        common: ['react', 'react-dom', 'lodash', 'classnames']
    },
    resolve: {
        root: srcPath,
        extensions: ['', '.js', '.jsx', '.scss'],
        modulesDirectories: ['node_modules', 'src']
    },
    output: {
        path: distPath,
        publicPath: '/',
        filename: '[name].js',
        pathInfo: true
    },

    module: {
        loaders: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.scss?$/,
                loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
            }
        ]
    },
    plugins: [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.UglifyJsPlugin(),
        new ExtractTextPlugin('[name].css'),
        new webpack.optimize.CommonsChunkPlugin('common', 'common.js'),
        new HtmlWebpackPlugin({
            inject: true,
            template: 'src/index.html'
        }),
        new webpack.NoErrorsPlugin()
    ],
    eslint: {
        configFile: '.eslintrc'
    },
    postcss: [
        autoprefixer({
            browsers: ['last 2 versions']
        })
    ],
    devServer: {
        contentBase: distPath,
        historyApiFallback: true
    }
};
