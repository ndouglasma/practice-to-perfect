class CreateMockInterviews < ActiveRecord::Migration[5.2]
  def change
    create_table :mock_interviews do |t|
      t.belongs_to :user, null: false
      t.integer :selected_num_questions, null: false
      t.timestamps
    end
  end
end
