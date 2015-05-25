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

  def self.room_types
    ["shared-room", "private-room", "entire-home"]
  end

  def has_complete_address_before_activation
    if self.active == true
      unless address_attributes_present
        self.active = false
        errors.add(:listing, "must have complete address before activation")
      end
    end
  end

  def address_attributes_present
    address_attributes =
     "street_address",
     "city",
     "state",
     "latitude",
     "longitude",
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
