require 'factory_bot'

FactoryBot.define do
  factory :question do
    sequence(:question_category_id) { |n| }
    sequence(:body) { |n| "Question: ABC#{n}?"}
  end
end
