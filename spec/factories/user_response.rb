require 'factory_bot'

FactoryBot.define do
  factory :user_response do
    sequence(:user_id) { |n| }
    sequence(:mock_interview_id) { |n| }
    sequence(:question_id) { |n| }
    sequence(:audio) { |n| "audio_file_#{n}" }
  end
end
