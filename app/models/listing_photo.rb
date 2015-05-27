class ListingPhoto < ActiveRecord::Base
  validates :listing_id, presence: true
  has_attached_file :photo, default_url: "room_missing.png", styles: { thumb: ["32x32#", :jpg], small: ["200x135", :jpg], large: ["400x300#", :jpg] }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :listing

  def set_as_primary
    self.listing.listing_photos.update_all primary_photo: false
    self.primary_photo = true
  end



end
