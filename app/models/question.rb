class Question < ApplicationRecord
  validates :body, presence: true, uniqueness: { case_sensitive: false }, exclusion: { in: [nil] }
end
