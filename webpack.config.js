const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

const common = merge([
	{
		module: {
			rules: [
				{
					test: /\.jsx?$/,
					exclude: /node_modules/,
					use: ['babel-loader'],
				},
			],
		},
		resolve: {
			alias: {
				Views: path.resolve(__dirname, 'src/views'),
			},
			extensions: ['.js', '.jsx', '.web.js', '.svg.js'],
		},
	},
])

const development = merge([
	{
		mode: 'development',
		entry: [
			'babel-polyfill',
			'react-hot-loader/patch',
			'webpack-dev-server/client?https://aw.local:8080',
			'webpack/hot/only-dev-server',
			'./src/index.web.dev.js',
		],
		output: {
			path: path.resolve(__dirname, '/js'),
			publicPath: '/js',
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'cheap-module-eval-source-map',
		plugins: [
			new webpack.NamedModulesPlugin(),
			new webpack.HotModuleReplacementPlugin(),
			new webpack.DefinePlugin({
				'process.env': {
					NODE_ENV: JSON.stringify('development'),
					PLATFORM_ENV: JSON.stringify('web'),
				},
			}),
		],
		devServer: {
			contentBase: path.resolve('public'),
			historyApiFallback: true,
			hot: true,
			host: 'aw.local',
		},
	},
])

const production = merge([
	{
		mode: 'production',
		entry: ['babel-polyfill', './src/index.web.js'],
		output: {
			path: path.resolve(__dirname, 'public/js/'),
			filename: 'app.js',
			sourceMapFilename: 'app.js.map',
		},
		devtool: 'source-map',
		optimization: {
			minimize: true,
		},
		plugins: [
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify('production'),
			}),
		],
	},
])

module.exports = (env) => {
	switch (env) {
		case 'production':
			return merge(common, production)
		default:
			return merge(common, development)
	}
}
