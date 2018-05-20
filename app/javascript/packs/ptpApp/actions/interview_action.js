import * as actionTypes from "./action_types";

export function setSelectedNumQuestions(numQuestions) {
	// console.log(numQuestions);
	return {
		type: actionTypes.SET_NUM_QUESTIONS,
		selectedNumQuestions: numQuestions
	};
};

export function clearSelectedNumQuestions() {
	return {
		type: actionTypes.CLEAR_NUM_QUESTIONS,
		selectedNumQuestions: null
	};
};

export function setSelectedCategories(categories) {
	categories.forEach((elem, index) => {
		// console.log(elem.id + ' ' + elem.name);
  });

	return {
		type: actionTypes.SET_CATEGORIES,
		selectedCategories: categories
	};
};

export function clearSelectedCategories() {
	return {
		type: actionTypes.CLEAR_CATEGORIES,
		selectedCategories: []
	};
};

export function requestQuestionsAPI() {
	// console.log("About to launch requestQuestionsAPI");
	return {
		type: actionTypes.REQUEST_QUESTIONSAPI
	};
}

export function setTranscribeResults(json, status, totalLikes, totalUms, totalWords) {
	// console.log("About to launch setTranscribeResults");
	return {
		type: actionTypes.SET_TRANSCRIBE_RESULTS,
		json: json,
		status: status,
		totalLikes: totalLikes,
		totalUms: totalUms,
		totalWords: totalWords
	};
}
