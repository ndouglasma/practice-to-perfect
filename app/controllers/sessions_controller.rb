require 'Auth'
require 'auth_token'

class SessionsController < ApplicationController
  # skip_before_action :authenticate

  def create
    # auth = request.env["omniauth.auth"]
    user =  User.create_from_omniauth(auth)

    if user.persisted?
      user.update_from_omniauth(auth)
      session[:user_id] = user.id

      # jwt = Auth.encode_id(user.id)
      # redirect_to(ENV['PTP_CLIENT_URL'] + "?token=#{jwt}")
      redirect_to root_url
      flash[:notice] = "You are now signed in!"
    end
  end

  def destroy
    session.delete(:user_id)
    @current_user = nil
    redirect_to root_url
    flash[:notice] = "Signed Out!"
  end

  private

  def auth
    request.env['omniauth.auth']
  end
end
