class Auth
  def self.encode_id(user_id)
    payload = { user_id: user_id }
    JWT.encode payload, ENV['AUTH_SECRET'], 'HS256'
  end

  def self.decode_id(token)
    payload = JWT.decode token, ENV['AUTH_SECRET'], true, { :algorithm => 'HS256' }
    payload[0]['user_id']
  end
end