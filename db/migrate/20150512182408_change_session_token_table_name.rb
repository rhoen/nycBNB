class ChangeSessionTokenTableName < ActiveRecord::Migration
  def change
    rename_table :session_tokens, :sessions
  end
end
