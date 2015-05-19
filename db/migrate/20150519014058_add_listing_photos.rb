class AddListingPhotos < ActiveRecord::Migration
  def change
    create_table :listing_photos do |t|
      t.integer :listing_id

      t.timestamps
    end
  end
end
