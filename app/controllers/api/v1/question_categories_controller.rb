class Api::V1::QuestionCategoriesController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  protect_from_forgery unless: -> { request.format.json? }

  # This API endpoint will default to the QuestionCategorySerializer
  def index
    render json: QuestionCategory.all
  end

  def show
    render json: QuestionCategory.find(params[:id]), serializer: QuestionCategoryShowSerializer
  end
end
