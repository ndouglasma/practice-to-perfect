require 'json'

# class Api::V1::UsersController < ApplicationController
class Api::V1::UsersController < ApiController

  skip_before_action :verify_authenticity_token
  # protect_from_forgery unless: -> { request.format.json? }
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session

  def index
    @current_user = User.find(session[:user_id]) if session[:user_id]
    if !@current_user.nil?
      render json: @current_user, serializer: UserShowSerializer
    else
      render json: nil, status: :unprocessable_entity
    end
  end
end
