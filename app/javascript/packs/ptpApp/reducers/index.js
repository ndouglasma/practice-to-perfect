//External Dependencies*/
import { combineReducers } from 'redux-immutable';

//Internal Dependencies*/
import routerReducer from './router_reducer';
import interviewReducer from './interview_reducer';

/**
 * Combine reducers into root reducer and create store.
 * 'combineReducers' is a redux-immutable version
 * Also using customized routerReducer to support an Immutable store
 * instead of react-router-redux's routerReducer
 */
const rootReducer = combineReducers({
	routing: routerReducer,
	interview: interviewReducer

});

export default rootReducer;
