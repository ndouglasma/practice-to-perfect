class UserResponse < ApplicationRecord
  validates_format_of :aws_s3_media_file_uri, with: URI::regexp(["http", "https"], uniqueness: { case_sensitive: false }
  
  belongs_to :user
  belongs_to :question
end
