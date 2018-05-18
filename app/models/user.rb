class User < ApplicationRecord
  validates :github_id, presence: true, exclusion: { in: [nil] }
  validates :github_login, presence: true, exclusion: { in: [nil] }, uniqueness: { case_sensitive: false }
  validates_format_of :github_avatar_url, presence: true, exclusion: { in: [nil] }, with: URI::regexp(["http", "https"])

  has_many :user_responses
  has_many :mock_interviews
  has_many :questions, through: :user_responses
end
