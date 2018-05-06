import * as actionTypes from "./action_types";

export function setSelectedNumQuestions(num) {
	console.log(num);
	return {
		type: actionTypes.SET_NUM_QUESTIONS,
		selectedNumQuestions: num
	};
}
