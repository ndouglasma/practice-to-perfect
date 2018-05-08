class CreateUsers < ActiveRecord::Migration[5.2]
  def change
    create_table :users do |t|
      t.integer :github_id
      t.string :github_login
      t.string :github_avatar_url
      t.string :github_name
      t.integer :sign_in_count, default: 0
      t.timestamps
    end
    add_index :users, [:github_id], unique: true
    add_index :users, [:github_login], unique: true
  end
end
