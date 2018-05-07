class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :github_id
      t.string :github_handle
      t.string :github_avatar_url
      t.string :name
      t.integer :sign_in_count, default: 0
      t.timestamps
    end
    add_index :users, [:github_id], unique: true
    add_index :users, [:github_handle], unique: true
  end
end
