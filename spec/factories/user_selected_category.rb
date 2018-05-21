require 'factory_bot'

FactoryBot.define do
  factory :user_selected_category do
    sequence(:mock_interview_id) { |n| }
    sequence(:question_category_id) { |n| }
  end
end
