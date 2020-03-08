const path = require('path');

module.exports = {
    mode: 'development',
    entry: './src/drag-drop-project/drag-drop-app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/drag-drop-project'),
        publicPath: 'dist/drag-drop-project'
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
        index: path.resolve(__dirname, 'src/drag-drop-project/drag-and-drop.html'),
        open: true,
        openPage: 'src/drag-drop-project/drag-and-drop.html'
    }
}