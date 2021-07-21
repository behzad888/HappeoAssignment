const path = require('path');

module.exports = (env) => {
  const isProd = env.production;

  return {
    entry: path.join(__dirname, 'src', 'test.js'),
    mode: isProd ? 'production' : 'development',
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
    devServer: {
      contentBase: './dist',
      hot: true,
      inline: true,
    },
    resolve: {
      extensions: ['.js'],
    },

    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
  };
};
