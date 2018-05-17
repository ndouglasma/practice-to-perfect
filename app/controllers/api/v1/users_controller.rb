require 'json'

class Api::V1::UsersController < ApplicationController
  skip_before_action :verify_authenticity_token

  def show
    @user = User.find(params[:id])


    render json: @user, serializer: UserShowSerializer
  end
end
