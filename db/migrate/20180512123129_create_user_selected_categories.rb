class CreateUserSelectedCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :user_selected_categories do |t|
      t.belongs_to :mock_interview, null: false
      t.belongs_to :question_category, null: false
      t.timestamps
    end
    add_index :user_selected_categories, [:mock_interview_id, :question_category_id], unique: true, :name => 'index_select_categories_on_mock_interview_and_question_category'
  end
end
