class AddAttachmentPhotoToListingPhotos < ActiveRecord::Migration
  def self.up
    change_table :listing_photos do |t|
      t.attachment :photo
    end
  end

  def self.down
    remove_attachment :listing_photos, :photo
  end
end
