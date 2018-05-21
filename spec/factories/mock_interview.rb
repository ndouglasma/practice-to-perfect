require 'factory_bot'

FactoryBot.define do
  factory :mock_interview do
    sequence(:user_id) { |n| }
    sequence(:selected_num_questions) { |n| }
  end
end
