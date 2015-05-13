class Listing < ActiveRecord::Base
  validates :owner_id, :street_address, :city, :state, :zip, :room_type,
    :guest_limit, :price_per_night, presence: true

  belongs_to(
    :owner,
    class_name: "user",
    foreign_key: :owner_id
  )

  
end
