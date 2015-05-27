class AddPrimaryPhotoToListingPhotos < ActiveRecord::Migration
  def change
    add_column :listing_photos, :primary_photo, :boolean
  end
end
