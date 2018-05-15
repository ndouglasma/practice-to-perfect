require 'json'

class Api::V1::MockInterviewsController < ApplicationController
  include AwsTranscribeHelper
  skip_before_action :verify_authenticity_token, only: [:create]

  def show
    # Kick off process to get status of each user response
    @mock_interview = MockInterview.find(params[:id])

    @mock_interview.user_responses.each do |user_response|
      # query for AWS transcribe job status
      response = aws_get_transcribe_job_status(user_response.aws_transcribe_job_name)
      user_response.update_transcribe_job_status(response)
      if response === 'NOT_FOUND'
        puts 'ERROR'
      end
    end

    render json: @mock_interview, serializer: MockInterviewShowSerializer
  end

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


    # if user selected category 'Just Surprise Me', that will be the only category linked to interview; therefore candidate_questions = all questions in DB
    # binding.pry
    if(@new_mock_interview.user_selected_categories[0].question_category_id === 6)
      grab_candidate_questions = Question.all
      candidate_questions = grab_candidate_questions.to_ary

      @new_mock_interview.selected_num_questions.times do
        # need to subtract 1 from length accounting for the array indexes starting at 0
        random_index = rand(0..candidate_questions.length-1)
        random_question = candidate_questions.slice!(random_index)
        interview_questions.push(random_question)
      end
    else # need to loop through user selected categories to grab questions
      @new_mock_interview.user_selected_categories.each do |category|
        category_questions = []
        grab_category_questions = QuestionCategory.find(category.question_category_id).questions
        category_questions = grab_category_questions.to_ary

        # make sure at least 1 of the category questions gets selected
        random_index = rand(0..category_questions.length-1)
        # binding.pry
        random_question = category_questions.slice!(random_index)
        interview_questions.push(random_question)

        # push the rest of the category questions onto the candidate_questions array for further random selection
        candidate_questions.concat(category_questions)
      end

      #of number of questions left for random selection, loop to grab
      num_more_questions_needed = @new_mock_interview.selected_num_questions - interview_questions.length

      if (num_more_questions_needed > 0)
        num_more_questions_needed.times do
          random_index = rand(0..candidate_questions.length-1)
          random_question = candidate_questions.slice!(random_index)
          # binding.pry
          interview_questions.push(random_question)
        end
      end
    end

    render json: {:mock_interview => @new_mock_interview, :questions => interview_questions}
  end

  private

  def mock_interviews_params
    params.permit(:selected_num_questions, {selected_categories: [:id, :name]})
  end
end
