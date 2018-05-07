class Api::V1::QuestionsController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  protect_from_forgery unless: -> { request.format.json? }

  # This API endpoint will default to the QuestionSerializer
  def index
    render json: Question.all
  end
end
