// External Dependencies
// A custom router reducer to support an Immutable store.
import Immutable from 'immutable';

// Internal Dependencies
import * as actionTypes from "../actions/action_types";

const initialState = Immutable.fromJS({
	user: {},
	interviews: {}
});

export default (state = initialState, action) => {
	// console.log(action);
	// console.log("action.type=[" +action.type +"]");
	if (action.type === actionTypes.SUCCESS_USERINTERVIEWSAPI) {
		// console.log('GOT HERE SUCCESS_USERINTERVIEWSAPI REDUCER');
		return state.merge({ //returning new state
			user: action.user,
			interviews: action.interviews
		});
	}
	return state; //worst-case scenario will return initial state
};
