class CreateQuestionCategories < ActiveRecord::Migration[5.2]
  def change
    create_table :question_categories do |t|
      t.string :name
      t.timestamps
    end
    add_index :question_categories, [:name], unique: true
  end
end
