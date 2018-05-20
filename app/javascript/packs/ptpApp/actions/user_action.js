import * as actionTypes from "./action_types";

export function requestUserInterviewsAPI() {
	// console.log("About to launch requestUserInterviewsAPI");
	return {
		type: actionTypes.REQUEST_USERINTERVIEWSAPI
	};
}
