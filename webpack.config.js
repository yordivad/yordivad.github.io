
const path = require('path');

module.exports = {
    mode: 'development',
    entry: './assets/ts/main.ts',
    target: ['web'],
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: path.resolve(__dirname, "node_modules"),
            },
            {
                test: /\.s(a|c)ss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'sass-loader',
                        options: {
                        },
                    },

                ],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.scss'],
        alias: {
            "@lambda": path.resolve(__dirname, "assets")
        }
    },
};