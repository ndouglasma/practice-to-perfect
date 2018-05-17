//External Dependencies
import { takeEvery, fork, select, put, call } from 'redux-saga/effects';

//Internal Dependencies
import * as actionTypes from '../actions/action_types';
import * as selectors from './selectors';

function fetchJson(userId) {
  return fetch(`/api/v1/users/${userId}`)
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
export function* requestUserInterviewsAPIAsync() {
  const userId = 1;
  // const userId = 2;

	try {
    const response = yield call(fetchJson, userId);

    let user = {};
    user.id = response.id;
    user.github_id = response.github_id;
    user.github_login = response.github_login;
    user.github_name = response.github_name;
    user.sign_in_count = response.sign_in_count;

    let interviews = {};
    interviews.total_interviews = response.total_interviews;
    interviews.total_categories = response.total_categories;
    interviews.total_user_responses = response.total_user_responses;
    interviews.first_and_last_interview_dates = response.first_and_last_interview_dates;
    interviews.user_interview_list = response.user_interview_list.interviews;
    interviews.category_counts = response.user_interview_list.category_counts;

		yield put({
			type: actionTypes.SUCCESS_USERINTERVIEWSAPI,
			user: user,
      interviews: interviews
		});
  }
	catch (error) {
		console.error(`Error in fetch: ${error.message}`);
  }
}

// Our watcher sagas; spawn a new task for each action
export function* watchGetUserInterviewsAPI() {
	yield takeEvery(actionTypes.REQUEST_USERINTERVIEWSAPI, requestUserInterviewsAPIAsync);
}

export const usersAPISaga = [
	fork(watchGetUserInterviewsAPI)
];
