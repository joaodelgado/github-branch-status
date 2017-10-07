const path = require('path');

const WebpackShellPlugin = require('webpack-shell-plugin');

const options = {
    entry: {
        client: path.join(__dirname, 'src', 'js', 'client.js'),
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].bundle.js',
    },
    plugins: [
        new WebpackShellPlugin({
            onBuildBuildStart: ['node ./utils/generate-manifest.js'],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|vue)$/,
                enforce: 'pre',
                exclude: /node_modules/,
                loader: 'eslint-loader',
            },
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
};

module.exports = options;

