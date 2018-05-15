class CreateUserResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :user_responses do |t|
      t.belongs_to :user, null: false
      t.belongs_to :mock_interview, null: false
      t.belongs_to :question, null: false
      t.string :audio, null: false
      t.integer :audio_size
      t.string :audio_type
      t.time :audio_start_time
      t.time :audio_stop_time
      t.string :aws_transcribe_job_name
      t.string :aws_transcribe_job_status, default: 'NOT_STARTED'
      t.timestamps
    end
  end
end
