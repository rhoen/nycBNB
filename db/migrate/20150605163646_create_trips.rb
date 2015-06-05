class CreateTrips < ActiveRecord::Migration
  def change
    create_table :trips do |t|
      t.integer :listing_id
      t.integer :traveler_id
      t.date :start_date
      t.date :end_date

      t.timestamps
    end
  end
end
