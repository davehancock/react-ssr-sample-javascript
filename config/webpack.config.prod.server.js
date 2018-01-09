'use strict';

const webpack = require('webpack');
const eslintFormatter = require('react-dev-utils/eslintFormatter');
const paths = require('./paths');

module.exports = [
    {
        bail: true,
        entry: {
            server: [paths.appServerJs]
        },
        output: {
            path: paths.appServerBuild,
            filename: '[name].js',
            chunkFilename: '[name].[chunkhash:8].chunk.js',
        },
        module: {
            strictExportPresence: true,
            rules: [
                {
                    test: /\.(js|jsx)$/,
                    enforce: 'pre',
                    use: [
                        {
                            options: {
                                formatter: eslintFormatter,
                            },
                            loader: require.resolve('eslint-loader'),
                        },
                    ],
                    include: paths.appSrc,
                },
                {
                    test: /\.(js|jsx)$/,
                    exclude: [/node_modules/, /react-build/],
                    loader: require.resolve('babel-loader'),
                    options: {
                        compact: true,
                        presets: ['react']
                    },
                },
            ],
        },
        plugins: [
            new webpack.optimize.UglifyJsPlugin({
                compress: {
                    warnings: false,
                    comparisons: false,
                },
                output: {
                    comments: false,
                    ascii_only: true,
                },
            }),
        ],
        target: 'node',
        node: {
            dgram: 'empty',
            fs: 'empty',
            net: 'empty',
            tls: 'empty',
        },
    }
];
