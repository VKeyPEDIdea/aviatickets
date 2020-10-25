const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
	entry: {
		polyfill: 'babel-polyfill',
		app: './js/app.js',
	},
	// Также webpack рекомендует явно указывать, в какой директории находятся исходные файлы проекта (ресурсы). Для этого следует использовать свойство context:
	context: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, './dist'),
		filename: '[name].[fullhash].js',
	},
	module: {
		rules: [{
				test: /\.js$/,
				loader: 'babel-loader',
				exclude: '/node-modules/'
			},
			// {
			// 	test: /\.s[ac]ss$/i,
			// 	use: [
			// 		{
			// 			loader: MiniCssExtractPlugin.loader,
			// 			options: {
      //         hmr: process.env.NODE_ENV === 'development',
			// 				reloadAll: true,
			// 			}
			// 		},
			// 		'css-loader',
			// 		'sass-loader',
			//     'postcss-loader',

			// 	]
			// },
			{
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'postcss-loader',
          'sass-loader',
        ],
      },
			{
				test: /\.(png|jpe?g|gif)$/,
				use: [{
					loader: 'file-loader',
					options: {
						name: '[path][name].[ext]',
					},
				}, ],
			},
			{
				test: /\.(ttf|eot|woff2|woff|svg|png|jpg|gif|ico)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
				loader: 'file-loader'
			},
		]
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: '[name].css',
		}),
		new HtmlWebpackPlugin({
			template: './index.html',
		}),
	],
  devServer: {
    publicPath: '/',
    port: 8000,
    contentBase: path.join(__dirname, 'src'),
		host: 'localhost',
		watchContentBase: true,
    historyApiFallback: true,
    noInfo: false,
    stats: 'minimal',
		hot: true,
		overlay: true,
  },
};