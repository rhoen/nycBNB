class CreateListing < ActiveRecord::Migration
  def change
    create_table :listings do |t|
      t.integer   :owner_id, null: false
      t.string    :street_address, null: false
      t.string    :city, null: false
      t.string    :state, null: false
      t.string    :zip, null: false
      t.decimal   :latitude
      t.decimal   :longitude
      t.string    :room_type, null: false
      t.integer   :guest_limit, null: false
      t.decimal   :price_per_night, null: false
      t.string    :description

      t.timestamps
    end
    add_index :listings, :latitude
    add_index :listings, :longitude
    add_index :listings, :street_address
    add_index :listings, :city
    add_index :listings, :state
    add_index :listings, :zip
    add_index :listings, :room_type
    add_index :listings, :price_per_night

  end
end
