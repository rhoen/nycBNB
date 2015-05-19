class ListingPhoto < ActiveRecord::Base
  validates :listing_id, presence: true
  has_attached_file :photo
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :listing



end
