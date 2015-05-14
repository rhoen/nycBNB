class UpdateListings < ActiveRecord::Migration
  def change
    change_column :listings, :street_address, :string, null: true
    change_column :listings, :state, :string, null: true
    change_column :listings, :zip, :string, null: true
    change_column :listings, :price_per_night, :string, null: true

    add_column :listings, :active, :boolean, default: false

  end
end
