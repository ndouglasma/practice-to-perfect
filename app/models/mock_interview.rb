class MockInterview < ApplicationRecord
  validates :selected_num_questions, presence: true, exclusion: { in: [nil] }

  belongs_to :user
  has_many :user_responses
  has_many :user_selected_categories

  def transcribe_status
    # Query each user_response.aws_transcribe_job_status and formulate a single status for the mock_interview
    num_complete = 0
    num_failed = 0
    num_in_progress = 0
    num_not_started = 0
    mock_interview_transcribe_status = ''

    user_responses.each do |user_response|
      case user_response.aws_transcribe_job_status
      when 'COMPLETED'
        num_complete += 1
      when 'FAILED'
        num_failed += 1
        # puts 'FAILED transcribe job'
      when 'NOT_STARTED'
        num_not_started += 1
      when 'IN_PROGRESS'
        num_in_progress += 1
      end
    end

    # Formulate the single response.  All must be 'COMPLETED' in order to mark the mock_interview status 'COMPLETED'
    if num_failed > 0
      mock_interview_transcribe_status = 'FAILED'
    elsif num_not_started > 0 || num_in_progress > 0
      mock_interview_transcribe_status = 'IN_PROGRESS'
    elsif num_complete === selected_num_questions
      mock_interview_transcribe_status = 'COMPLETED'
    else
      mock_interview_transcribe_status = 'FAILED'
    end

    return mock_interview_transcribe_status
  end
end
