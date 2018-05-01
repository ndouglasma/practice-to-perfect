class AddUniqueIndexQuestions < ActiveRecord::Migration[5.2]
  def change
    add_index :questions, [:body], :unique => true
  end
end
