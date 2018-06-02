// @flow

import fs from 'fs'
import { GraphQLServer } from 'graphql-yoga'
import { typeDefs, resolvers } from './schema'
import getCurrentViewer from './middleware/getCurrentViewer'
import context from './serverContext'
import { ENV, PORT } from './config'

const debug = require('debug')('api')

const server = new GraphQLServer({ typeDefs, resolvers, context })

const httpsConfig =
	ENV === 'development'
		? {
				key: fs.readFileSync('./.aw-server-localhost.key'),
				cert: fs.readFileSync('./.aw-server-localhost.cert'),
		  }
		: undefined

server.express.use(getCurrentViewer)

server.start(
	{
		port: PORT,
		endpoint: '/api',
		playground: ENV === 'development' || ENV === 'staging' ? '/playground' : false,
		https: ENV === 'development' ? httpsConfig : undefined,
	},
	() => {
		debug(`[${ENV}] Server running on port ${PORT}`)
	},
)
