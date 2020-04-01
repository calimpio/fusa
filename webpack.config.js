const path = require('path');
const isDev = true;

module.exports = {
    entry: './src/app.js',
    output: {
        filename: 'app.js',
        path: path.resolve(__dirname, 'dist')
    },    
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-react']
                  }
                }
            }
        ]
    },    
}