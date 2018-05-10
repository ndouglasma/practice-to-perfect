class UserResponse < ApplicationRecord
  # validates_format_of :aws_s3_audio_uri, with: URI::regexp(["http", "https"]), uniqueness: { case_sensitive: false }

  belongs_to :user
  belongs_to :question

  mount_base64_uploader :audio, UserResponseUploader
end
