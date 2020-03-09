const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/google-maps-project/script.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/google-maps-project'),
        publicPath: 'dist/google-maps-project'
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
        index: path.resolve(__dirname, 'src/google-maps-project/share-lo-ma.html'),
        open: true,
        openPage: 'src/google-maps-project/share-lo-ma.html'
    }
}