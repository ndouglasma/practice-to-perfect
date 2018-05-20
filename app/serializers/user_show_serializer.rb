class UserShowSerializer < ActiveModel::Serializer
  attributes :id, :github_id, :github_login, :github_name, :sign_in_count, :total_interviews, :total_categories, :total_user_responses, :first_and_last_interview_dates, :user_interview_list

  # Total number of mock interviews
  def total_interviews
    object.mock_interviews.count
  end

  # For the interviews, count the number of times user selected categories vs chose to be surprised.
  # This method doesn't simply count the selected categories (b/c multiple categories may be picked for a single interview)
  def total_categories
    total_specific_category = 0
    total_surprise_category = 0
    total_categories = {}

    # You know if a user selects 'Just Surprise Me', that will be the only possible category for the interview
    object.mock_interviews.each do |interview|
      interview.user_selected_categories.each do |category|
        # where returns an array; there will only be 1 value
        question_category = QuestionCategory.where(["id = ?", category.question_category_id]).first
        if question_category.name === 'Just Surprise Me'
          total_surprise_category +=1
        end
      end
    end
    total_categories[:specific_category] = object.mock_interviews.count - total_surprise_category
    total_categories[:surprise_category] = total_surprise_category

    return total_categories
  end

  # Total number of user responses
  def total_user_responses
    total = UserResponse.where(:user_id => object.id).count
  end

  def first_and_last_interview_dates
    dates = {}
    interviews = object.mock_interviews.sort_by &:created_at
    total = interviews.count

    # if user doesn't have any interviews, return empty hash
    # if user has 1 interview, repeat for first and latest
    if (total === 1)
      dates[:first_interview_date] = interviews.first.created_at
      dates[:last_interview_date] = interviews.first.created_at
    elsif (total > 1)
      dates[:first_interview_date] = interviews.first.created_at
      dates[:last_interview_date] = interviews.last.created_at
    end

    return dates
  end

  # For each mock_interview, grab the user selected category and the questions linked to that category
  def user_interview_list
    list = {}
    interviews = []
    num_behave = 0
    num_problem = 0
    num_motiviate = 0
    num_tech = 0
    num_info = 0

    object.mock_interviews.each do |interview|
      custom_interview = {}
      custom_user_responses = []

      custom_interview[:id] = interview.id
      custom_interview[:selected_num_questions] = interview.selected_num_questions
      custom_interview[:created_at] = interview.created_at

      user_responses = interview.user_responses

      user_responses.each do |user_response|
        custom_question = {}
        question = Question.where(["id = ?", user_response.question_id]).first
        question_category = QuestionCategory.where(["id = ?", question.question_category_id]).first

        # Since inside user responses, count categories
        case question_category.name
          when 'Behavioral'
            num_behave += 1
          when 'Problem-solving'
            num_problem += 1
          when 'Motivational'
            num_motiviate += 1
          when 'Technical Skills'
            num_tech += 1
          when 'Informational'
            num_info += 1
        end

        custom_question[:question_category] = question_category.name
        custom_question[:body] = question.body
        custom_user_responses.push(custom_question)
      end

      custom_interview[:questions] = custom_user_responses
      interviews.push(custom_interview)
    end

    list[:interviews] = interviews
    list[:category_counts] = [
      {
        :name => 'Behavioral',
        :count => num_behave
      },
      {
        :name => 'Problem-solving',
        :count => num_problem
      },
      {
        :name => 'Motivational',
        :count => num_motiviate
      },
      {
        :name => 'Technical Skills',
        :count => num_tech
      },
      {
        :name => 'Informational',
        :count => num_info
      }
    ]

    return list
  end
end
