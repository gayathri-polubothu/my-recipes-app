const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require("path");
const nodeExternals = require('webpack-node-externals')


const isomorphicRules = [
    {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
            loader: "babel-loader",
            options: {
                presets: ["@babel/preset-env", ["@babel/preset-react", {runtime: "automatic"}]],
            }
        },
    },
    {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ]
    },
    {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['file-loader']
    }
]

const server = {
    name: "server",
    target: "node",
    entry: "./server/src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "server.min.js"
    },
    externals: [nodeExternals()],
    module: {
        rules:  [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", ["@babel/preset-react", {runtime: "automatic"}]],
                    }
                },
            },
        ]
    }
}
const client = {
    target: "web",
    entry: "./client/src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.min.js"
    },
    devServer: {
        proxy: {
            '/api': {
                target: 'http://locahost:3040'
            }
        }
    },
    plugins: [new HtmlWebpackPlugin({ template: 'client/public/index.html' })],
    // pass all js files through Babel
    resolve: {
        extensions: ['.js', '.jsx'],
        // alias: {
        //     src: path.resolve(__dirname, './client/src/')
        // },
    },
    module: {
        rules: isomorphicRules
    },
    // externals: {
    //     "react": "React"
    // },
};
module.exports = [server, client]