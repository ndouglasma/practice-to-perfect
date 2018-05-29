class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  protect_from_forgery with: :exception

  def logged_in?
    !!current_user
  end

  def current_user
    return @current_user if @current_user
    if auth_present?
      id = Auth.decode_id(read_token_from_request)
      puts "id: #{id}"
      @current_user = User.find_by(id: id)
      puts "current_user: #{@current_user.id}"
      return @current_user if @current_user
    end
  end

  def authenticate
    render json: { error: 'unauthorized' }, status: 401 unless logged_in?
  end

  private

  def read_token_from_request
    request.env['HTTP_AUTHORIZATION'].scan(/Bearer: (.*)$/).flatten.last
  end

  def auth_present?
    !!request.env.fetch('HTTP_AUTHORIZATION', '').scan(/Bearer/).flatten.first
  end
end
