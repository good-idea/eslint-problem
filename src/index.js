import React from 'react'
import { render } from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import { BrowserRouter } from 'react-router-dom'
import { Provider as ReduxProvider } from 'react-redux'
import { Provider } from 'unstated'
import ApolloWrapper from './services/Apollo'

import MyProject from './views/MyProject'
import configureStore from './redux/store/configureStore'
import './styles/global'
/**
 * Redux Config
 */

if (window.localStorage) {
	window.localStorage.debug = 'app'
}

// const initialState = store.getState()

const store = configureStore()
const initialState = store.getState()

const renderApp = (Component) => {
	render(
		<AppContainer>
			<ApolloWrapper>
				<ReduxProvider store={store}>
					<Provider>
						<BrowserRouter>
							<Component {...initialState} />
						</BrowserRouter>
					</Provider>
				</ReduxProvider>
			</ApolloWrapper>
		</AppContainer>,
		document.getElementById('root'),
	)
}

renderApp(MyProject, store)

if (module.hot) {
	module.hot.accept('./views/MyProject/index.js', () => {
		// eslint-disable-next-line
		const NewApp = require('./views/MyProject').default
		renderApp(NewApp)
	})
}
