//External Dependencies
import { takeEvery, fork, select, put, call } from 'redux-saga/effects';

//Internal Dependencies
import * as actionTypes from '../actions/action_types';
import * as selectors from './selectors';

function fetchJson(userId) {
  const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }

  const headersWithAuthorization = () => {
    const jwt = sessionStorage.getItem('jwt');
    return {
      ...headers,
      'Authorization': `Bearer: ${jwt}`
    }
  }
  // console.log('CALLING FETCH');
  return fetch('/api/v1/users', {
    // credentials: 'same-origin',
    method: 'GET',
    headers: headersWithAuthorization()
  })
  // return fetch('/user/current_user', { credentials: 'same-origin' })
  .then(response => {
    if (!response.ok) {
			let errorMessage = `${response.status} (${response.statusText})`, error = new Error(errorMessage);
			throw(error);
    }
		else {
      // console.log(response);
			return response.json();
		}
  });
}

// Our worker sagas
export function* requestUserInterviewsAPIAsync() {
	try {
    // const response = yield call(fetchJson, userId);
    const response = yield call(fetchJson);

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
    // console.log(user);
    // console.log(interviews);

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
