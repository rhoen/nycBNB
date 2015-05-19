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

  def has_complete_address_before_activation
    if self.active == true
      unless important_attributes_present
        self.active = false
        errors.add(:listing, "must have complete address before activation")
      end
    end
  end

  def activate
    if self.important_attributes_present
      self.active = true
    else
      false
    end
  end

  def important_attributes_present
    important_attributes = [
     "id",
     "owner_id",
     "street_address",
     "city",
     "state",
     "zip",
    #  "latitude",
    #  "longitude",
     "room_type",
     "guest_limit",
     "price_per_night",
    #  "description",
     "created_at",
     "updated_at",
     "title",
     "home_type",
     "active"
    ]

    important_instance_attr = self.attributes.select do |key, val|
      important_attributes.include? key
    end

    if important_instance_attr.values.include?(nil) ||
       important_instance_attr.values.include?("")
      false
    else
      true
    end
  end


end
