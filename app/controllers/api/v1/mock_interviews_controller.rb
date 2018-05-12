require 'json'

class Api::V1::MockInterviewsController < ApplicationController
  include AwsS3Helper
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    ActiveRecord::Base.transaction do
      @new_mock_interview = MockInterview.new()
      @new_mock_interview.selected_num_questions = params[:selected_num_questions]
      @new_mock_interview.user = User.first

      @new_mock_interview.save!

      # Save entries in user_selected_categories
      JSON.parse(params[:selected_categories]).each do |category|
        # puts "The current array category is: #{category["id"]}"
        new_user_selected_category = UserSelectedCategory.new(mock_interview: @new_mock_interview, question_category_id: category["id"])
        new_user_selected_category.save!
      end
      @questions = Question.all

      # Using the mock interview settings, randomly select interview questions to meet the number of questions and selected categories
      

      render json: {:mock_interview => @new_mock_interview, :questions => @questions}
      # render json: { mock_interview: @new_mock_interview }
    end
    # rescue ActiveRecord::StatementInvalid => e
    #   errors.add(:base, e.message)
    #   render json: { error: e.message }
    # end
  end
    # @new_mock_interview.user_response = UserResponse.new()
    # @new_mock_interview.question = Question.first
    # @new_mock_interview.audio = (params[:audio])
    # @new_mock_interview.aws_s3_audio_uri = 'https://s3.amazonaws.com/audexus-launch-academy-breakable-toy/Testing.mp4'
    # @new_mock_interview.aws_transcribe_transcription_job_name = 'launch-academy-interview-technical-answer-user'
    # if s3_bucket_exist?(ENV['S3_BUCKET_LAUNCH_ACADEMY'])
    #   if @new_mock_interview.save!
    #     render json: { user_response: @new_mock_interview }
    #   else
    #     render json: { error: @new_mock_interview.errors.full_messages }, status: :unprocessable_entity
    #   end
    # else
    #   puts 'AWS S3 BUCKET DOESNT EXIST'
    # end

  private
  def mock_interviews_params
    params.permit(:selected_num_questions, {selected_categories: [:id, :name]})
  end
end
