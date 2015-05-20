class ListingPhoto < ActiveRecord::Base
  validates :listing_id, presence: true
  has_attached_file :photo, default_url: "room_missing.png", styles: { thumb: ["32x32#", :jpg], small: ["150x100", :jpg], large: ["400x300#", :jpg] }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :listing



end
