class AddGuestsToTrips < ActiveRecord::Migration
  def change
    add_column :trips, :guests, :integer
  end
end
