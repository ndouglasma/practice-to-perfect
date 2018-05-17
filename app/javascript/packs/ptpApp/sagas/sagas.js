//Internal Dependencies
import { questionsAPISaga } from "./questions_api_sagas";
import { usersAPISaga } from "./users_api_sagas";

export default function* rootSaga() {
	yield [
		questionsAPISaga,
		usersAPISaga
	];
}
