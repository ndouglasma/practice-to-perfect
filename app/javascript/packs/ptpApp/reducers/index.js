//External Dependencies*/
import { combineReducers } from 'redux-immutable';

//Internal Dependencies*/
import routerReducer from './router_reducer';
import mockInterviewReducer from './mock_interview_reducer';
import userReducer from './user_reducer';

/**
 * Combine reducers into root reducer and create store.
 * 'combineReducers' is a redux-immutable version
 * Also using customized routerReducer to support an Immutable store
 * instead of react-router-redux's routerReducer
 */
const rootReducer = combineReducers({
	routing: routerReducer,
	user: userReducer,
	mockInterview: mockInterviewReducer
});

export default rootReducer;
