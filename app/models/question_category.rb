class QuestionCategory < ApplicationRecord
  validates :name, presence: true, uniqueness: { case_sensitive: false }, exclusion: { in: [nil] }

  has_many :questions
  has_many :user_selected_categories
end
