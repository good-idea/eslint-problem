import React from 'react'
import { AppRegistry } from 'react-native'
import { Provider } from 'react-redux'
import { NativeRouter } from 'react-router-native'

import ApolloWrapper from './src/services/Apollo'

import configureStore from './src/store/configureStore.production'
import MyProject from './src/views/MyProject'

const store = configureStore()
const initialState = store.getState()

const App = () => (
	<ApolloWrapper>
		<Provider store={store}>
			<NativeRouter>
				<MyProject {...initialState} />
			</NativeRouter>
		</Provider>
	</ApolloWrapper>
)

AppRegistry.registerComponent('MyProject', () => App)
