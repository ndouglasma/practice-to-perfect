class UserResponse < ApplicationRecord
  belongs_to :user
  belongs_to :mock_interview
  belongs_to :question

  mount_base64_uploader :audio, UserResponseUploader
end
