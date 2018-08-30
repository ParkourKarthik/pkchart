const path = require('path');

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
    }
};