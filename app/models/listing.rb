class Listing < ActiveRecord::Base
  validates :owner_id, :city, :room_type,
    :guest_limit, presence: true

  belongs_to(
    :owner,
    class_name: "User",
    foreign_key: :owner_id,
    inverse_of: :listings
  )

  def activate
    if self.all_attributes_present
      self.active = true
    else
      false
    end
  end

  def all_attributes_present
    if self.attributes.values.include? nil
      false
    else
      true
    end
  end


end
