class ApiController < ApplicationController
  # Prevent CSRF attacks by raising an exception.
  protect_from_forgery unless: -> { request.format.json? }
  # before_action :authenticate
end
