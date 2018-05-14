require 'json'

class Api::V1::UserResponsesController < ApplicationController
  include AwsTranscribeHelper
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    # ActiveRecord::Base.transaction do
      @new_user_reponse = UserResponse.create!(user_response_params)
      # @new_mock_interview.aws_transcribe_transcription_job_name = 'launch-academy-interview-technical-answer-user'
      binding.pry
      if @new_user_reponse.errors.full_messages.empty?
        # Proceed with transcribe job
        transcribe_job_name = "launch-academy-interview-user-response-user-U#{@new_user_reponse.user_id}M#{@new_user_reponse.mock_interview_id}-Q#{@new_user_reponse.question_id}-UR#{@new_user_reponse.id}"
        job_response = aws_start_transription_job(transcribe_job_name, @new_user_reponse.audio.url)

        render json: { :user_response => @new_user_reponse }
      else
        render json: { error: @new_user_response.errors.full_messages }, status: :unprocessable_entity
      end
    # end
  end

  private

  def user_response_params
    params.permit(:audio_size, :audio_type, :audio_start_time, :audio_stop_time, :audio, :user_id, :mock_interview_id, :question_id, :format)
  end
end
