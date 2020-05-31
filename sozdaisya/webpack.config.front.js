const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {VueLoaderPlugin} = require('vue-loader');

const NODE_ENV = process.env.NODE_ENV;
const isDevelopment = NODE_ENV === 'development';

const getPath = (folderName) => path.join(__dirname, folderName);

module.exports = {

    devtool: isDevelopment ? 'cheap-module-source-map' : 'sourcemap', //какой информации необходимо снабжать компилятор, вся инфа в скомп файл

    mode: isDevelopment ? 'development' : 'production', //режим сборки 

    entry: {
        front: getPath('./assets/app/front/App')//стартовые файлы для первичной компиляции (как main в с++)
    },

    output: {
        filename: 'app/[name]/main.js',//куда закидывать скомпилированные файлы
        path: getPath('static')
    },

    resolve: { //указывает откуда брать файлы если они импортируются 
        modules: [
            'node_modules',
            'assets/app/front/',
        ]
    },

    optimization: {},//+параметры 

    resolveLoader: {
        modules: [getPath('node_modules')]//файлы с которыми будут рабоать loaders
    },

    module: {//описываются все правила компиляции
        rules: [ // правила для файлов
            {
                test: /\.vue$/,//типы файлов
                loader: 'vue-loader',//для vue файлов
                options: {
                    loaders: {
                        js: 'babel-loader'
                    }
                }
            },
            {
                test: /\.less$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader",
                    }, {
                        loader: 'postcss-loader',//позволяет для css правил ставить браузерные префиксы
                        options: {
                            plugins: () => [autoprefixer({
                                browsers: ['ie >= 9', 'last 2 version']
                            })]
                        }
                    }, {
                        loader: "less-loader"//Less файлы преобразовывает в css
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader
                    }, {
                        loader: "css-loader"
                    }, {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer({
                                'browsers': ['>0.25%',
                                    'not ie 11',
                                    'not op_mini all']
                            })]
                        }
                    }
                ]
            },
        ]
    },

    plugins: [
        new CleanWebpackPlugin([//будет чистить всю выходную папку
            getPath('static/app/front'),
        ], {root: getPath('')}),
        new MiniCssExtractPlugin({
            filename: 'app/[name]/main.css'
        }),
        new VueLoaderPlugin()//
    ]
};