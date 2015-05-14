class AddHomeTypeToListings < ActiveRecord::Migration
  def change
    add_column :listings, :home_type, :string
  end
end
