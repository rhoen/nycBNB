class ChangeDataTypeOfPricePerNight < ActiveRecord::Migration
  def change

    change_column :listings, :price_per_night, 'integer USING CAST(price_per_night AS integer)'
  end
end
