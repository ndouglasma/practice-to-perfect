require 'factory_bot'

FactoryBot.define do
  factory :question_category do
    sequence(:name) { |n| "Question Category#{n}?"}
  end
end
