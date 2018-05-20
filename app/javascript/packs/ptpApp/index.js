//External Dependencies
import React from 'react';
import 'babel-polyfill';
import { render } from 'react-dom';
import { browserHistory, IndexRoute, Route, Router } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import Immutable from 'immutable';
import { Provider } from 'react-redux';
import 'semantic-ui-css/semantic.min.css';

//Internal Dependencies
import Layout from './components/layout/layout';
// import Login from './components/user_auth/login';
import Overview from './components/overview/overview';
import SetUpInterview from './components/set_up_interview/set_up_interview';
import SelectNumQuestions from './components/set_up_interview/01_select_num_questions';
import SelectCategories from './components/set_up_interview/02_select_categories';
import ConfirmAudio from './components/set_up_interview/03_confirm_audio';
import Rules from './components/set_up_interview/04_rules';
import Countdown from './components/set_up_interview/05_countdown';
import ConductInterview from './components/conduct_interview/conduct_interview';
import Question from './components/conduct_interview/question';
import Complete from './components/conduct_interview/complete';
import AnalyzeInterview from './components/analyze_interview/analyze_interview';
import InterviewSummary from './components/analyze_interview/interview_summary';

import rootReducer from './reducers/index';
import rootSaga from './sagas/sagas';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

//creates saga middleware and connects it to the Redux store
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
	rootReducer,
	composeEnhancers(
		applyMiddleware(
			sagaMiddleware
		)
	)
);

//starts the saga
sagaMiddleware.run(rootSaga);

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
        <IndexRoute component={ Overview } />
        <Route path='overview' component={ Overview } />
        <Route path='set_up_interview' component={ SetUpInterview }>
					<IndexRoute component={ SelectNumQuestions } />
					<Route path='select_num_questions' component={ SelectNumQuestions } />
					<Route path='select_categories' component={ SelectCategories } />
					<Route path='confirm_audio' component={ ConfirmAudio } />
					<Route path='rules' component={ Rules } />
					<Route path='countdown' component={ Countdown } />
				</Route>
				<Route path='conduct_interview' component={ ConductInterview }>
					<IndexRoute component={ Question } />
					<Route path='question' component={ Question } />
					<Route path='complete' component={ Complete } />
				</Route>
				<Route path='analyze_interview' component={ AnalyzeInterview }>
					<IndexRoute component={ InterviewSummary } />
					<Route path='interview-summary' component={ InterviewSummary } />
				</Route>
      </Route>
    </Router>
  </Provider>
);

document.addEventListener('DOMContentLoaded', () => {
  let reactElement = document.getElementById('ptp-app')

  if (reactElement) {
    render(
      <App />,
      reactElement
    )
  }
});
