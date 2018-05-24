class AuthToken
  attr_accessor :token, :uid

  def initialize(params)
    @token = params[:token]
    @uid = params[:uid]
  end
end