require 'json'

class Api::V1::MockInterviewsController < ApplicationController
  include AwsS3Helper
  skip_before_action :verify_authenticity_token, only: [:create]

  def create
    ActiveRecord::Base.transaction do
      # new_mock_interview = MockInterview.new()
      # new_mock_interview.selected_num_questions = params[:selected_num_questions]
      # new_mock_interview.user = User.first
      # new_mock_interview.save!

      # Save entries in user_selected_categories
      # JSON.parse(params[:selected_categories]).each do |category|
      #   # puts "The current array category is: #{category["id"]}"
      #   new_user_selected_category = UserSelectedCategory.new(mock_interview: new_mock_interview, question_category_id: category["id"])
      #   new_user_selected_category.save!
      # end

      # use create so you have access to model
      @new_mock_interview = MockInterview.create!(
        selected_num_questions: params[:selected_num_questions],
        user: User.first
      )
      if @new_mock_interview.errors.full_messages.empty?
        # Save entries in user_selected_categories; can still access selected categories thorugh associations
        JSON.parse(params[:selected_categories]).each do |category|
          new_user_selected_category = UserSelectedCategory.new(mock_interview: @new_mock_interview, question_category_id: category["id"])
          new_user_selected_category.save!
        end
      else
        puts "Need to handle error"
      end
    end

    # Using the mock interview settings, randomly select interview questions to meet the number of questions and selected categories
    # If multiple categories, there is at least 1 randomly selected question from each category.  Let the rest come from the combined pool
    # The front-end will make sure the user doesn't select more categories then the num of questions they selected
    candidate_questions = []
    interview_questions = []


    # if user selected category 'Surprise Me', that will be the only category linked to interview; therefore candidate_questions = all questions in DB
    if(@new_mock_interview.user_selected_categories.name === 'Surprise Me')
      grab_candidate_questions = Question.all
      candidate_questions = grab_candidate_questions.to_ary

      @new_mock_interview.selected_num_questions.times do
        random_index = rand(0..candidate_questions.length)
        random_question = category_questions.slice!(random_index)
        interview_questions.push(random_question)
      end
    else # need to loop through user selected categories to grab questions
      @new_mock_interview.user_selected_categories.each do |category|
        category_questions = []
        grab_category_questions = QuestionCategory.find(category.question_category_id).questions
        category_questions = grab_category_questions.to_ary

        # make sure at least 1 of the category questions gets selected
        random_index = rand(0..category_questions.length)
        # binding.pry
        random_question = category_questions.slice!(random_index)
        interview_questions.push(random_question)

        # push the rest of the category questions onto the candidate_questions array for further random selection
        candidate_questions.push(category_questions)
      end

      #of number of questions left for random selection, loop to grab
      num_more_questions_needed = @new_mock_interview.selected_num_questions - candidate_questions.length

      if (num_more_questions_needed > 0)
        num_more_questions_needed.times do
          random_index = rand(0..candidate_questions.length)
          random_question = candidate_questions.slice!(random_index)
          interview_questions.push(random_question)
        end
      end
    end

    render json: {:mock_interview => @new_mock_interview, :questions => interview_questions}
    # render json: { mock_interview: @new_mock_interview }
  end

  private

  def mock_interviews_params
    params.permit(:selected_num_questions, {selected_categories: [:id, :name]})
  end
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