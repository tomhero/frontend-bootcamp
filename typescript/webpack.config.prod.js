const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/drag-drop-project/drag-drop-app.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/drag-drop-project')
    },
    devtool: 'none',
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
    plugins: [
        new CleanPlugin.CleanWebpackPlugin()
    ]
}