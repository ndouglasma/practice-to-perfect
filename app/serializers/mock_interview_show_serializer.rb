class MockInterviewShowSerializer < ActiveModel::Serializer
  # attributes :id, :user_id, :selected_num_questions, :mock_interview_transcribe_status, :user_response_list
  attributes :id, :user_id, :selected_num_questions, :transcribe_status, :user_response_list

  def user_response_list
    object.user_responses
  end

  def transcribe_status
    object.transcribe_status
  end
end
