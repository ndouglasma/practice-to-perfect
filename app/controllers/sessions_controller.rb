class SessionsController < ApplicationController
  def create
    auth = request.env["omniauth.auth"]
    user =  User.create_from_omniauth(auth)

    if user.persisted?
      user.update_from_omniauth(auth)
      session[:user_id] = user.id

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
end
