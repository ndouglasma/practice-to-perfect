class PagesController < ApplicationController
  helper_method :current_user
  def index
  end

  private
  def current_user
    @current_user ||= User.find(session[:user_id]) if session[:user_id]
  end
end
