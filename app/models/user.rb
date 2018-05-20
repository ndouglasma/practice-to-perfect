class User < ApplicationRecord
  validates :provider, presence: true, inclusion: { in: ["github"] }
  validates :github_id, presence: true, exclusion: { in: [nil] }
  validates :github_login, presence: true, exclusion: { in: [nil] }, uniqueness: { case_sensitive: false }
  validates_format_of :github_avatar_url, presence: true, exclusion: { in: [nil] }, with: URI::regexp(["http", "https"])

  has_many :user_responses
  has_many :mock_interviews
  has_many :questions, through: :user_responses

  def self.create_from_omniauth(auth)
    find_or_create_by(
      provider: auth.provider,
      github_id: auth.uid,
      github_login: auth.info.nickname,
      github_avatar_url: auth.info.image,
      github_name: auth.info.name
    )
  end

  def update_from_omniauth(auth)
    self.github_name = auth.info.name
    self.github_avatar_url = auth.info.image
    self.github_login = auth.info.nickname
    save
  end
end
