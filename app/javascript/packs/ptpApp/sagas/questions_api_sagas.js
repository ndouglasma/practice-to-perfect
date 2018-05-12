//External Dependencies
import { takeEvery, fork, select, put, call } from 'redux-saga/effects';

//Internal Dependencies
import * as actionTypes from '../actions/action_types';
import * as selectors from './selectors';

function fetchJson(formData) {
  return fetch('/api/v1/mock_interviews', {
		credentials: 'same-origin',
		method: 'POST',
		body: formData
	})
	.then(response => {
		if (!response.ok) {
			let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage);
			throw(error);
    }
		else {
			return response.json();
		}
  });
}

// Our worker sagas
export function* requestQuestionsAPIAsync() {
	const selectedNumQuestions = yield select(selectors.selectedNumQuestions);
	const selectedCategories = yield select(selectors.selectedCategories);

	let formData  = new FormData();
	formData.append('selected_num_questions', selectedNumQuestions);
	formData.append('selected_categories', JSON.stringify(selectedCategories));

	try {
    const mockInterview = yield call(fetchJson, formData);

		yield put({
			type: actionTypes.SUCCESS_QUESTIONSAPI,
			mockInterview: mockInterview
		});
  }
	catch (error) {
		console.error(`Error in fetch: ${error.message}`);
		// yield put({
		// 	type: 'FETCH_MEMES_ERROR',
    //   payload: e,
    //   error: true,
    // });
  }
}

// Our watcher sagas; spawn a new task for each action
export function* watchGetQuestionsAPI() {
	// console.log('Got into watcher questionsAPI saga');
	yield takeEvery(actionTypes.REQUEST_QUESTIONSAPI, requestQuestionsAPIAsync);
}

export const questionsAPISaga = [
	fork(watchGetQuestionsAPI)
];
