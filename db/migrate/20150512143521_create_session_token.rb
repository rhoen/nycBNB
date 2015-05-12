class CreateSessionToken < ActiveRecord::Migration
  def change
    create_table :session_tokens do |t|
      t.integer :user_id
      t.string :session_token
    end

    add_index :session_tokens, :session_token, unique: true
  end
end
