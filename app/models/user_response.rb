class UserResponse < ApplicationRecord
  belongs_to :user
  belongs_to :mock_interview
  belongs_to :question

  def update_transcribe_job_status(input_job_status, input_transcript_file_uri = nil, input_creation_time = nil, input_completion_time = nil)
    if input_job_status === 'COMPLETED'
      self.update(aws_transcribe_job_status: input_job_status, aws_transcribe_transcript_file_uri: input_transcript_file_uri, aws_transcribe_creation_time: input_creation_time, aws_transcribe_completion_time: input_completion_time)
    else
      self.update(aws_transcribe_job_status: input_job_status)
    end
  end

  mount_base64_uploader :audio, UserResponseUploader
end
