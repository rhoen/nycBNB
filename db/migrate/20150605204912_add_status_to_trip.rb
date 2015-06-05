class AddStatusToTrip < ActiveRecord::Migration
  def change
    add_column :trips, :status, :string
  end
end
