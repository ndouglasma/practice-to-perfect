// External Dependencies
// A custom router reducer to support an Immutable store.
import Immutable from 'immutable';

// Internal Dependencies
import * as actionTypes from "../actions/action_types";

const initialState = Immutable.fromJS({
	selectedNumQuestions: 0,
	selectedCategories: []
});

export default (state = initialState, action) => {
	console.log(action);
	console.log("action.type=[" +action.type +"]");
	if (action.type === actionTypes.SET_NUM_QUESTIONS) {
		return state.merge({
			selectedNumQuestions: action.selectedNumQuestions
		});
	}
	else if (action.type === actionTypes.CLEAR_NUM_QUESTIONS) {
		return state.merge({
			selectedNumQuestions: 0
		});
	}
	else if (action.type === actionTypes.SET_CATEGORIES) {
		return state.merge({
			selectedCategories: action.selectedCategories
		});
	}
	else if (action.type === actionTypes.CLEAR_CATEGORIES) {
		return state.merge({
			selectedCategories: []
		});
	}
	return state; //worst-case scenario will return initial state
};
