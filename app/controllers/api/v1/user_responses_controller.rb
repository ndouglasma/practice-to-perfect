class Api::V1::UserResponsesController < ApplicationController
  helper AwsS3Helper
  skip_before_action :verify_authenticity_token

  def create
    @new_user_response = UserResponse.new()
    # @new_user_response.file = params['body']
    @new_user_response.user = User.first
    @new_user_response.question = Question.first
    @new_user_response.aws_s3_media_file_uri = 'https://s3.amazonaws.com/audexus-launch-academy-breakable-toy/Testing.mp4'
    @new_user_response.aws_transcribe_transcription_job_name = 'launch-academy-interview-technical-answer-user'
    if @new_user_response.save!
      render json: { user_response: @new_user_response }
    else
      render json: { error: @new_user_response.errors.full_messages }, status: :unprocessable_entity
    end
  end
end
