class CreateQuestions < ActiveRecord::Migration[5.2]
  def change
    create_table :questions do |t|
      t.belongs_to :question_category, null: false
      t.text :body, null:false
      t.timestamps
    end
    add_index :questions, [:body], unique: true
  end
end
