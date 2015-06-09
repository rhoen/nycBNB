# == Schema Information
#
# Table name: listing_photos
#
#  id                 :integer          not null, primary key
#  listing_id         :integer
#  created_at         :datetime
#  updated_at         :datetime
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#  primary_photo      :boolean
#

class ListingPhoto < ActiveRecord::Base
  validates :listing_id, presence: true
  has_attached_file :photo, default_url: "room_missing.png", styles: { thumb: ["32x32#", :jpg], small: ["200x135", :jpg], large: ["400x300#", :jpg] }
  validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to :listing

  def set_as_primary
    self.listing.listing_photos.where.not(id: self.id).update_all primary_photo: false
    self.primary_photo = true
    self.save
  end



end
