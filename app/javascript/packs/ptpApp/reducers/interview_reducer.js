// External Dependencies
// A custom router reducer to support an Immutable store.
import Immutable from 'immutable';

// Internal Dependencies
import * as actionTypes from "../actions/action_types";
const SET_NUM_QUESTIONS = 'SET_NUM_QUESTIONS';

const initialState = Immutable.fromJS({
	selectedNumQuestions: null
});

export default (state = initialState, action) => {
	if (action.type === SET_NUM_QUESTIONS) {
		return state.merge({
			selectedNumQuestions: action.payload
		});
	}

	return state;
};
