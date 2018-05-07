class CreateUserResponses < ActiveRecord::Migration[5.2]
  def change
    create_table :user_responses do |t|
      t.belongs_to :user, null: false
      t.belongs_to :question, null: false
      t.string :aws_s3_media_file_uri, null: false
      t.string :aws_transcribe_transcription_job_name
      t.timestamps
    end
    add_index :user_responses, [:aws_s3_media_file_uri], unique: true
  end
end
