class MockInterview < ApplicationRecord
  validates :selected_num_questions, presence: true, exclusion: { in: [nil] }

  belongs_to :user
  has_many :user_responses
  has_many :user_selected_categories
end
