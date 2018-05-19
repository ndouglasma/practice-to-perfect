// External Dependencies
// A custom router reducer to support an Immutable store.
import Immutable from 'immutable';

// Internal Dependencies
import * as actionTypes from "../actions/action_types";

const initialState = Immutable.fromJS({
	selectedNumQuestions: 0,
	selectedCategories: [],
	details: [],
	questions: [],
	json: [],
	status: 0,
	totalLikes: 0,
	totalUms: 0,
	totalWords: 0
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
	else if (action.type === actionTypes.SUCCESS_QUESTIONSAPI) {
		return state.merge({ //returning new state
			details: action.mockInterview.mock_interview,
			questions: action.mockInterview.questions
		});
	}
	else if (action.type === actionTypes.SET_TRANSCRIBE_RESULTS) {
		return state.merge({
			json: action.json,
			status: action.status,
			totalLikes: action.totalLikes,
			totalUms: action.totalUms,
			totalWords: action.totalWords
		});
	}
	return state; //worst-case scenario will return initial state
};
