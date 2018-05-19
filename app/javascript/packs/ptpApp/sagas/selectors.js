export const userId = (state) => state.get('user').get('user').get('id');
export const selectedNumQuestions = (state) => state.get('mockInterview').get('selectedNumQuestions');
export const selectedCategories = (state) => state.get('mockInterview').get('selectedCategories').toJS();
