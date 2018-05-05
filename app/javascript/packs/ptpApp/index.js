//External Dependencies
import React from 'react';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { createLogger } from 'redux-logger';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

//Internal Dependencies
import Layout from './components/layout/layout';
import Login from './components/user_auth/login';
import Overview from './components/overview/overview';
import StartInterview from './components/interview/start_interview';

// import rootSaga from '../sagas/index';
import rootReducer from './reducers/index';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creates saga middleware and connects it to the Redux store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(
			// sagaMiddleware,
			createLogger()
		)
	)
);

//starts the saga
// sagaMiddleware.run(rootSaga);

/* Create enhanced history object for router */
const createSelectLocationState = () => {
	let prevRoutingState, prevRoutingStateJS;
	return (state) => {
		const routingState = state.get('routing'); // or state.routing
		if (typeof prevRoutingState === 'undefined' || prevRoutingState !== routingState) {
			prevRoutingState = routingState;
			prevRoutingStateJS = routingState.toJS();
		}
		return prevRoutingStateJS;
	};
};

// Create an enhanced history that syncs navigation events with the store
const history = syncHistoryWithStore(browserHistory, store, {
	selectLocationState: createSelectLocationState()
});

const App = (props) => (
  <Provider store={store}>
    <Router history={history}>
      <Route path='/' component={ Layout }>
        <IndexRoute component={ Login } />
        <Route path='login' component={ Login } />
        <Route path='overview' component={ Overview } />
        <Route path='start_interview' component={ StartInterview } />
      </Route>
    </Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  render(
    <App />,
    document.getElementById('ptp-app')
  )
});
