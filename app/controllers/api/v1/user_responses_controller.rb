class Api::V1::UserResponsesController < ApplicationController
  include AwsS3Helper
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    @new_user_response = UserResponse.new(user_response_params)
    @new_user_response.user = User.first
    @new_user_response.question = Question.first
    # @new_user_response.audio = (params[:audio])
    # @new_user_response.aws_s3_audio_uri = 'https://s3.amazonaws.com/audexus-launch-academy-breakable-toy/Testing.mp4'
    @new_user_response.aws_transcribe_transcription_job_name = 'launch-academy-interview-technical-answer-user'
    if s3_bucket_exist?(ENV['S3_BUCKET_LAUNCH_ACADEMY'])
      if @new_user_response.save!
        render json: { user_response: @new_user_response }
      else
        render json: { error: @new_user_response.errors.full_messages }, status: :unprocessable_entity
      end
    else
      puts 'AWS S3 BUCKET DOESNT EXIST'
    end
  end

  private
  def user_response_params
    params.permit(:audio)
  end
end
