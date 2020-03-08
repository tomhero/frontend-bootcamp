const path = require('path');
const CleanPlugin = require('clean-webpack-plugin');

module.exports = {
    mode: 'production',
    entry: './src/typescript-with-3rdparty/use-3rdparty.ts',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist/typescript-with-3rdparty')
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