const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/share-loma-project/script.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/share-loma-project'),
        publicPath: 'dist/share-loma-project'
    },
    devtool: 'inline-source-map',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        // Auto complete file extension when import .js .ts file internally
        extensions: ['.ts', '.js']
    },
    devServer: {
        index: path.resolve(__dirname, 'src/share-loma-project/share-lo-ma.html'),
        open: true,
        openPage: 'src/share-loma-project/share-lo-ma.html'
    }
}