class Api::V1::QuestionsController < ApiController
  # This API endpoint will default to the QuestionSerializer
  def index
    render json: Question.all
  end
end
