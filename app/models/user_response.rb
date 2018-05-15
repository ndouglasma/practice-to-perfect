class UserResponse < ApplicationRecord
  belongs_to :user
  belongs_to :mock_interview
  belongs_to :question

  def update_transcribe_job_status(input_job_status)
    self.update(aws_transcribe_job_status: input_job_status)
  end

  mount_base64_uploader :audio, UserResponseUploader
end
