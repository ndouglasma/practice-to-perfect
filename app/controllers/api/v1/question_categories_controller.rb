# class Api::V1::QuestionCategoriesController < ApplicationController
class Api::V1::QuestionCategoriesController < ApiController

  # This API endpoint will default to the QuestionCategorySerializer
  def index
    render json: QuestionCategory.all
  end

  def show
    render json: QuestionCategory.find(params[:id]), serializer: QuestionCategoryShowSerializer
  end
end
