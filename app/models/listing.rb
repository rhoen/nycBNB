# == Schema Information
#
# Table name: listings
#
#  id                 :integer          not null, primary key
#  owner_id           :integer          not null
#  street_address     :string
#  city               :string           not null
#  state              :string
#  zip                :string
#  latitude           :decimal(, )
#  longitude          :decimal(, )
#  room_type          :string           not null
#  guest_limit        :integer          not null
#  price_per_night    :integer
#  description        :string
#  created_at         :datetime
#  updated_at         :datetime
#  title              :string
#  home_type          :string
#  active             :boolean          default(FALSE)
#  photo_file_name    :string
#  photo_content_type :string
#  photo_file_size    :integer
#  photo_updated_at   :datetime
#

class Listing < ActiveRecord::Base
  validates :owner_id, :city, :room_type, :home_type,
    :price_per_night, :title, :guest_limit, presence: true

  validate :has_complete_address_before_activation
  has_attached_file :photo, :styles => { :medium => "300x300>", :thumb => "100x100>" }
validates_attachment_content_type :photo, :content_type => /\Aimage\/.*\Z/

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :listings
  )

  has_many :listing_photos, dependent: :destroy
  has_many :trips, dependent: :destroy

  def self.room_types
    ["shared-room", "private-room", "entire-home"]
  end
  def self.home_types
    ["apartment", "house", "bed-and-breakfast"]
  end
  def self.results_per_page
    18
  end

  def has_complete_address_before_activation
    if self.active == true
      unless address_attributes_present
        self.active = false
        errors.add(:listing, "address must have street, city and state before activation")
      end
    end
  end

  def address_attributes_present
    address_attributes = [
     "street_address",
     "city",
     "state",
     "latitude",
     "longitude"
    ]

    address_instance_attr = self.attributes.select do |key, val|
      address_attributes.include? key
    end

    if address_instance_attr.values.include?(nil) ||
       address_instance_attr.values.include?("")
      false
    else
      true
    end
  end


end
