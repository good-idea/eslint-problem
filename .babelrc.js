const path = require('path')
const isTest = String(process.env.NODE_ENV) === 'test'

module.exports = {
	presets: [
		'@babel/preset-flow',
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['last 2 versions'],
					node: '8.10.0',
				},
			},
		],
		'@babel/preset-react',
	],
	plugins: [
		[
			'babel-plugin-module-resolver',
			{
				extensions: ['.js', '.web.js', '.native.js'],
				alias: {
					Views: path.resolve(__dirname, 'src', 'views'),
				},
			},
		],
		'babel-plugin-styled-components',
		'@babel/plugin-proposal-class-properties',
		'@babel/plugin-proposal-object-rest-spread',
		'react-hot-loader/babel',
		'graphql-tag',
		'lodash',
		'ramda',
	].filter(Boolean),
}
