class Question < ApplicationRecord
  validates :body, presence: true, uniqueness: { case_sensitive: false }, exclusion: { in: [nil] }

  belongs_to :question_category
  has_many :user_responses
  has_many :users, through: :user_responses
end
