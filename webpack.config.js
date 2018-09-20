const path = require('path');
const TSLintPlugin = require('tslint-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/pkchart.js',
    devtool: 'inline-source-map',
    module: {
        rules: [{
            test: /\.ts?$/,
            use: 'ts-loader',
            exclude: /node_modules/
        }]
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    output: {
        filename: 'pkchart.js',
        path: path.resolve(__dirname, 'dist'),
        library: 'pkchart'
    },
    plugins: [
        new TSLintPlugin({
            files: ['./src/**/*.ts']
        }),
        new CopyWebpackPlugin([{
            from: 'index.html',
            to: './',
            force: true
        }, {
            from: 'pkchart.css',
            to: './',
            force: true
        }])
    ]
};