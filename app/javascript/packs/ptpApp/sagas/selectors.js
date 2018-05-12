export const selectedNumQuestions = (state) => state.get('interview').get('selectedNumQuestions');
export const selectedCategories = (state) => state.get('interview').get('selectedCategories').toJS();
