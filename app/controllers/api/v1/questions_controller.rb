class Api::V1::QuestionsController < ApplicationController
  protect_from_forgery unless: -> { request.format.json? }

  def index
    render json: { questions: Question.all }
  end
end
